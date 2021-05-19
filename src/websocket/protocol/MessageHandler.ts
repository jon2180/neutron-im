import { BaseHandler } from "../handlers/BaseHandler";
import SingleChatHandler from "../handlers/SingleChatHandler";
import { WebSocketMessage } from "./WebSocketMessage";

const handlersMap = new Map<string, BaseHandler>();
handlersMap.set("single", new SingleChatHandler());

export default class MessageHandler {
  handle(message: WebSocketMessage<any>) {
    if (message.type && handlersMap.get(message.type)) {
      (handlersMap.get(message.type) as BaseHandler).handle(message);
    } else {
      console.log("未知消息类型");
    }
  }
}
