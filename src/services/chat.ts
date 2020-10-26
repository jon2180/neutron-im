import request from "../utils/request";
import { Random } from "mockjs";
import { IHTTPResponse, IMessage, IRecentItem } from "../types";

export function getRecentList(): Promise<IHTTPResponse<IRecentItem[]>> {
  return request.get("/chats/", {
    data: {},
  });
}

export interface QueryType {
  id: string;
}

export function queryChatHistory(
  data: QueryType
): Promise<IHTTPResponse<IMessage[]>> {
  return new Promise((resolve) => {
    // TODO
    const data: IMessage[] = [];
    for (let i = 0; i < Random.integer(1, 300); ++i) {
      data.push({
        messageId: Random.id(),
        from: Random.id(),
        avatar: Random.image("48x48"),
        // accountName: Random.cname(),
        type: Random.boolean() ? "text" : "image",
        content: Random.cparagraph(1, 140),
        isSentByMe: Random.boolean(),
        // // time: Random.time(),
        time: new Date().getTime(),
        // unread: Random.integer(0, 100),
      });
    }
    resolve({
      code: 100001,
      desc: "正常",
      status: "success",
      data,
    });
  });
}
