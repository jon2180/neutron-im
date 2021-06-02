import React, { useState } from "react";
import { Card } from "antd";

import FriendRequests from "./FriendRequests";

import styles from "./Management.module.less";
import WideContentWrapper from "@/components/WideContentWrapper";
import MyRequests from "./MyRequests";

export default function Management(props: { children: JSX.Element }) {
  const [tabkey, setTabKey] = useState("");
  console.log(props.children);
  const tabList = [
    {
      tab: "好友申请",
      key: "friend_requests",
      component: <FriendRequests />,
    },
    {
      tab: "邀请入群",
      key: "invite_enter_group",
      component: <FriendRequests />,
    },
    {
      tab: "我的申请",
      key: "my_requests",
      component: <MyRequests />,
    },
  ];

  let components: Record<string, any> = {};
  for (let item of tabList) {
    components[item.key] = item.component;
  }

  return (
    <WideContentWrapper>
      <Card
        className={styles.mainCard}
        tabList={tabList}
        onTabChange={(key) => {
          setTabKey(key);
        }}
      >
        {components[tabkey]}
        {/* <Tabs tabPosition="top">
          <Tabs.TabPane tab="好友申请" key="1">
            <FriendRequests />
          </Tabs.TabPane>
          <Tabs.TabPane tab="邀请入群" key="2"></Tabs.TabPane>
          <Tabs.TabPane tab="我的申请" key="3">
            <MyRequests />
          </Tabs.TabPane>
        </Tabs> */}
      </Card>
    </WideContentWrapper>
  );
}
