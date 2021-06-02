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
    const state = store.getState();
    const recentChat = state.recentChats.find((val) => {
      return (
        (val.sender_id === state.userInfo.data.id &&
          val.receiver_id === message.body["sender_id"]) ||
        (val.receiver_id === state.userInfo.data.id &&
          val.sender_id === message.body["sender_id"])
      );
    });
    store.dispatch(pushLastMessage(message.body as MessageData));
    store.dispatch(pushMessage(message.body));

    switch ((message.body as MessageData).content_type) {
      case ChatMessageType.TEXT:
        notification.info({
          message: `收到来自 ${
            recentChat?.account_nickname ||
            message.body["sender_id"].substr(0, 3)
          } 新消息`,
          description: message.body["content"],
        });
    }

    // messageTypeMap[message.body["content_type"]]
    //         ? messageTypeMap[message.body["content_type"]]
    //         : message.body["content"]
    return true;
  }
}
