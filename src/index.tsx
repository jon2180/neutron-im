import React from "react";
import ReactDOM from "react-dom";
// import * as serviceWorker from "./serviceWorker";
// import reportWebVitals from '@/reportWebVitals';

import store from "@/store/store";
import { Provider } from "react-redux";
import { setUserInfo } from "@/store/userInfoSlice";
import { UserInfoSubstate } from "@/@types/state";
import { Cookie } from "@/utils/cookie";

import App from "@/pages/App";
// import "./index.css";
import './index.less';
// import "./socket";

// 获取 登录 状态
// 向服务端发出请求，用于验证 token 是否有效
// 如果有效，直接进入主页
// 否则保持登录状态
// TODO get user info from localStorage
// http only 设置之后，不能通过脚本来查看 cookie
// let token =
//   Cookie.getCookie("authorization") || Cookie.getCookie("Authorization");
//   console.log(window.document.cookie);
// if (token) {
  
// }

function setUserInfoToLocalStorage() {
  
}

function getUserInfoFromLocalStorage() {
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

getUserInfoFromLocalStorage();

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
// serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
