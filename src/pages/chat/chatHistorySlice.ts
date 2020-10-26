import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../types";
import { IChatHistory, IState } from "../../store/data";

export interface IAction {
  type: string;
  payload: {
    accountId: string;
    message: IMessage;
  };
}
/**
 * 单聊
 */
export const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState: {
    singleChat: {},
    groupChat: {},
  },
  reducers: {
    pushToSingleChat: (state: IChatHistory, action: IAction) => {
      if (state.singleChat[action.payload.accountId]) {
        state.singleChat[action.payload.accountId].chatHistory = [
          ...state.singleChat[action.payload.accountId].chatHistory,
          action.payload.message,
        ];
      } else {
        state.singleChat[action.payload.accountId] = {
          name: "",
          avatar: "",
          chatHistory: [action.payload.message],
        };
      }
    },
    pushToGroupChat: (state: IChatHistory, action) => {
      if (state.groupChat[action.payload.groupId]) {
        const ch = state.groupChat[action.payload.accountId].chatHistory;
        state.groupChat[action.payload.accountId].chatHistory = [
          ...ch,
          action.payload.message,
        ];
      } else {
        state.groupChat[action.payload.accountId] = {
          name: "",
          avatar: "",
          groupNotices: [],
          chatHistory: [action.payload.message],
        };
      }
    },
  },
});

export const { pushToGroupChat, pushToSingleChat } = chatHistorySlice.actions;

export const selectSingleChat = (state: IState) => state.chatHistory.singleChat;

export default chatHistorySlice.reducer;
