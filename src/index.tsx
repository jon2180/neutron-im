import React from "react";
import ReactDOM from "react-dom";

import store from "@/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import App from "@/pages/App";
import "./themes/index.less";
import reportWebVitals from "./reportWebVitals";
import { initializeUserInfo } from "./utils/localStorage";
import { HelmetProvider } from "react-helmet-async";
import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale/zh_CN";
import en_US from "antd/lib/locale/en_US";
import { IntlProvider } from "react-intl";
import locals, { importLocaleSetting } from "@/locales";

const antdLocaleConfiguration = {
  zh_CN: zh_CN,
  en_US: en_US,
};

initializeUserInfo();

window.onerror = (message, source, lineno, colno, error) => {
  console.log(message);
  return true;
};

window.addEventListener(
  "error",
  (e) => {
    console.log(e, "hello");
    // e.preventDefault();
    e.stopPropagation();
    return true;
  },
  false
);

function Index() {
  let localeName = importLocaleSetting();

  if (!localeName) {
    localeName = "zh_CN";
  }

  console.log(locals[localeName]);

  return (
    <Provider store={store}>
      <ConfigProvider locale={antdLocaleConfiguration[localeName]}>
        <HelmetProvider>
          <IntlProvider {...locals[localeName]}>
            <App />
          </IntlProvider>
        </HelmetProvider>
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
if (process.env.NODE_ENV === "production") serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (process.env.NODE_ENV === "test") reportWebVitals(console.log);
