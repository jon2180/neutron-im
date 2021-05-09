import React, { useEffect, useState } from "react";
import { selectAllChats } from "@/store/recentChatsSlice";
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
import { useAppDispatch } from "@/store/store";
import { fetchUserInfo, selectUserInfo } from "@/store/userInfoSlice";
import { unwrapResult } from "@reduxjs/toolkit";

import PrivateRoute from "@/components/PrivateRoute";
import ChatsSider from "./Chats/ChatsSider";

import FriendsSider from "./Friends/FriendsSider";
import GroupsSider from "./Groups/GroupsSider";

const navLinks = [
  {
    icon: <MessageOutlined />,
    to: "/im/chats",
    text: "最近",
  },
  {
    icon: <UserOutlined />,
    to: "/im/friends",
    text: "好友",
  },
  {
    icon: <TeamOutlined />,
    to: "/im/groups",
    text: "群组",
  },
];

function LeftSideTopArea() {
  const dispatch = useAppDispatch();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    const func = async () => {
      try {
        const resultAction = await dispatch(fetchUserInfo());
        const userInfo = unwrapResult(resultAction);
        if (userInfo)
          message.info({ content: `获取用户信息成功 ${userInfo.nickname}` });
        else message.warn({ content: `获取用户信息失败` });
      } catch (err) {
        message.error({ content: `获取用户信息失败` });
      }
    };
    func();
  }, [dispatch]);

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
          <Button type="text" title="搜索">
            <Link target="_blank" to="/search">
              <SearchOutlined style={{ color: "#000000" }} />
            </Link>
          </Button>

          <Dropdown
            placement="bottomLeft"
            overlay={
              <Menu>
                <Menu.Item>切换语言</Menu.Item>
                <Menu.Item>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/activities"
                  >
                    动态
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/codesnips"
                  >
                    代码板
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a target="_blank" rel="noopener noreferrer" href="/accounts">
                    我的
                  </a>
                </Menu.Item>
                <Menu.Item danger>注销登录</Menu.Item>
              </Menu>
            }
          >
            <Button type="text" title="更多" icon={<PlusOutlined />}></Button>
          </Dropdown>
        </Space>
      </div>
    </div>
  );
}

function LeftSideBottomArea() {
  const [unreadCount, setUnreadCount] = useState(0);
  const recentChats = useSelector(selectAllChats);

  // 更新未读数量
  useEffect(() => {
    if (Array.isArray(recentChats)) {
      let unread = 0;
      for (let i = 0; i < recentChats.length; ++i) {
        unread += recentChats[i].unread_count;
      }
      setUnreadCount(unread);
    }
  }, [recentChats]);

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
