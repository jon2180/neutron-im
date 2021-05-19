import { MessageType } from "../conf";

export interface IWebSocketMessage {
  sender?: string;
  receiver?: string;
  type?: MessageType;
  timestamp?: string;
  body?: any;
}

export class BaseMessageBody {}

export class WebSocketMessage<T extends BaseMessageBody>
  implements IWebSocketMessage
{
  sender?: string;
  receiver?: string;
  type?: MessageType;
  timestamp?: string;
  body?: T;

  constructor(source?: string | Record<any, any>) {
    if (typeof source === "string") {
      try {
        const parsedVal = JSON.parse(source);
        if (!parsedVal) {
          throw new Error("Error in source");
        }
        if (parsedVal["sender"]) this.sender = parsedVal["sender"];
        if (parsedVal["receiver"]) this.receiver = parsedVal["receiver"];
        if (parsedVal["type"]) this.sender = parsedVal["type"];
        if (parsedVal["timestamp"]) this.sender = parsedVal["timestamp"];
        if (parsedVal["body"]) this.sender = parsedVal["body"];
      } catch (e) {
        throw new Error("Parsing Json Failed");
      }
    }
  }
}
