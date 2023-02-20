import util from 'util';
import { pipeline } from 'stream';
import fs from 'fs';
import path from 'path';
import { RequestHandler } from '../../../types';
import { MessageType, SendMessageArgs, APPLICATION_JSON } from '../../../types/interfaces';
import { createDir, getFileExt, getLocale, parseHeaders } from '../../../utils/lib';
import { CLOUD_PATH } from '../../../utils/constants';
import { ORM } from '../../../services/orm';

const orm = new ORM();

const pump = util.promisify(pipeline);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileUpload: RequestHandler<
  any,
  SendMessageArgs<MessageType.SET_FILE_UPLOAD | MessageType.SET_ERROR>
> = async (req, reply) => {
  const { headers } = req;
  const { lang, id, timeout } = parseHeaders(headers);
  const locale = getLocale(lang).server;

  const data = await req.file();
  if (!data) {
    reply.type(APPLICATION_JSON).code(400);
    return {
      type: MessageType.SET_ERROR,
      id,
      lang,
      timeout: parseInt(timeout, 10),
      data: {
        message: locale.badRequest,
        httpCode: 400,
      },
    } as SendMessageArgs<MessageType.SET_ERROR>;
  }
  const { fieldname, filename, encoding, mimetype, file } = data;

  const create = await orm.fileCreateW({
    data: {
      fieldname,
      filename,
      encoding,
      mimetype,
      userId: id,
      ext: getFileExt(filename),
    },
  });
  if (create.status !== 'info' || !create.data) {
    reply.type(APPLICATION_JSON).code(400);
    return {
      type: MessageType.SET_ERROR,
      id,
      lang,
      timeout: parseInt(timeout, 10),
      data: {
        message: locale.error,
        httpCode: 500,
      },
    } as SendMessageArgs<MessageType.SET_ERROR>;
  }

  const userCloud = path.resolve(CLOUD_PATH, id);
  createDir(userCloud);
  const fileName = path.resolve(userCloud, `${create.data.id}${create.data.ext}`);
  const filePath = path.resolve(userCloud, fileName);
  await pump(file, fs.createWriteStream(filePath));

  const stats = fs.statSync(filePath);

  const update = await orm.fileUpdateW({
    where: {
      id: create.data.id,
    },
    data: {
      size: stats.size,
    },
  });

  reply.type(APPLICATION_JSON).code(200);
  return {
    type: MessageType.SET_FILE_UPLOAD,
    id,
    lang,
    timeout: parseInt(timeout, 10),
    data: update.data,
  } as SendMessageArgs<MessageType.SET_FILE_UPLOAD>;
};

export default fileUpload;
