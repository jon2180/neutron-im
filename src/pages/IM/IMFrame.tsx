import React, { useEffect, useState } from "react";
import { selectAllChats } from "@/store/recentChatsSlice";
import {
  TeamOutlined,
  UserOutlined,
  MessageOutlined,
  PlusOutlined,
  SearchOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Badge,
  Menu,
  Space,
  Row,
  Col,
  Dropdown,
  message,
} from "antd";
import { useSelector } from "react-redux";

import { Link, NavLink, Switch } from "react-router-dom";

import PrivateRoute from "@/components/PrivateRoute";

import ChatsSider from "./Chats/ChatsSider";
import ChatPanel from "./Chats/ChatPanel";
import ReactIntroduction from "@/components/ReactIntroduction/ReactIntroduction";
import FriendProfile from "./Friends/FriendProfile";
import { FriendsSider } from "./Friends/FriendsSider";
import { GroupsSider } from "./Groups/GroupsSider";
import { connect } from "@/websocket/websocket";
import styles from "./IMFrame.module.less";
import { useAppDispatch } from "@/store/store";
import { fetchUserInfo, selectUserInfo } from "@/store/userInfoSlice";
import { unwrapResult } from "@reduxjs/toolkit";

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

function NavLinks() {
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
  const pathName = document.location.pathname;
  let i = 1;
  for (; i <= navLinks.length; ++i) {
    const link = navLinks[i - 1].to;
    if (
      pathName === link ||
      (pathName.length >= link.length &&
        pathName.substring(0, link.length) === link)
    ) {
      break;
    }
  }

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={[i.toString()]}
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Menu.Item>
        <NavLink to="/im/chats" title="最近">
          <Badge size="small" dot count={unreadCount}>
            <MessageOutlined />
            最近
          </Badge>
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/im/friends" title="好友">
          <UserOutlined />
          好友
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/im/groups" title="群组">
          <TeamOutlined />
          群组
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default function IMFrame() {
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
    <Row className={styles.imWrapper}>
      <Col xs={24} sm={12} md={9} lg={6} xl={6} className={styles.leftCol}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <Avatar
              shape="square"
              size={48}
              src={userInfo.avatar}
              alt="avatar"
            />
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
              {/* <Button
                type="text"
                title="切换主题"
                icon={<BgColorsOutlined />}
              ></Button> */}
              <Button type="text" title="搜索">
                <Link target="_blank" to="/search">
                  <SearchOutlined style={{ color: "#000000" }} />
                </Link>
              </Button>

              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>切换语言</Menu.Item>
                    <Menu.Item>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="/activities"
                      >
                        -&gt;&nbsp;动态
                      </a>
                    </Menu.Item>
                    <Menu.Item /* icon={<DownOutlined />} */>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="/codesnips"
                      >
                        -&gt;&nbsp;代码板
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a target="_blank" rel="noopener noreferrer" href="/mine">
                        -&gt;&nbsp;我的
                      </a>
                    </Menu.Item>
                    <Menu.Item danger disabled>
                      注销登录
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button
                  type="text"
                  title="更多"
                  icon={<PlusOutlined />}
                ></Button>
              </Dropdown>
            </Space>
          </div>
        </div>
        <NavLinks />
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
      </Col>
      <Col xs={24} sm={12} md={15} lg={18} xl={18} className={styles.rightCol}>
        <Switch>
          <PrivateRoute path="/im/chats/:id" exact>
            <ChatPanel />
          </PrivateRoute>
          <PrivateRoute path="/im/friends/:id" exact>
            <FriendProfile />
          </PrivateRoute>
          <PrivateRoute path="/im/groups/:id" exact>
            <FriendProfile />
          </PrivateRoute>
          <PrivateRoute path={["/im", "/im/*"]}>
            <ReactIntroduction />
          </PrivateRoute>
        </Switch>
      </Col>
    </Row>
  );
}
