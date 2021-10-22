import { WebSocketRequest } from '@/websocket/protocol/WebSocketRequest';

export interface ChatMessage {
  chatId: string;
  senderId: string;
  receiverId: string;
  id: string;
  contentType: string;
  content: string;
  time: number;
}

export interface ChatMessageDto {
  chat_id: string;
  sender_id: string;
  receiver_id: string;
  id: string;
  content_type: string;
  content: string;
  time: number;
}

export function buildMessage<T>(type: string, body: T): WebSocketRequest<T> {
  return new WebSocketRequest<T>(type, body);
}

export function buildSingleChatMessage(
  msg: ChatMessage,
): WebSocketRequest<ChatMessageDto> {
  return buildMessage<ChatMessageDto>('SENT_TO_ONE_REQUEST', {
    chat_id: msg.chatId,
    sender_id: msg.senderId,
    receiver_id: msg.receiverId,
    id: msg.id,
    content_type: msg.contentType,
    content: msg.content,
    time: Date.now(),
  });
}

interface HeartBeatMessage {
  msg?: string;
}

export function buildHeartBeatMessage(): WebSocketRequest<HeartBeatMessage> {
  return buildMessage<HeartBeatMessage>('PING', {
    msg: 'heart beat',
  });
}
