import React from "react";
import { useSelector } from "react-redux";
import { Dropdown, Layout, Menu, Avatar } from "antd";
import { selectUserInfo } from "@/store/userInfoSlice";
import styles from "./Layout.module.less";
import logo from "@/assets/neutron-im-logo-2.png";
import { NavLink, withRouter } from "react-router-dom";

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
              <NavLink to="/activities">动态</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/codesnips">代码剪切板</NavLink>
            </Menu.Item>
          </Menu>
        }
      >
        <NavLink to={`/accounts/${userInfo.id}`}>
          <Avatar src={userInfo.avatar}></Avatar>
          <span>{userInfo.nickname}</span>
        </NavLink>
      </Dropdown>
    </div>
  );
}

export default withRouter(function Header(props) {
  console.log(props);

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.iconAndNav}>
        <NavLink to="/" className={styles.iconLink}>
          <img src={logo} alt="Neutron IM" />
        </NavLink>
        <div>
          <Menu
            mode="horizontal"
            theme="dark"
            className={styles.nav}
            defaultSelectedKeys={[props.match.path]}
          >
            <Menu.Item key={"/im"}>
              <NavLink to="/im">IM</NavLink>
            </Menu.Item>

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
      </div>
      <AvatarNav />
    </Layout.Header>
  );
});
