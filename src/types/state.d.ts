import {
  FriendListItemData,
  HttpRequestStatus,
  MessageData,
  RecentChatItemData,
} from "./types";

/**
 * 用户信息
 */
export interface UserInfoSubstate {
  hasLogin: boolean;
  id: string;
  avatar: string;
  nickname: string;
  [propName: string]: any;
}

/**
 * 聊天相关
 */
export interface ChatsSubstate {
  /**
   * 最近同步时间 时间戳表示
   */
  lastUpdated: number;

  /**
   * 聊天记录 用对方账号的 id 作为键去读取和写入
   */
  chatHistories: {
    [id: string]: {
      name: string;
      avatar: string;
      messages: MessageData[];
    };
  };


  /**
   * 最近列表信息
   */
  recentChats: {
    reqStatus: HttpRequestStatus;
    name: string;
    lastUpdateTime: number;
    pinToTopList: RecentChatItemData[];
    list: RecentChatItemData[];
  };
}

/**
 * 好友信息
 */
export interface FriendsSubstate {
  /**
   * 最近同步时间
   */
  lastUpdated: number;

  /**
   * 好友列表
   */
  friendList: FriendListItemData[];
}

export interface RootState {
  /**
   * 聊天信息
   */
  chats: ChatsSubstate;

  /**
   * 用户信息
   */
  userInfo: UserInfoSubstate;

  /**
   * 好友列表及好友信息
   */
  friends: FriendsSubstate;
}
