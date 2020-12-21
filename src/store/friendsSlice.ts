import { getFriendList } from "@/services/friend";
import { FriendsSubstate } from "@/@types/state";
import { FriendListItemData, HttpResponseData } from "@/@types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

export const fetchFriendList = createAsyncThunk<
  FriendListItemData[] | undefined,
  {
    id: string;
  },
  {}
>("friends/fetchFriendList", async (params) => {
  try {
    const res = await getFriendList();
    if (res.code === 10001) {
      return res.data;
    }
    message.info("没有好友列表信息");
    return res.data;
  } catch (err) {
    message.error({
      content: err.message,
    });
  }
});

const friendListSlice = createSlice({
  name: "friends",
  initialState: {
    lastUpdated: Date.now(),
    friendList: [],
  } as FriendsSubstate,
  reducers: {
    setFriendList(state, action) {
      console.log(state);
      console.log(action);
      state.friendList = action.payload;
      // return state.friendList;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchFriendList.fulfilled, (state, action) => {
      console.log(action);
      if (action.payload) {
        state.friendList = action.payload;
        state.lastUpdated = Date.now();
      } else {
        console.log('更新好友列表失败')
      }
    });
    builder.addCase(fetchFriendList.rejected, (state, action) => {
      console.log(action);
      // return state.friendList;
    });
  },
});

export const { setFriendList } = friendListSlice.actions;

export default friendListSlice.reducer;
