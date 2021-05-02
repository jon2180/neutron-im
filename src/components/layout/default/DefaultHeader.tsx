import React from "react";
import { useSelector } from "react-redux";
import { Dropdown, Layout, Menu, Avatar } from "antd";
import { selectUserInfo } from "@/store/userInfoSlice";
import styles from "./Layout.module.less";
import logo from "@/assets/neutron-im-logo-2.png";
import { NavLink, withRouter } from "react-router-dom";

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
          <NavLink to="/activities">动态</NavLink>
        </Menu.Item>
        <Menu.Item key={"/codesnips"}>
          <NavLink to="/codesnips">代码剪切板</NavLink>
        </Menu.Item>
        <Menu.Item key={"/search"}>
          <NavLink to="/search">搜索</NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
});

/**
 * AvatarNav 是Header右方的Avatar相关导航
 * @returns AvatarNav 是Header右方的Avatar相关导航
 */
function AvatarNav() {
  const userInfo = useSelector(selectUserInfo);

  return (
    <div className={styles.rightCol}>
      <Dropdown
        overlay={
          <Menu className={styles.nav}>
            <Menu.Item>
              <NavLink to="/im">IM</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to={`/accounts/${userInfo.id}`}>个人中心</NavLink>
            </Menu.Item>
          </Menu>
        }
      >
        <div className={styles.accountLink}>
          <Avatar src={userInfo.avatar}></Avatar>
          <span className={styles.username}>{userInfo.nickname}</span>
        </div>
      </Dropdown>
    </div>
  );
}

export default withRouter(function Header(props) {
  return (
    <Layout.Header className={styles.header}>
      <AppNav />
      <AvatarNav />
    </Layout.Header>
  );
});
