import { BaseHandler } from "./BaseHandler";
import store from "@/store";
import { pushMessage } from "@/store/chatsHistoriesSlice";
import { pushLastMessage } from "@/store/recentChatsSlice";
import { MessageData } from "@/types/http";
import { notification } from "antd";
import { ChatMessageType } from "../conf";
import { WebSocketMessage } from "../protocol/WebSocketMessage";

export default class SingleChatHandler implements BaseHandler {
  handle(message: WebSocketMessage<any>) {
    if (!message.body) return false;

    store.dispatch(pushLastMessage(message.body as MessageData));
    store.dispatch(pushMessage(message.body));

    switch ((message.body as MessageData).content_type) {
      case ChatMessageType.TEXT:
        notification.info({
          message: `收到来自 ${message.body["sender_id"].substr(0, 3)} 新 ${
            message.body["content_type"]
          }消息`,
          description: message.body["content"],
        });
    }
    return true;
  }
}
