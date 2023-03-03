import cluster, { Worker } from 'cluster';
import EventEmitter from 'events';
import { ProcessMessage } from '../types';
import { MessageType } from '../types/interfaces';

class Service extends EventEmitter {
  private readonly workerNotFound = 'Worker not found in Service';

  private readonly masterNotFound = 'Master not found in Service';

  private readonly unexpectedUseProcess = 'Unexpected use process';

  public worker: Worker | undefined;

  constructor(_worker?: Worker) {
    super();
    this.worker = _worker;
  }

  protected listenMasterMessages<T extends keyof typeof MessageType>(
    // eslint-disable-next-line no-unused-vars
    cb: (data: ProcessMessage<T>) => void
  ) {
    if (!process) {
      throw new Error(this.workerNotFound);
    }
    if (cluster.isPrimary) {
      throw new Error(`${this.unexpectedUseProcess}: worker`);
    }
    const handler = (data: unknown) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cb(data as any);
    };
    const master = process.on('message', handler);
    return { master, handler };
  }

  // eslint-disable-next-line class-methods-use-this
  protected listenWorkerMessages<T extends keyof typeof MessageType>(
    // eslint-disable-next-line no-unused-vars
    cb: (args: ProcessMessage<T>) => void
  ) {
    if (!this.worker) {
      throw new Error(this.workerNotFound);
    }
    if (!cluster.isPrimary) {
      throw new Error(`${this.unexpectedUseProcess}: master`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (data: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const _data: ProcessMessage<any> = data as any;
      cb(_data);
    };
    const worker = this.worker.on('message', handler);
    return { worker, handler };
  }

  public sendMessageToWorker<T extends keyof typeof MessageType>(data: ProcessMessage<T>) {
    if (!this.worker) {
      throw new Error(this.workerNotFound);
    }
    if (!cluster.isPrimary) {
      throw new Error(`${this.unexpectedUseProcess}: master`);
    }
    this.worker.send(data);
  }

  protected sendMessageToMaster<T extends keyof typeof MessageType>(data: ProcessMessage<T>) {
    if (!process.send) {
      throw new Error(this.masterNotFound);
    }
    if (cluster.isPrimary) {
      throw new Error(`${this.unexpectedUseProcess}: worker`);
    }
    process.send(data);
  }
}

export default Service;