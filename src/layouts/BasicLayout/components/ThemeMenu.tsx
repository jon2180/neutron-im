import React from "react";
import { Menu } from "antd";

const ThemeMenu = (
  <Menu
    onClick={(e) => {
      console.log(e);
    }}
  >
    <Menu.Item>Default</Menu.Item>
    <Menu.Item>Light</Menu.Item>
    <Menu.Item>Dark</Menu.Item>
  </Menu>
);

export default ThemeMenu;
