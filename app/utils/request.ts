import { SERVER } from './constants';
import { log } from './lib';

class Request {
  protocol: string;

  constructor() {
    this.protocol = `${typeof window !== 'undefined' ? window.location.protocol : 'http:'}//`;
  }

  // eslint-disable-next-line class-methods-use-this
  private async send<T>({
    responseType,
    url,
  }: {
    url: string;
    responseType?: XMLHttpRequest['responseType'];
  }): Promise<1 | T> {
    return new Promise((resolve) => {
      const req = new XMLHttpRequest();
      req.responseType = 'json' || responseType;
      req.onload = () => {
        resolve(req.response as T);
      };
      req.onabort = () => {
        log('error', 'Request abort', { url });
        resolve(1);
      };
      req.onerror = (e) => {
        log('error', 'Request error', e);
        resolve(1);
      };
      req.open('GET', `${this.getOrigin()}${url}`);
      req.send();
    });
  }

  public getOrigin() {
    return SERVER;
  }

  public test(id: string) {
    return this.send({ url: `/v1/test?id=${id}` });
  }
}

export default Request;