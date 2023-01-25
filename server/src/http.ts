import Fastify from 'fastify';
import cors from '@fastify/cors';
import { APP_URL, FASTIFY_LOGGER, PORT, V1 } from './utils/constants';
import { log } from './utils/lib';
import getTestHandler from './api/v1/get-test';
import { Api } from './types/interfaces';
import getLocaleHandler from './api/v1/get-locale';
import postPageFindManyHandler from './api/v1/page/find-many';

process.on('uncaughtException', (err: Error) => {
  log('error', '[WORKER] uncaughtException', err);
});
process.on('unhandledRejection', (err: Error) => {
  log('error', '[WORKER] unhandledRejection', err);
});

(async () => {
  const fastify = Fastify({
    logger: FASTIFY_LOGGER,
  });

  await fastify.register(cors, {
    origin: [APP_URL],
  });

  fastify.get(Api.testV1, getTestHandler);
  fastify.get(Api.getLocaleV1, getLocaleHandler);
  fastify.post(Api.postPageFindManyV1, postPageFindManyHandler);

  fastify.listen({ port: PORT }, (err, address) => {
    if (err) throw err;
    console.log('Server listenning on', address);
  });
})();