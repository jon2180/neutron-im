import type { HttpResponseData, MessageData } from "@/types/http";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

/**
 * Chat 列表
 */
export interface Chat {
  id: string;
  account_id: string;
  target_id: string;
  type: number;
  sender_id: string;
  receiver_id: string;
  last_msg_time: number;
  last_msg_id: string;
  last_msg_content: string;
  unread_count: number;
  status: number;
  time: number;

  account_nickname: string;
  account_email: string;
  account_avatar: string;
  account_signature: string;
  account_status: string;
}

export interface QueryType  {
  [propName: string]: string;
}

@Injectable({
  providedIn: "root"
})
export class ChatRestService {
  constructor(private request: HttpClient) {
  }

  postChat(firstUid: string, secondUid: string): Observable<HttpResponseData> {
    return this.request.post<HttpResponseData>("/chats/", {
      sender_id: firstUid,
      receiver_id: secondUid,
      type: "single"
    });
  }

  getChat(senderId: string, receiverId: string): Observable<HttpResponseData<Chat>> {
    return this.request.get<HttpResponseData>("/chats/id", {
      params: {
        sender_id: senderId,
        receiver_id: receiverId
      }
    });
  }

  getChatData(id: string): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>(`/chats/${id}`);
  }

  getRecentList(): Observable<HttpResponseData<Chat[]>> {
    return this.request.get<HttpResponseData>("/chats/");
  }

  sendMessage(message: MessageData): Observable<HttpResponseData> {
    return this.request.post<HttpResponseData>("/messages/", message);
  }

  queryChatHistory(chatId: string, data: QueryType): Observable<HttpResponseData> {
    return this.request.get<HttpResponseData>(`/messages/${chatId}`);
  }
}
