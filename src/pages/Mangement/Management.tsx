import React from "react";
import { Card, Tabs } from "antd";

import FriendRequests from "./FriendRequests";

import styles from "./Management.module.less";

export default function Management(props: { children: JSX.Element }) {
  console.log(props.children);
  return (
    <Card className={styles.mainCard} title="申请管理">
      <Tabs tabPosition="top">
        <Tabs.TabPane tab="好友申请" key="1">
          Content of Tab 1
          <FriendRequests />
        </Tabs.TabPane>
        <Tabs.TabPane tab="邀请入群" key="2">
          Content of Tab 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="我的申请" key="3">
          Content of Tab 3
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}
