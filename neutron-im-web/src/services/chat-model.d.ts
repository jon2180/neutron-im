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
