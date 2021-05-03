import React from "react";
import { useAppDispatch } from "@/store/store";
import { setHasLogin, setUserInfo } from "@/store/userInfoSlice";
import { Redirect } from "react-router-dom";

import type { UserInfoSubstate } from "@/types/state";

function clearAllCookie() {
  const keys = document.cookie.match(/[^ =;]+(?==)/g);
  if (keys) {
    for (let i = keys.length; --i; ) {
      document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }
}

export default function Logout() {
  const dispatch = useAppDispatch();
  dispatch(setHasLogin(false));
  dispatch(setUserInfo({} as UserInfoSubstate));
  // localStorage.removeItem("userInfo");
  localStorage.clear();
  clearAllCookie();
  return <Redirect to="/" />;
}
