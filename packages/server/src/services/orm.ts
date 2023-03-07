import { PrismaClient } from '@prisma/client';
import cluster, { Worker } from 'cluster';
import { v4 } from 'uuid';
import Service from './service';
import Database from '../database';
import { checkIsFind, checkIsMany, log } from '../utils/lib';
import { MessageType, SendMessageArgs, DBCommandProps } from '../types/interfaces';
import { ProcessMessage } from '../types';

const prisma = new PrismaClient();

export class ORM extends Service implements Database {
  private readonly protocol = 'orm';

  private readonly errorStatus = 'error';

  constructor(worker?: Worker) {
    super(worker);
    if (worker && cluster.isPrimary) {
      this.createServer();
    }
  }

  public userFindFirstW: Database['userFindFirst'] = async (args) => {
    return this.runFromWorker({
      args,
      model: 'user',
      command: 'findFirst',
    });
  };

  public fileCreateW: Database['fileCreateW'] = async (args) => {
    return this.runFromWorker({
      args,
      model: 'file',
      command: 'create',
    });
  };

  public fileUpdate: Database['fileUpdate'] = async (args) => {
    return this.run({
      args,
      model: 'file',
      command: 'update',
    });
  };

  public fileDelete: Database['fileDelete'] = async (args) => {
    return this.run({
      args,
      model: 'file',
      command: 'delete',
    });
  };

  public fileDeleteW: Database['fileDelete'] = async (args) => {
    return this.runFromWorker({
      args,
      model: 'file',
      command: 'delete',
    });
  };

  public categoryFindManyW: Database['categoryFindManyW'] = async (args) => {
    return this.runFromWorker({
      args,
      model: 'category',
      command: 'findMany',
    });
  };

  public userCreate: Database['userCreate'] = async (args) => {
    return this.run({
      args,
      model: 'user',
      command: 'create',
    });
  };

  public userUpdate: Database['userUpdate'] = async (args) => {
    return this.run({
      args,
      model: 'user',
      command: 'update',
    });
  };

  public userFindFirst: Database['userFindFirst'] = async (args) => {
    return this.run({
      args,
      model: 'user',
      command: 'findFirst',
    });
  };

  public fileFindMany: Database['fileFindMany'] = async (args) => {
    return this.run({
      args,
      model: 'file',
      command: 'findMany',
    });
  };

  public pageFindManyW: Database['pageFindManyW'] = async (args) => {
    return this.runFromWorker({
      args,
      model: 'page',
      command: 'findMany',
    });
  };

  public projectCreate: Database['projectCreate'] = async (args) => {
    return this.run({
      args,
      model: 'project',
      command: 'create',
    });
  };

  public projectMessageCreate: Database['projectMessageCreate'] = async (args) => {
    return this.run({
      args,
      model: 'projectMessage',
      command: 'create',
    });
  };

  public projectMessageFindMany: Database['projectMessageFindMany'] = async (args) => {
    return this.run({
      args,
      model: 'projectMessage',
      command: 'findMany',
    });
  };

  public projectUpdate: Database['projectUpdate'] = async (args) => {
    return this.run({
      args,
      model: 'project',
      command: 'update',
    });
  };

  public projectFindFirst: Database['projectFindFirst'] = async (args) => {
    return this.run({
      args,
      model: 'project',
      command: 'findFirst',
    });
  };

  public projectFindMany: Database['projectFindMany'] = async (args) => {
    return this.run({
      args,
      model: 'project',
      command: 'findMany',
    });
  };

  private createServer() {
    this.listenWorkerMessages<MessageType.DB_COMMAND>(async ({ protocol, msg }) => {
      if (protocol === 'orm' && msg.type === MessageType.DB_COMMAND) {
        const { data } = msg;
        const result = await this.run({ ...data });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _msg: ProcessMessage<MessageType.DB_RESULT>['msg'] = { ...msg } as any;
        _msg.data = result;
        _msg.type = MessageType.DB_RESULT;
        this.sendMessageToWorker<MessageType.DB_RESULT>({
          protocol,
          msg: _msg,
        });
      }
    });
  }

  private async run({
    model,
    command,
    args,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SendMessageArgs<MessageType.DB_COMMAND>['data']): Promise<any> {
    const { skip, take, where } = args;
    let count: number | undefined;

    let result;
    // Run command
    try {
      if (command === 'findMany') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        count = await (prisma as any)[model].count({ where });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result = await (prisma as any)[model][command](args);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      log('error', 'Database error', err);
      return {
        status: 'error',
        data: checkIsMany(command),
        skip,
        code: 500,
        stdErrMessage: err.message,
        _command: command,
        _model: model,
        take,
        count,
      };
    }

    const isNotFound = result === null || result?.length === 0;
    return {
      status: isNotFound ? 'warn' : 'info',
      data: result,
      code: isNotFound ? 404 : checkIsFind(command) ? 200 : 201,
      _command: command,
      _model: model,
      skip,
      take,
      count,
    };
  }

  private runFromWorker = async ({ args, model, command }: DBCommandProps) => {
    const id = v4();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<any>((resolve) => {
      const { master, handler } = this.listenMasterMessages<MessageType.DB_RESULT>(
        ({ msg: { id: _id, data } }) => {
          if (id === _id) {
            if (data.status === this.errorStatus) {
              log('error', 'Database request failed', { args });
            }
            master.removeListener('message', handler);
            resolve(data);
          }
        }
      );
      this.sendMessageToMaster<MessageType.DB_COMMAND>({
        protocol: this.protocol,
        msg: {
          type: MessageType.DB_COMMAND,
          id,
          data: {
            model,
            command,
            args,
          },
        },
      });
    });
  };
}
