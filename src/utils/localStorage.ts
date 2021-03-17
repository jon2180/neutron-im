import { LocalStorageKey } from "@/config/keys";
import store from "@/store/store";
import { setUserInfo } from "@/store/userInfoSlice";
import { UserInfoSubstate } from "@/types/state";
import { Cookie } from "./cookie";

/**
// 获取 登录 状态
// 向服务端发出请求，用于验证 token 是否有效
// 如果有效，直接进入主页
// 否则保持登录状态
 */
export function initializeUserInfo() {
  // 在进入应用的时候开始读取 localStorage 中是否存在用户信息
  const userInfoStr = localStorage.getItem(LocalStorageKey.USERINFO);
  const token = Cookie.getCookie("authorization") || Cookie.getCookie("Authorization");
  if (!token) {
    return;
  }

  // 如果存在用户信息，就将用户信息设置进 redux
  if (userInfoStr) {
    try {
      const userInfo = JSON.parse(userInfoStr) as UserInfoSubstate;
      console.log("Read user`s information from localStorage : %s", userInfo);
      if (userInfo.id && userInfo.email)
        store.dispatch(setUserInfo({
          ...userInfo,
          hasLogin: true,
        }));
    } catch (err) {
      console.error(err);
    }
  } else {
    // 否则向远端发出请求获取用户数据
    console.log("TODO: Should fetch user`s information from remote server");
    // store.dispatch(fetchUserInfo({}));
  }
}
