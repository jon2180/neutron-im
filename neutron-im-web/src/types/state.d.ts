// import type { RootState as IRootState } from '@/store';
import type { NimSafeAny } from '@/types/basic';

/**
 * 用户信息
 */
export interface UserInfoSubstate {
  id: string;
  avatar?: string;
  nickname?: string;
  birthday?: number | null;
  email: string;
  reg_time: number | null;
  signature?: string | null;
  gender?: string | number;
  status: number;
  tel: string | null;
}

export interface UserInfoState {
  data: UserInfoSubstate;
  loading: 'idle' | 'pending';
  currentRequestId: undefined | string;
  hasLogin: boolean;
  error: NimSafeAny;
}

export type UserInfo = {
  avatar: string;
  birthday: string;
  email: string;
  id: string;
  nickname: string;
  reg_time: string;
  signature: string;
  gender: string | number;
  status: number;
  tel: string;
  uid: string;
};

export interface IActivity {
  author_id: string;
  content: string;
  content_type: number;
  copyright: string;
  create_time: number;
  id: string;
  is_original: number;
  status: number;
  title: string;
  update_time: null | number;
  version: string;
  cover_img?: string;
  tags?: string | string[];
}

// export type RootState = IRootState;
