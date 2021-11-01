export enum FrameType {
  HEART_BEAT = 'HEARTBEAT',
  QUIT = 'QUIT',
  MESSAGE = 'MESSAGE',
}

/**
 * 消息类型
 */
export enum MessageType {
  SINGLE = 'single',
  GROUP = 'group',
  NOTIFICATION = 'notification',
}

/**
 * 聊天消息
 */
export enum ChatMessageType {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
  CODESNIPS = 'codesnips',
  FAVORITE = 'favorite',
}

export interface WebSocketMessage {
  sender: string;
  receiver: string;
  type: MessageType;
  timestamp: string;
  body: any;
}
