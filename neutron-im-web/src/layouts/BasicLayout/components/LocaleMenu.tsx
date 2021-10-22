import React from "react";
import { Menu } from "antd";

import { exportLocaleSetting } from "@/locales";
import type { LocaleNameType } from "@/locales";

function changeLocale(key: string) {
  if (exportLocaleSetting(key as LocaleNameType)) {
    document.location.reload();
  }
}

const localeMenu = (
  <Menu
    onClick={(e) => {
      changeLocale(e.key as string);
    }}
  >
    <Menu.Item key="zh_CN">中文</Menu.Item>
    <Menu.Item key="en_US">English</Menu.Item>
  </Menu>
);

export default localeMenu;
