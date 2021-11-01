import React from 'react';
import { Avatar, Dropdown, Layout, Space } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import {
  BgColorsOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  TranslationOutlined,
} from '@ant-design/icons';

import logo from '@/assets/neutron-im-logo-2.png';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@/store/userInfoSlice';
import avatarNavMenu from './components/AvatarNavMenu';

import AppNavMenu from './components/AppNavMenu';
import localeMenu from './components/LocaleMenu';
import ThemeMenu from './components/ThemeMenu';
import NotificationsTab from './components/NotificationsTab';

import styles from './index.module.less';
import { selectMenuTheme } from '@/store/themeSlice';

const AppNav = withRouter(function PureAppNav(props) {
  return (
    <Space className={styles.iconAndNav}>
      <NavLink to="/" className={styles.iconLink}>
        <img src={logo} alt="Neutron IM" />
      </NavLink>
      {/*<AppNavMenu />*/}
    </Space>
  );
});

/**
 * AvatarNav 是Header右方的Avatar相关导航
 * @returns AvatarNav 是Header右方的Avatar相关导航
 */
function AvatarNav() {
  const userInfo = useSelector(selectUserInfo);

  return (
    <Space size={16} align="end" className={styles.rightCol}>
      <div className={styles.searchLink}>
        <NavLink to="/search">
          <SearchOutlined
          // style={{ color: "#666666", fontSize: "16px" }}
          />
        </NavLink>
      </div>

      <div className={styles.docLink}>
        <NavLink to="/react">
          <QuestionCircleOutlined
          // style={{ color: "#666666", fontSize: "16px" }}
          />
        </NavLink>
      </div>

      <Dropdown overlay={<NotificationsTab />}>
        <div className={styles.notificationsLink}></div>
      </Dropdown>

      <Dropdown overlay={avatarNavMenu}>
        <div className={styles.avatarNav}>
          <Avatar
            size="small"
            src={userInfo.avatar}
            alt="avatar"
            className={styles.avatar}
          />
          <span className={styles.username}>{userInfo.nickname}</span>
        </div>
      </Dropdown>

      <Dropdown overlay={ThemeMenu}>
        <div className={styles.accountLink}>
          <BgColorsOutlined />
        </div>
      </Dropdown>

      <Dropdown overlay={localeMenu}>
        <div className={styles.localeLink}>
          <TranslationOutlined
            style={{ fontSize: '16px' }}
            className={styles.localeSelector}
          />
        </div>
      </Dropdown>
    </Space>
  );
}

export default withRouter(function BasicHeader(props) {
  return (
    <Layout.Header
      className={styles.header}
      style={{
        backgroundColor: '#ffffff',
        color: '#333333',
      }}
    >
      <AppNav />
      <AvatarNav />
    </Layout.Header>
  );
});
