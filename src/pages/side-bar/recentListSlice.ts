import { createSlice, /*  nanoid, */ createAsyncThunk } from "@reduxjs/toolkit";
import { getRecentList } from "../../services/chat";
import { IRecentList, IState } from "../../store/data";
import { message } from "antd";

const initialState: IRecentList = {
  reqStatus: {
    status: "idle",
    error: null,
  },
  name: "",
  lastUpdateTime: Date.now(),
  pinToTopList: [],
  list: [
    // {
    // accountId: Random.id(),
    // avatar: Random.image("48x48"),
    // accountName: Random.cname(),
    // lastMsg: Random.cparagraph(1, 140),
    // // time: Random.time(),
    // time: Random.date() + " " + Random.time(),
    // unread: Random.integer(0, 100),
    // }
  ],
};

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

export const recentListSlice = createSlice({
  name: "recentList",
  initialState,
  reducers: {
    setList: (state, action) => {
      // TODO
      state.lastUpdateTime = Date.now();
      state.list = action.payload.list;
    },
  },
  extraReducers: {
    [fectchChats.pending.toString()]: (state, action) => {
      state.reqStatus.status = "loading";
    },
    [fectchChats.fulfilled.toString()]: (state, action) => {
      state.reqStatus.status = "succeeded";
      state.list = state.list.concat(action.payload);
    },
    [fectchChats.rejected.toString()]: (state, action) => {
      state.reqStatus.status = "failed";
      state.reqStatus.error = action.error.message;
    },
  },
});

export const { setList } = recentListSlice.actions;

/**
 *
 * @param state 参数类型是　根state
 */
export const selectAllChats = (state: IState) => state.recentList.list;

export const selectChat = (state: IState, id: string) =>
  state.recentList.list.find((v) => v.accountId === id);

export default recentListSlice.reducer;
