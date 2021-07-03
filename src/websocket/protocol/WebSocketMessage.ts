import { MessageType } from '../conf';

export interface IWebSocketMessage {
  sender?: string;
  receiver?: string;
  type?: MessageType;
  timestamp?: string;
  body?: any;
}

export class BaseMessageBody {
}

export class WebSocketMessage<T extends BaseMessageBody>
  implements IWebSocketMessage {
  sender?: string;
  receiver?: string;
  type?: MessageType;
  timestamp?: string;
  body?: T;

  constructor(source?: string | Record<any, any>) {
    if (typeof source === 'string') {
      try {
        const parsedVal = JSON.parse(source);
        if (!parsedVal) {
          throw new Error('Error in source');
        }
        this.assign(parsedVal);
      } catch (e) {
        throw new Error('Parsing Json Failed');
      }
    } else if (typeof source === 'object') {
      this.assign(source);
    }
  }

  private assign(source: any): void {
    if (source['sender']) this.sender = source['sender'];
    if (source['receiver']) this.receiver = source['receiver'];
    if (source['type']) this.type = source['type'];
    if (source['timestamp']) this.timestamp = source['timestamp'];
    if (source['body']) this.body = source['body'];
  }
}
