import React, { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { setHasLogin, setUserInfo } from '@/store/userInfoSlice';

import type { UserInfoSubstate } from '@/types/state';
import { userService } from '@/services';
import { useHistory } from 'umi';

function clearAllCookie() {
  const keys = document.cookie.match(/[^ =;]+(?==)/g);
  if (keys) {
    for (let i = keys.length; --i; ) {
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
    }
  }
}

export default function Logout() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  dispatch(setHasLogin(false));
  dispatch(setUserInfo({} as UserInfoSubstate));
  // localStorage.removeItem("userInfo");
  localStorage.clear();
  clearAllCookie();
  useEffect(() => {
    userService
      .postLogout()
      .then((res) => {
        console.log(res);
        history.replace('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return <></>;
}
