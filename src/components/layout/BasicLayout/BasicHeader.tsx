import React from "react";
import { useSelector } from "react-redux";
import { Dropdown, Layout, Menu, Avatar, Space, Tabs } from "antd";
import { selectUserInfo } from "@/store/userInfoSlice";
import styles from "./Layout.module.less";
import logo from "@/assets/neutron-im-logo-2.png";
import { NavLink, withRouter } from "react-router-dom";
import {
  QuestionCircleOutlined,
  SearchOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { exportLocaleSetting } from "@/locales";
import type { LocaleNameType } from "@/locales";
import { FormattedMessage } from "react-intl";

const AppNav = withRouter(function PureAppNav(props) {
  return (
    <div className={styles.iconAndNav}>
      <NavLink to="/" className={styles.iconLink}>
        <img src={logo} alt="Neutron IM" />
      </NavLink>
      <Menu
        mode="horizontal"
        theme="light"
        className={styles.menu}
        defaultSelectedKeys={[props.match.path]}
      >
        <Menu.Item key={"/activities"}>
          <NavLink to="/activities">
            <FormattedMessage
              id="menu.activities"
              defaultMessage="Activities"
            />
          </NavLink>
        </Menu.Item>
        <Menu.Item key={"/codesnips"}>
          <NavLink to="/codesnips">
            <FormattedMessage
              id="menu.codesnips"
              defaultMessage="Code Snipates"
            />
          </NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
});

function changeLocale(key: string) {
  if (exportLocaleSetting(key as LocaleNameType)) {
    document.location.reload();
  }
}

export function AccountMenu() {
  return (
    <Menu className={styles.nav}>
      <Menu.Item>
        <NavLink to={`/editor`}>
          <FormattedMessage id="menu.editor" defaultMessage="Editor" />
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/im">
          <FormattedMessage id="menu.im" defaultMessage="Instant Messaging" />
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to={`/accounts/`}>
          <FormattedMessage
            id="menu.accountCenter"
            defaultMessage="Account Center"
          />
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to={`/accounts/settings/profile`}>
          <FormattedMessage
            id="menu.profileSettings"
            defaultMessage="Account Settings"
          />
        </NavLink>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item danger>
        <NavLink to={`/logout`}>
          <FormattedMessage id="menu.logout" defaultMessage="Quit" />
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

/**
 * AvatarNav 是Header右方的Avatar相关导航
 * @returns AvatarNav 是Header右方的Avatar相关导航
 */
function AvatarNav() {
  const userInfo = useSelector(selectUserInfo);

  return (
    <Space size={8} align="end" className={styles.rightCol}>
      <div className={styles.searchLink}>
        <NavLink to="/search">
          <SearchOutlined style={{ color: "#666666", fontSize: "16px" }} />
        </NavLink>
      </div>

      <div className={styles.docLink}>
        <NavLink to="/react">
          <QuestionCircleOutlined
            style={{ color: "#666666", fontSize: "16px" }}
          />
        </NavLink>
      </div>

      <Dropdown
        overlay={
          <Tabs>
            <Tabs.TabPane tab="a">123</Tabs.TabPane>
            <Tabs.TabPane tab="b">456</Tabs.TabPane>
            <Tabs.TabPane tab="c">789</Tabs.TabPane>
          </Tabs>
        }
      >
        <div className={styles.notificationsLink}></div>
      </Dropdown>

      <Dropdown overlay={<AccountMenu />}>
        <div className={styles.accountLink}>
          <Avatar src={userInfo.avatar}></Avatar>
          <span className={styles.username}>{userInfo.nickname}</span>
        </div>
      </Dropdown>

      <Dropdown
        overlay={
          <Menu
            className={styles.nav}
            onClick={(e) => {
              changeLocale(e.key as string);
            }}
          >
            <Menu.Item key="zh_CN">中文</Menu.Item>
            <Menu.Item key="en_US">English</Menu.Item>
          </Menu>
        }
      >
        <div className={styles.localeLink}>
          <TranslationOutlined
            style={{ fontSize: "16px" }}
            className={styles.localeSelector}
          />
        </div>
      </Dropdown>
    </Space>
  );
}

export default withRouter(function BasicHeader(props) {
  return (
    <Layout.Header className={styles.header}>
      <AppNav />
      <AvatarNav />
    </Layout.Header>
  );
});
