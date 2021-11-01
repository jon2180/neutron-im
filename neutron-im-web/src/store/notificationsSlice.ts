import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { message } from "antd";
import type { RootState } from '@/types/state';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {},
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    friendRequests: [],
    groupsInvitations: [],
    groupsRequests: [],
  } as {
    /** 加好友申请 */
    friendRequests: {}[];
    /** 邀请入群 */
    groupsInvitations: [];
    /** 作为群管理员时的入群申请 */
    groupsRequests: [];
  },
  reducers: {
    setFriendRequests(state, action) {},
    setGroupsInvitation(state, action) {},
    setGroupsRequests(state, action) {},
    setNotifications(state, action) {},
    handledFriendRequests(state, action) {},
    handledGroupsInvitation(state, action) {},
    handledGroupsRequests(state, action) {},
    // setFriendList(state, action) {
    //   if (!action.payload || !Array.isArray(action.payload)) {
    //     return;
    //   }
    //   state.splice(0, state.length);
    //   for (let i = 0; i < action.payload.length; ++i) {
    //     state.push(action.payload[i]);
    //   }
    // },
  },
  extraReducers(builder) {},
});

export const {
  setFriendRequests,
  setGroupsInvitation,
  setGroupsRequests,
  setNotifications,
} = notificationsSlice.actions;
export const selectAllFriendsRequests = (state: RootState) =>
  state.notifications.friendRequests;
// export const selectFriendRequestById = (state: RootState) => state.notifications.friendRequests.find()

export default notificationsSlice.reducer;
