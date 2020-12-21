import request from "@/utils/request";
import { HttpResponseData, MessageData, RecentChatItemData } from "@/@types/types";

export function getRecentList(): Promise<HttpResponseData<RecentChatItemData[]>> {
  return request.get("/chats/", {
    data: {},
  });
}

export interface QueryType {
  chatId: string;
  [propName: string]: string;
}

export function queryChatHistory(
  data: QueryType
): Promise<HttpResponseData<MessageData[]>> {
  const { chatId } = data;
  return request.get(`/chats/${chatId}`);
}
