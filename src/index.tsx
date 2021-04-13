import React from "react";
import ReactDOM from "react-dom";

import store from "@/store/store";
import { Provider } from "react-redux";

import App from "@/pages/App";
import "./themes/index.less";
import { initializeUserInfo } from "./utils/localStorage";
import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale/zh_CN";
// import { IntlProvider } from "react-intl";
// import zhCN from "./locales/zh_CN";

initializeUserInfo();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zh_CN}>
        {/* <IntlProvider locale="zh_CN" messages={zhCN}> */}
        <App />
        {/* </IntlProvider> */}
      </ConfigProvider>
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
