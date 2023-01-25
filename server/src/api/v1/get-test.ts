import { RequestHandler } from '../../types';
import { APPLICATION_JSON } from '../../utils/constants';
import HandleRequests from '../../services/handleRequests';
import { MessageType } from '../../types/interfaces';
import { getLang } from '../../utils/lib';

const handleRequests = new HandleRequests({ protocol: 'request', caller: 'get-test-handler' });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTestHandler: RequestHandler<{ Querystring: { id: string } }, any> = async (
  { query, headers },
  reply
) => {
  const lang = getLang(headers);
  const { id } = query;
  handleRequests.sendToQueue(
    {
      type: MessageType.TEST,
      id,
      lang,
      data: {
        ok: 'yes',
      },
    },
    { headers }
  );
  reply.type(APPLICATION_JSON).code(200);
  return query;
};

export default getTestHandler;