import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo, UserinfoQueryParamsType } from "@/services/user";

export const fetchUserInfo = createAsyncThunk(
  "userInfo/fetchUserInfo",
  async (params: UserinfoQueryParamsType) => {
    const res = await getUserInfo(params);
    return res.data;
  }
);

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    id: "",
    nickname: "",
    avatar: "",
  },
  reducers: {
    setUserInfo: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [fetchUserInfo.fulfilled.toString()]: (state, action) => {
      return action.payload;
    },
    [fetchUserInfo.rejected.toString()]: (state, action) => {
      console.log("fetchUserInfo rejected: " + action);
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
