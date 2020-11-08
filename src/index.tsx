import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider, useSelector } from "react-redux";
import store from "./store/store";

import App from "@/pages/App";
import "./index.css";
import { fetchUserInfo, setUserInfo } from "@/store/userInfoSlice";
import { UserInfoSubstate } from "@/types/state";
import { Cookie } from "./utils/request";
// import { IState } from "./store/data";
// import { Cookie } from "./utils/request";

// 获取 登录 状态
// 向服务端发出请求，用于验证 token 是否有效
// 如果有效，直接进入主页
// 否则保持登录状态
// store.dispatch(fetchUserInfo({ id: "1234567987" }));
// const userinfoState = useSelector((state:IState) => state.userInfo);
// if (Cookie.getCookie('Autorization'))
//   store.dispatch()

// TODO get user info from localStorage
// if exists, logged
let token =
  Cookie.getCookie("authorization") || Cookie.getCookie("Authorization");
if (token) {
  let userInfoJsonStr = localStorage.getItem("userInfo");

  if (userInfoJsonStr) {
    let userInfo: UserInfoSubstate = JSON.parse(userInfoJsonStr);

    if (userInfo.id && userInfo.avatar && userInfo.nickname)
      store.dispatch(
        setUserInfo({
          ...userInfo,
          hasLogin: true,
        })
      );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
