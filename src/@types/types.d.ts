
/**
 * 标准 HTTP 请求的返回结果
 */
export type HttpResponseData<T> = T;

// export interface HttpResponseData<T> {
//   /**
//    * 状态代码，以 10000 开始
//    */
//   readonly code: number;

//   /**
//    * 状态文本
//    */
//   readonly status: "success" | "warning" | "failed";

//   /**
//    * 描述文本，具体描述请求的情况
//    */
//   readonly desc: string;

//   /**
//    * 实际数据
//    */
//   data: T;
// }

export interface HttpErrResponse {
  readonly error: string;
  readonly desc: string;
  readonly data?: T;
}

/**
 * 用于更新界面状态
 */
export interface HttpRequestStatus {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

/**
 * 消息类型的允许值
 */
export type MessageType = "text" | "image" | "video" | "audio";

/**
 * 消息类型
 */
export interface MessageData {
  /**
   * 消息 id，用户去重
   */
  messageId: string;

  /**
   * 消息发送者
   */
  from: string;

  /**
   * 消息类型
   */
  type: MessageType;

  /**
   * 消息具体内容
   */
  content: string;

  /**
   * 消息发送时间，应该以某一个时区的标准事件来计算
   */
  time: number;

  /**
   * 消息是否是自己发送的
   */
  isSentByMe: boolean;

  /**
   * 消息提及到的用户，作用类似于 @ 符号
   */
  mentions?: string;

  /**
   * 本条消息引用的其他消息 id
   */
  refer?: string;

  /**
   * 其他附属内容
   */
  [propsName: string]: any;
}

/**
 * 通知类型
 */
export interface GroupNoticeData {
  [propsName: string]: any;
}

/**
 * 最近列表中的消息项
 */
export interface RecentChatItemData {
  accountId: string;
  avatar: string;
  accountName: string;
  lastMsg: string;
  time: number;
  unread: number;
}

export interface FriendListItemData {
  accountId: string;
  avatar: string;
  accountName: string;
}
