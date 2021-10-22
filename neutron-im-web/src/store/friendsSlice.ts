import { getFriends } from '@/services/friend';
import { exportFriends } from '@/utils/localStorage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import type { RootState } from '.';

import type { Friend } from '@/types/http';

export const fetchFriendList = createAsyncThunk<Friend[], undefined, {}>(
  'friends/fetchFriendList',
  async () => {
    try {
      const res = await getFriends();
      console.log(res);

      if (res.status === 20000) {
        if (Array.isArray(res.data)) {
          exportFriends(res.data);
          return res.data as Friend[];
        } else return [] as Friend[];
      }
    } catch (err) {
      message.info('没有好友列表信息');
    }
    return [] as Friend[];
  },
);

const friendListSlice = createSlice({
  name: "friends",
  initialState: [] as Friend[],
  reducers: {
    pushFriends(state, action: { payload: Friend[] | Friend }) {
      if (!action.payload) {
        return;
      }
      if (Array.isArray(action.payload)) {
        const len = state.length;
        state.splice(len, 0, ...action.payload);
      } else {
        state.push(action.payload);
      }
    },
    setFriendList(state, action) {
      if (!action.payload || !Array.isArray(action.payload)) {
        return;
      }
      state.splice(0, state.length);
      for (let i = 0; i < action.payload.length; ++i) {
        state.push(action.payload[i]);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchFriendList.fulfilled, (state, action) => {
      if (action.payload && Array.isArray(action.payload)) {
        console.log(action.payload);

        state.splice(0, state.length, ...action.payload);
      } else {
        console.log("更新好友列表失败");
      }
    });
    builder.addCase(fetchFriendList.rejected, (state, action) => {
      console.error(action);
    });
  },
});
export const selectFriendList = (state: RootState) => state.friends;

export const { setFriendList } = friendListSlice.actions;

export default friendListSlice.reducer;
