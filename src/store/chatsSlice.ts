import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageData } from "@/@types/types";
import { ChatsSubstate, RootState } from "@/@types/state";
import { queryChatHistory, QueryType,getRecentList } from "@/services/chat";
import { message } from "antd";

export const fetchChatHistory = createAsyncThunk<
  { data: MessageData[]; params: QueryType } | undefined,
  QueryType,
  {}
>("chats/fetchChatHistory", async (data) => {
  try {
    const res = await queryChatHistory(data);
    // TODO
    if (res.code === 10001) {
      return {
        data: res.data,
        params: data,
      };
    }
  } catch (err) {
    console.log(err);
  }
});

export const fectchChats = createAsyncThunk(
  "recentList/fetchChats",
  async () => {
    const key = "fetch";
    message.loading({ content: "加载最近数据", key });
    // notification.info({
    //   message: "加载中"
    // });
    const res = await getRecentList();
    message.destroy(key);
    return res.data;
  }
);

export interface IAction {
  accountId: string;
  message: MessageData;
}

/**
 * 聊天记录 slice
 */
export const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    chatHistories: {},
    lastUpdated: Date.now(),
    recentChats: {
      reqStatus: {
        status: "idle",
        error: null,
      },
      name: "",
      lastUpdateTime: Date.now(),
      pinToTopList: [],
      list: [],
    }
  } as ChatsSubstate,
  reducers: {
    pushMessage(state, action: PayloadAction<IAction>) {
      const { accountId, message } = action.payload;
      if (!state.chatHistories[accountId]) {
        state.chatHistories[accountId] = {
          name: "",
          avatar: "",
          messages: [],
        };
      }
      state.chatHistories[accountId].messages.push(message);
    },
    setList: (state, action) => {
      // TODO
      state.recentChats.lastUpdateTime = Date.now();
      state.recentChats.list = action.payload.list;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchChatHistory.fulfilled, (state, action) => {
      if (action.payload?.params.chatId) {
        if (state.chatHistories[action.payload.params.chatId]) {
          state.chatHistories[action.payload.params.chatId].messages.unshift(
            ...action.payload.data
          );
        } else {
          state.chatHistories[action.payload.params.chatId] = {
            messages: [...action.payload.data],
            avatar: "",
            name: "",
          };
        }
      } else {
        message.error("请提供聊天id");
      }
    });

    builder.addCase(fectchChats.pending, (state, action) => {
      state.recentChats.reqStatus.status = "loading";
    });
    builder.addCase(fectchChats.fulfilled, (state, action) => {
      state.recentChats.reqStatus.status = "succeeded";
      state.recentChats.list = state.recentChats.list.concat(action.payload);
    });
    builder.addCase(fectchChats.rejected, (state, action) => {
      state.recentChats.reqStatus.status = "failed";
      // state.reqStatus.error = action.error.message;
    });
  },
});

export const { pushMessage } = chatsSlice.actions;

export function selectChatHistoryById(id: string) {
  return (state: RootState) => {
    return state.chats.chatHistories[id];
  };
}

/**
 *
 * @param state 参数类型是　根state
 */
export const selectAllChats = (state: RootState) =>
  state.chats.recentChats.list;

export const selectRecentChatById = function (id: string) {
  return (state: RootState) => state.chats.recentChats.list.find((v) => v.accountId === id);
}


export default chatsSlice.reducer;



// /**
//  * 单聊的聊天记录
//  */
// export interface ISingleChatHistory {
//   [id: string]: {
//     name: string;
//     avatar: string;
//     chatHistory: Array<IMessage>;
//   };
// }

// /**
//  * 群聊的聊天记录
//  */
// export interface IGroupChatHistory {
//   [groupId: string]: {
//     name: string;
//     avatar: string;
//     groupNotices: Array<INotice>;
//     chatHistory: Array<IMessage>;
//   };
// }
