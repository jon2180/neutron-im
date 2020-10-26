import { IHTTPRequestStatus, IRecentItem } from "../types";

/**
 * 单聊的聊天记录
 */
export interface ISingleChatHistory {
  [id: string]: {
    name: string;
    avatar: string;
    chatHistory: Array<IMessage>;
  };
}

/**
 * 群聊的聊天记录
 */
export interface IGroupChatHistory {
  [groupId: string]: {
    name: string;
    avatar: string;
    groupNotices: Array<INotice>;
    chatHistory: Array<IMessage>;
  };
}

/**
 * 聊天记录
 */
export interface IChatHistory {
  singleChat: ISingleChatHistory;
  groupChat: IGroupChatHistory;
}

/**
 * 最近的消息列表
 */
export interface IRecentList {
  reqStatus: IHTTPRequestStatus;
  name: string;
  lastUpdateTime: number;
  pinToTopList: IRecentItem[];
  list: IRecentItem[];
}

export interface IUserInfo {
  id: string;
  avatar: string;
  nickname: string;
  [propName: string]: any;
}

export interface IState {
  chatHistory: IChatHistory;
  recentList: IRecentList;
  userInfo: IUserInfo;
}
