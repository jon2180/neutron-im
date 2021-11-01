import React from 'react';
import { Menu } from 'antd';

const ThemeMenu = (
  <Menu
    onClick={(e) => {
      console.log(e);
    }}
  >
    <Menu.Item key="default">Default</Menu.Item>
    <Menu.Item key="light">Light</Menu.Item>
    <Menu.Item key="dark">Dark</Menu.Item>
  </Menu>
);

export default ThemeMenu;
