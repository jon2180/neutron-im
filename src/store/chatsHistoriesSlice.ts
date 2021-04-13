import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageData } from "@/types/http";
import { RootState } from "@/types/state";
import { queryChatHistory, QueryType } from "@/services/chat";
import { message } from "antd";

export const fetchChatHistory = createAsyncThunk<
  { data: MessageData[]; params: QueryType } | undefined,
  QueryType,
  {}
>("chats/fetchChatHistory", async (data) => {
  try {
    const res = await queryChatHistory(data);
    if (res.status === 20000) {
      return {
        data: res.data as MessageData[],
        params: data,
      };
    } else {
      // return {
      // }
    }
  } catch (err) {
    console.log(err);
    return {
      data: err,
      params: data,
    };
  }
});

/**
 * 聊天记录 slice
 */
export const chatsSlice = createSlice({
  name: "chatsHistories",
  initialState: {
    loading: "idle" as "idle" | "pending",
    currentRequestId: undefined as string | undefined,
    error: null as any,
    data: {} as {
      [id: string]: {
        name: string;
        avatar: string;
        messages: MessageData[];
      };
    },
  },
  reducers: {
    pushMessage(state, action: PayloadAction<MessageData>) {
      const { chat_id } = action.payload;

      if (!state.data[chat_id]) {
        state.data[chat_id] = {
          name: "",
          avatar: "",
          messages: [],
        };
      }
      state.data[chat_id].messages.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchChatHistory.fulfilled, (state, action) => {
      if (action.payload?.params.chatId) {
        if (state.data[action.payload.params.chatId]) {
          state.data[action.payload.params.chatId].messages.unshift(
            ...action.payload.data
          );
        } else {
          state.data[action.payload.params.chatId] = {
            messages: [...action.payload.data],
            avatar: "",
            name: "",
          };
        }
      } else {
        message.error("请提供聊天id");
      }
      return state;
    });
  },
});

export const { pushMessage } = chatsSlice.actions;

export function selectChatHistoryById(id: string) {
  return (state: RootState) => {
    return state.chatHistories.data[id];
  };
}

/**
 *
 * @param state 参数类型是　根state
 */
export const selectAllChats = (state: RootState) => state.chatHistories.data;

export default chatsSlice.reducer;
