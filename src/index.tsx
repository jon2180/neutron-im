import React from "react";
import ReactDOM from "react-dom";

import store from "@/store/store";
import { Provider } from "react-redux";

import App from "@/pages/App";
import "./themes/index.less";
import reportWebVitals from "./reportWebVitals";
import { initializeUserInfo } from "./utils/localStorage";
import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale/zh_CN";
import { IntlProvider } from "react-intl";
import locals, { importLocaleSetting } from "@/locales";

initializeUserInfo();

function Index() {
  let localeName = importLocaleSetting();

  if (!localeName) {
    localeName = "zh_CN";
  }

  console.log(locals[localeName]);

  return (
    <Provider store={store}>
      <ConfigProvider locale={zh_CN}>
        <IntlProvider {...locals[localeName]}>
          <App />
        </IntlProvider>
      </ConfigProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
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
reportWebVitals(console.log);
