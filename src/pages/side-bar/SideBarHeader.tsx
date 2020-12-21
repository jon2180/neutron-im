import React from "react";
import { Menu } from "antd";
import { PageHeader, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./SideBar.module.css";

export function SideBarMenu() {
  return (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          3rd menu item
        </a>
      </Menu.Item>
      <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
  );
}

export const DropdownMenu = (
  <Dropdown overlay={SideBarMenu}>
    <a
      className="ant-dropdown-link"
      href="/"
      onClick={(e) => e.preventDefault()}
    >
      Hover me <DownOutlined />
    </a>
  </Dropdown>
);

export default function SideBarHeader() {
  return (
    <PageHeader
      className={styles.header}
      onBack={() => null}
      title="Neutron-IM"
      backIcon={false}
      ghost={false}
      avatar={{
        shape: "square",
        size: 48,
        src: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      }}
      extra={DropdownMenu}
    />
  );
}
