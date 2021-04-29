import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageData, ChatData } from "@/types/http";
import { RootState } from "@/types/state";
import { getRecentList } from "@/services/chat";
import { message } from "antd";
import { exportRecentChat } from "@/utils/localStorage";

export const fetchRecentChats = createAsyncThunk<ChatData[], undefined, {}>(
  "recentList/fetchChats",
  async () => {
    const key = "fetch";
    try {
      message.loading({ content: "加载最近数据", key });
      const res = await getRecentList();
      message.destroy(key);
      console.log(res);
      if (res.status === 20000) {
        exportRecentChat(res.data);
        return res.data as ChatData[];
      } else {
        return [] as ChatData[];
      }
    } catch (err) {
      return [] as ChatData[];
    }
  }
);

const compareFunc = (first: ChatData, last: ChatData) => {
  if (first.time === last.time) return 0;
  return first.time < last.time ? 1 : -1;
};

const messageTypeMap: Record<string, string> = {
  image: "[图片]",
  audio: "[语音]",
  video: "[视频]",
};

/**
 * 聊天记录 slice
 */
export const recentChatsSlice = createSlice({
  name: "recentChats",
  initialState: [] as ChatData[],
  reducers: {
    setUnread(state, action) {
      const { accountId, unread } = action.payload;

      let i = 0;
      for (; i < state.length; ++i) {
        if (accountId === state[i].account_id) break;
      }

      if (i === state.length) {
        return;
      } else {
        state[i].unread_count = unread;
      }
    },
    setRecentChats(state, action) {
      state.splice(0, state.length, ...action.payload);
      state.sort(compareFunc);
      return state;
    },

    pushLastMessage(state, action: PayloadAction<MessageData>) {
      const message = action.payload;

      let i = 0;
      for (; i < state.length; ++i) {
        if (message.chat_id === state[i].id) break;
      }

      let lastMsg: string = messageTypeMap[message.content_type]
        ? messageTypeMap[message.content_type]
        : message.content;

      if (i === state.length) {
        state.push({
          id: message.chat_id,
          account_id: message.sender_id,
          target_id: message.sender_id,
          receiver_id: message.receiver_id,
          sender_id: message.sender_id,
          status: 0,
          type: 0,
          unread_count: 1,
          account_avatar: "",
          account_nickname: "",
          last_msg_id: message.id,
          last_msg_time: message.time,
          last_msg_content: lastMsg,
          time: message.time,
        } as ChatData);
      } else {
        state[i].last_msg_id = message.id;
        state[i].last_msg_content = lastMsg;
        state[i].time = message.time;
        state[i].unread_count++;
      }
      state.sort(compareFunc);
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchRecentChats.pending, (state, action) => {
      // state.recentChats.reqStatus.status = "loading";
    });
    builder.addCase(fetchRecentChats.fulfilled, (state, action) => {
      // state.recentChats.reqStatus.status = "succeeded";
      // TODO
      if (Array.isArray(action.payload)) {
        state.splice(0, state.length, ...action.payload);
        state = action.payload as ChatData[];
      }
    });
    builder.addCase(fetchRecentChats.rejected, (state, action) => {
      // state.recentChats.reqStatus.status = "failed";
      // state.reqStatus.error = action.error.message;
    });
  },
});

/**
 *
 * @param state 参数类型是　根state
 */
export const selectAllChats = (state: RootState) => state.recentChats;

export const selectRecentChatById = function (id: string) {
  return (state: RootState) => state.recentChats.find((v) => v.id === id);
};

export const {
  setUnread,
  setRecentChats,
  pushLastMessage,
} = recentChatsSlice.actions;

export default recentChatsSlice.reducer;
