import request from "@/utils/request";
import type { HttpResponseData, MessageData } from "@/types/http";

export function getRecentList(): Promise<HttpResponseData> {
  return request.get("/chats/");
}

export interface QueryType {
  chatId: string;
  [propName: string]: string;
}

export function sendMessage(message: MessageData): Promise<HttpResponseData> {
  return request.post(`/messages/`, { data: message });
}

export function queryChatHistory(data: QueryType): Promise<HttpResponseData> {
  const { chatId } = data;
  return request.get(`/messages/${chatId}`);
}
