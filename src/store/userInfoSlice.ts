import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo, UserinfoQueryParamsType } from "@/services/user";
import { UserInfoSubstate } from "@/types/state";
import { LocalStorageKey } from "@/config/keys";

export const fetchUserInfo = createAsyncThunk("userInfo/fetchUserInfo", async (params: UserinfoQueryParamsType) => {
  const res = await getUserInfo(params);
  console.log("Fetched user info: %s", res);
  localStorage.setItem(LocalStorageKey.USERINFO, JSON.stringify(res));
  return res.data;
});

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    hasLogin: true,
    id: -1,
    nickname: "",
    avatar: "",
    accountNonExpired: true,
    accountNonLocked: true,
    authorities: [],
    birthday: null,
    credentialsNonExpired: true,
    email: "",
    enabled: true,
    registerTime: null,
    signature: null,
    status: 0,
    tel: null,
    uid: "",
    username: "",
  } as UserInfoSubstate,
  reducers: {
    setUserInfo: (state, action) => {
      console.log(action);
      return action.payload;
    },
  },
  extraReducers(builder) {
    // TODO
    // builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
    //   return action.payload;
    // });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      console.log("fetchUserInfo rejected: " + action);
    });
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
