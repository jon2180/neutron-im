import React, { useEffect } from "react";
import {
  TeamOutlined,
  UserOutlined,
  MessageOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Menu, Space, Dropdown, message } from "antd";
import { useSelector } from "react-redux";

import { Link, NavLink, Switch } from "react-router-dom";

import { connect } from "@/websocket/websocket";
import styles from "./IMFrame.module.less";
import { useAppDispatch } from "@/store";
import { fetchUserInfo, selectUserInfo } from "@/store/userInfoSlice";
import { unwrapResult } from "@reduxjs/toolkit";

import PrivateRoute from "@/components/PrivateRoute";
import ChatsSider from "./Chats/ChatsSider";

import FriendsSider from "./Friends/FriendsSider";
import GroupsSider from "./Groups/GroupsSider";
import { changeLocale } from "@/locales";
import { FormattedMessage, useIntl } from "react-intl";

function LeftSideTopArea() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    const func = async () => {
      const resultAction = await dispatch(fetchUserInfo());
      const userInfo = unwrapResult(resultAction);

      // 存在，说明请求成功
      if (userInfo) {
        message.info({ content: `获取用户信息成功 ${userInfo.nickname}` });
        return;
      }
      // 不存在，且是 undefined
      if (typeof userInfo === "undefined") {
        message.warn({ content: `获取用户信息失败` });
        return;
      }
    };
    func();
  }, [dispatch]);

  const onChangeLocale = (e: { key: React.Key }) => {
    if (e.key && typeof e.key === "string" && e.key !== "") changeLocale(e.key);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <Avatar shape="square" size={48} src={userInfo.avatar} alt="avatar" />
        <div className={styles.nickname}>
          {userInfo.nickname || "hello world"}
        </div>
      </div>
      <div
        style={{
          marginTop: "8px",
        }}
      >
        <Space>
          <Button
            type="text"
            title={intl.formatMessage({
              id: "search",
              defaultMessage: "Search",
            })}
          >
            <Link target="_blank" to="/search">
              <SearchOutlined style={{ color: "#000000" }} />
            </Link>
          </Button>

          <Dropdown
            placement="bottomLeft"
            overlay={
              <Menu>
                <Menu.SubMenu
                  title={intl.formatMessage({
                    id: "menu.changeLocale",
                    defaultMessage: "Switch Language",
                  })}
                >
                  <Menu.Item key="zh_CN" onClick={onChangeLocale}>
                    中文
                  </Menu.Item>
                  <Menu.Item key="en_US" onClick={onChangeLocale}>
                    English
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/activities"
                  >
                    <FormattedMessage
                      id="menu.activities"
                      defaultMessage="Activities"
                    />
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/codesnips"
                  >
                    <FormattedMessage
                      id="menu.codesnips"
                      defaultMessage="Code Snipates"
                    />
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a target="_blank" rel="noopener noreferrer" href="/accounts">
                    <FormattedMessage
                      id="menu.accountCenter"
                      defaultMessage="Account Center"
                    />
                  </a>
                </Menu.Item>
                <Menu.Item danger>
                  <NavLink to="/logout">
                    <FormattedMessage id="menu.logout" defaultMessage="Quit" />
                  </NavLink>
                </Menu.Item>
              </Menu>
            }
          >
            <Button
              type="text"
              title={intl.formatMessage({
                id: "more",
                defaultMessage: "More",
              })}
              icon={<PlusOutlined />}
            ></Button>
          </Dropdown>
        </Space>
      </div>
    </div>
  );
}

function LeftSideBottomArea() {
  const intl = useIntl();

  const navLinks = [
    {
      icon: <MessageOutlined />,
      to: "/im/chats",
      text: intl.formatMessage({
        id: "im.menu.recent",
        defaultMessage: "Recent",
      }),
    },
    {
      icon: <UserOutlined />,
      to: "/im/friends",
      text: intl.formatMessage({
        id: "im.menu.friends",
        defaultMessage: "Friends",
      }),
    },
    {
      icon: <TeamOutlined />,
      to: "/im/groups",
      text: intl.formatMessage({
        id: "im.menu.groups",
        defaultMessage: "Groups",
      }),
    },
  ];

  // TODO 添加未读指示徽标
  // const [unreadCount, setUnreadCount] = useState(0);
  // const recentChats = useSelector(selectAllChats);
  // // 更新未读数量
  // useEffect(() => {
  //   if (Array.isArray(recentChats)) {
  //     let unread = 0;
  //     for (let i = 0; i < recentChats.length; ++i) {
  //       unread += recentChats[i].unread_count;
  //     }
  //     setUnreadCount(unread);
  //   }
  // }, [recentChats]);

  // 自动选择 menu 选中项
  const { pathname } = document.location;
  let menuKey = navLinks[0].to;
  for (let i = 0; i < navLinks.length; ++i) {
    const { to } = navLinks[i];
    if (
      pathname === to ||
      (pathname.length >= to.length && pathname.substring(0, to.length) === to)
    ) {
      menuKey = to;
      break;
    }
  }

  return (
    <>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={[menuKey]}
        style={{
          display: "flex",
          justifyContent: "space-around",
          // marginTop: '-48px'
        }}
      >
        {navLinks.map((value) => {
          return (
            <Menu.Item key={value.to}>
              <NavLink to={value.to} title={value.text}>
                {value.icon}
                {value.text}
              </NavLink>
            </Menu.Item>
          );
        })}
      </Menu>
      <div className={styles.listBox}>
        <Switch>
          <PrivateRoute path={["/im/chats", "/im/chats/:id"]} exact>
            <ChatsSider />
          </PrivateRoute>
          <PrivateRoute path={["/im/friends", "/im/friends/:id"]} exact>
            <FriendsSider />
          </PrivateRoute>
          <PrivateRoute path={["/im/groups", "/im/groups/:id"]} exact>
            <GroupsSider />
          </PrivateRoute>
        </Switch>
      </div>
    </>
  );
}

export default function LeftSider() {
  return (
    <div className={styles.leftSider}>
      <LeftSideTopArea />
      <LeftSideBottomArea />
    </div>
  );
}
