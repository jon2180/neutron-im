import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo, UserinfoQueryParamsType } from "@/services/user";
import { UserInfoSubstate } from "@/types/state";

export const fetchUserInfo = createAsyncThunk<any, UserinfoQueryParamsType, {}>(
  "userInfo/fetchUserInfo",
  async (params) => {
    const res = await getUserInfo(params);
    return res.data;
  }
);

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    hasLogin: false,
    id: "",
    nickname: "",
    avatar: "",
  } as UserInfoSubstate,
  reducers: {
    setUserInfo: (state, action) => {
      return action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      console.log("fetchUserInfo rejected: " + action);
    });
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
