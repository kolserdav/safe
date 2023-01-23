import cluster, { Worker } from 'cluster';

import { Protocol } from '../types/interfaces';
import { log } from '../utils/lib';
import Service from './service';
import AMQP from '../rabbitmq/amqp';
import { QUEUE_NAME } from '../utils/constants';
import WS from './ws';

console.log(cluster.isPrimary);

class HandleRequests extends Service {
  private protocol: Protocol;

  constructor(protocol: Protocol, worker?: Worker) {
    let _worker = worker;
    if (!_worker && cluster.isPrimary) {
      const { workers } = cluster;
      if (workers) {
        // eslint-disable-next-line prefer-destructuring
        _worker = (workers as Record<number, Worker>)[1];
      } else {
        log('warn', 'Workers not found', { err: new Error() });
      }
    }
    super(_worker);
    this.protocol = protocol;
  }

  public async listenWorker() {
    const amqpS = new AMQP({ caller: 'sender', queue: QUEUE_NAME });
    this.listenWorkerMessages<any>(async ({ protocol, msg }) => {
      if (protocol === 'request') {
        amqpS.sendToQueue(msg);
      } else {
        log('warn', 'Unexpected protocol or type', { protocol, type: msg.type });
      }
    });
    this.handleQueues();
  }

  private async handleQueues() {
    const ws = new WS();
    const amqpW = new AMQP({ caller: 'consumer', queue: QUEUE_NAME });
    await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (amqpW.checkChannel()) {
          clearInterval(interval);
          resolve(0);
        }
      }, 100);
    });
    amqpW.consume((msg: any) => {
      ws.sendMessage(msg);
    });
  }

  public sendToQueue(msg: any) {
    this.sendMessageToMaster<any>({ protocol: this.protocol, msg });
  }
}

export default HandleRequests;