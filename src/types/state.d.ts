import // FriendListItemData,
// HttpRequestStatus,
// MessageData,
// RecentChatItemData,
"./http";
import { RootState as IRootState } from "@/store/store";

/**
 * 用户信息
 */
export interface UserInfoSubstate {
  // hasLogin: boolean;

  id: string;
  // uid: string;
  // username: string;
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

  // enabled: boolean;
  // accountNonExpired: boolean;
  // accountNonLocked: boolean;
  // credentialsNonExpired: boolean;
  // authorities: string[];

  // [propName: string]: any;
}

export interface UserInfoState {
  data: UserInfoSubstate;
  loading: "idle" | "pending";
  currentRequestId: undefined | string;
  hasLogin: boolean;
  error: any;
}

/**
 * 聊天相关
 */
// export type ChatsHistoriesSubstate =
// export interface ChatsSubstate {
//   /**
//    * 最近同步时间 时间戳表示
//    */
//   lastUpdated: number;

//   /**
//    * 聊天记录 用对方账号的 id 作为键去读取和写入
//    */
//   chatHistories: {
//     [id: string]: {
//       name: string;
//       avatar: string;
//       messages: MessageData[];
//     };
//   };

//   /**
//    * 最近列表信息
//    */
//   recentChats: {
//     reqStatus: HttpRequestStatus;
//     name: string;
//     lastUpdateTime: number;
//     pinToTopList: RecentChatItemData[];
//     list: RecentChatItemData[];
//   };
// }

/**
 * 好友信息
 */
// export interface FriendsSubstate {
//   /**
//    * 最近同步时间
//    */
//   lastUpdated: number;

//   /**
//    * 好友列表
//    */
//   friendList: FriendListItemData[];
// }

export type RootState = IRootState;
