import type { ChatMessageType } from '@/websocket/conf';
import type { NimSafeAny } from '@/types/basic';

export interface PageConfig {
  pageSize: number;
  pageNum: number;
  total: number;
}

/**
 * 标准 HTTP 请求的返回结果
 */
export interface HttpResponseData<T = NimSafeAny> {
  /** 状态代码，以 10000 开始，拓展 http 标准状态码 */
  readonly status: number;
  /** 状态文本 */
  readonly message: string;
  /** 描述文本，具体描述请求的情况 */
  readonly data: T;
  /** 实际数据 */
  readonly timestamp: number;
  readonly page: PageConfig;
}

export interface ErrResponse<T = NimSafeAny> {
  readonly error: string;
  readonly status: string;
  readonly message: string;
  readonly data?: T;
}

/**
 * 用于更新界面状态
 */
export interface HttpRequestStatus {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

/**
 * 消息类型
 */
export interface MessageData {
  /** 消息 id，用户去重 */
  id: string;
  chat_id: string;
  /** 消息发送者 */
  sender_id: string;
  receiver_id: string;
  /** 消息类型 */
  content_type: ChatMessageType;
  /** 消息具体内容 */
  content: string;
  /** 消息提及到的用户，作用类似于 @ 符号 */
  mentions?: string[];
  /** 本条消息引用的其他消息 id */
  refer?: string[];
  file_info?: Record<string, NimSafeAny>;
  /** 消息发送时间，应该以某一个时区的标准事件来计算 */
  time: number;
  status?: number;
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

export interface Friend {
  /** 数据库中  的序列号 id */
  id: number;
  /** 对方的个性化 id */
  account_id: string;
  /** 对方的昵称 */
  nickname: string;
  remark_name: string;
  /** 对方的签名 */
  signature: string;
  /** 对方的头像 */
  avatar: string;
  /** 对方所在分组 */
  category: string;
  /** 加为好友的时间 */
  link_time: string;
  /** 朋友关系的状态 */
  status: number;
  /** 朋友的类型 */
  type: number;
}

export interface RequestType {
  id: number;
  initiator_id: number;
  target_id: number;
  type: number;
  submit_reason: string;
  submit_time: string;
  solved_result: number;
  solved_reason: string;
  solved_time: string;
  extra: string;
}

export type RequestsType = RequestType[];
