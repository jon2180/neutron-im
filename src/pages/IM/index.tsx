import React from "react";

import useWindowDimensions from "@/utils/hooks";

import { Redirect, Switch } from "react-router-dom";
import { TeamOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import PrivateRoute from "@/components/PrivateRoute";
import ChatPanel from "./Chats/ChatPanel";
import ReactIntroduction from "@/components/ReactIntroduction";
import FriendProfile from "./Friends/FriendProfile";
import WideContentWrapper from "@/components/WideContentWrapper";
import LeftSider from "./LeftSider";
import RightSider from "./RightSider";
import styles from "./IMFrame.module.less";
import "./index.less";

const NAV_LINKS = {
  left: [
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
  ],
  right: [
    {
      path: "/im/chats/:id",
      exact: true,
      component: ChatPanel,
    },
    {
      path: "/im/friends/:id",
      exact: true,
      component: FriendProfile,
    },
    {
      path: "/im/groups/:id",
      exact: true,
      component: FriendProfile,
    },
  ],
};

function OneColLayout() {
  return (
    <Row className={styles.imWrapper}>
      <Col span={24} className={styles.leftCol}>
        <Switch>
          <PrivateRoute path={["/im/chats", "/im/friends", "/im/groups"]} exact>
            <LeftSider />
          </PrivateRoute>
          {NAV_LINKS.right.map((value) => {
            return (
              <PrivateRoute
                path={value.path}
                exact={value.exact}
                key={value.path}
              >
                <value.component />
              </PrivateRoute>
            );
          })}
          <PrivateRoute path={["/im", "/im/*"]}>
            <ReactIntroduction />
          </PrivateRoute>
        </Switch>
      </Col>
    </Row>
  );
}

const autoFitProps = {
  left: {
    xs: 24,
    sm: 11,
    md: 11,
    lg: 8,
    xl: 8,
  },
  right: {
    xs: 24,
    sm: 13,
    md: 13,
    lg: 16,
    xl: 16,
  },
};

function TwoColLayout() {
  return (
    <WideContentWrapper className={styles.wideContent}>
      <Row className={styles.imWrapper}>
        <Col {...autoFitProps.left} className={styles.leftCol}>
          <LeftSider />
        </Col>
        <Col {...autoFitProps.right} className={styles.rightCol}>
          <RightSider />
        </Col>
      </Row>
    </WideContentWrapper>
  );
}

/** antd 中 xs 尺寸的大小 */
export const XS_WIDTH = 576;
/** antd 中 xl 尺寸的大小 */
export const XL_WIDTH = 1200;

function IMFrame() {
  // 监听屏幕宽度
  const { width } = useWindowDimensions({ debounceTime: 300 });
  if (width <= XS_WIDTH) {
    return <OneColLayout />;
  }
  return <TwoColLayout />;
}

export default function IM() {
  return (
    <Switch>
      <PrivateRoute path="/im" exact>
        <Redirect to="/im/chats" push />
      </PrivateRoute>
      <PrivateRoute>
        <IMFrame />
      </PrivateRoute>
    </Switch>
  );
}
