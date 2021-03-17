import request from "@/utils/request";
import { HttpResponseData } from "@/types/http";

export function getRecentList(): Promise<HttpResponseData> {
  return request.get("/chats/", {
    data: {},
  });
}

export interface QueryType {
  chatId: string;
  [propName: string]: string;
}

export function queryChatHistory(data: QueryType): Promise<HttpResponseData> {
  const { chatId } = data;
  return request.get(`/chats/${chatId}`);
}
