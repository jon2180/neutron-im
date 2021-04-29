import { RootState as IRootState } from "@/store/store";

/**
 * 用户信息
 */
export interface UserInfoSubstate {
  id: string;
  avatar: stringF | null;
  nickname: string;
  avatar: string;
  birthday: string | null;
  email: string;
  nickname: string;
  reg_time: string | null;
  signature: string | null;
  status: number;
  tel: string | null;
}

export interface UserInfoState {
  data: UserInfoSubstate;
  loading: "idle" | "pending";
  currentRequestId: undefined | string;
  hasLogin: boolean;
  error: any;
}

export type RootState = IRootState;
