import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfo } from "@/services/user";

import type { RootState, UserInfoState, UserInfoSubstate } from "@/types/state";

/**
 * 获取 userInfo
 */
export const fetchUserInfo = createAsyncThunk<UserInfoSubstate | null, void>(
  "userInfo/fetchUserInfo",
  async (_, { getState, requestId, rejectWithValue }) => {
    const { currentRequestId, loading } = (getState() as RootState).userInfo;
    if (loading !== "pending" || requestId !== currentRequestId) {
      return null;
    }
    const res = await getUserInfo();
    if (res.status >= 20000 && res.status < 30000) {
      console.log(res);
      return res.data as UserInfoSubstate;
    } else {
      return rejectWithValue(res);
    }
  }
);

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    loading: "idle",
    error: null,
    currentRequestId: undefined,
    hasLogin: true,
    data: {
      id: "",
      nickname: "",
      avatar: "",
      birthday: null,
      email: "",
      reg_time: null,
      signature: null,
      status: 0,
      tel: null,
      enabled: true,
    } as UserInfoSubstate,
  } as UserInfoState,
  reducers: {
    setHasLogin(state, action: PayloadAction<boolean>) {
      state.hasLogin = action.payload;
      return state;
    },
    setUserInfo(state, action: PayloadAction<UserInfoSubstate>) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserInfo.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.currentRequestId = undefined;
        if (action.payload && action.payload.id)
          state.data = {
            ...state.data,
            ...action.payload,
          };
      }
      return state;
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === "pending" && state.currentRequestId === requestId) {
        state.loading = "idle";
        state.error = action.error;
        state.currentRequestId = undefined;
      }
    });
  },
});

export const { setHasLogin, setUserInfo } = userInfoSlice.actions;

export const selectUserInfo = (state: RootState) => state.userInfo.data;
export const selectHasLogin = (state: RootState) => state.userInfo.hasLogin;

export default userInfoSlice.reducer;
