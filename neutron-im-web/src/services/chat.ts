import request from '@/utils/request';
import type { HttpResponseData, MessageData } from '@/types/http';
import type { Chat } from './chat-model';

export function postChat({
  firstUid,
  secondUid,
}: {
  firstUid: string;
  secondUid: string;
}): Promise<HttpResponseData> {
  return request.post('/chats/', {
    data: {
      sender_id: firstUid,
      receiver_id: secondUid,
      type: 'single',
    },
  });
}

interface GetChatParam {
  sender_id: string;
  receiver_id: string;
}

export function getChat({
  sender_id,
  receiver_id,
}: GetChatParam): Promise<HttpResponseData<Chat>> {
  return request.get('/chats/id', {
    data: {
      sender_id,
      receiver_id,
    },
  });
}

export function getChatData({ id }: { id: string }): Promise<HttpResponseData> {
  return request.get(`/chats/${id}`);
}

export function getRecentList(): Promise<HttpResponseData<Chat[]>> {
  return request.get('/chats/');
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
