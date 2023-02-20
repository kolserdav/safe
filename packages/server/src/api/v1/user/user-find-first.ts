import { RequestHandler } from '../../../types';
import HandleRequests from '../../../services/handleRequests';
import { MessageType, SendMessageArgs, APPLICATION_JSON } from '../../../types/interfaces';
import { parseHeaders } from '../../../utils/lib';

const handleRequests = new HandleRequests({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUserFindFirst: RequestHandler<
  { Querystring: { id: string } },
  SendMessageArgs<MessageType.SET_USER_FIND_FIRST>
> = async ({ headers }, reply) => {
  const { lang, id } = parseHeaders(headers);
  const user = handleRequests.sendToQueue<
    MessageType.GET_USER_FIND_FIRST,
    MessageType.SET_USER_FIND_FIRST
  >({
    type: MessageType.GET_USER_FIND_FIRST,
    id,
    lang,
    timeout: new Date().getTime(),
    data: {
      where: {
        id,
      },
    },
  });
  reply.type(APPLICATION_JSON).code(200);
  return user;
};

export default getUserFindFirst;
