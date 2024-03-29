import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRecentList } from '@/services/chat';
import { exportRecentChat } from '@/utils/localStorage';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { MessageData, Chat } from '@/types/http';
import type { RootState } from '@/types/state';

export const fetchRecentChats = createAsyncThunk<Chat[], undefined, {}>(
  'recentList/fetchChats',
  async () => {
    try {
      const res = await getRecentList();
      if (res.status !== 20000) {
        return [] as Chat[];
      }
      exportRecentChat(res.data);
      return res.data as Chat[];
    } catch (err) {
      return [] as Chat[];
    }
  },
);

const compareFunc = (first: Chat, last: Chat) => {
  if (first.time === last.time) return 0;
  return first.time < last.time ? 1 : -1;
};

export const messageTypeMap: Record<string, string> = {
  image: '[图片]',
  audio: '[语音]',
  video: '[视频]',
};

/**
 * 聊天记录 slice
 */
export const recentChatsSlice = createSlice({
  name: 'recentChats',
  initialState: [] as Chat[],
  reducers: {
    setUnread(state, action) {
      const { accountId, unread } = action.payload;

      let i = 0;
      for (; i < state.length; ++i) {
        if (accountId === state[i].id) break;
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
    pushChat(state, action: PayloadAction<Chat>) {
      state.push(action.payload);
      return state;
    },

    pushLastMessage(state, action: PayloadAction<MessageData>) {
      const message = action.payload;
      // FIXME query user id
      const selfId = '';
      let i = 0;
      for (; i < state.length; ++i) {
        if (message.chat_id === state[i].id) break;
      }

      const lastMsg: string = messageTypeMap[message.content_type]
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
          unread_count: message.sender_id === selfId ? 0 : 1,
          account_avatar: '',
          account_nickname: '',
          last_msg_id: message.id,
          last_msg_time: message.time,
          last_msg_content: lastMsg,
          time: message.time,
        } as Chat);
      } else {
        state[i].last_msg_id = message.id;
        state[i].last_msg_content = lastMsg;
        state[i].time = message.time;
        if (message.sender_id !== selfId) state[i].unread_count++;
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
        state = action.payload;
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

export function selectChatByAccountId(first: string, second: string) {
  return (state: RootState): Chat | undefined =>
    state.recentChats.find(
      (chat) =>
        (chat.sender_id === first && chat.receiver_id === second) ||
        (chat.sender_id === second && chat.receiver_id === first),
    );
}

export const { setUnread, setRecentChats, pushLastMessage, pushChat } =
  recentChatsSlice.actions;

export default recentChatsSlice.reducer;
