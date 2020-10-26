import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { Tabs, List } from "antd";
import RecentChatItem from "../../components/recent-chat-item/RecentChatItem";
import FriendItem from "../../components/friend-item/FriendItem";
import { MenuOutlined } from "@ant-design/icons";

import styles from "./SideBar.module.css";
import useWindowDimensions from "../../utils/useWindowDimensions";
// import { getRecentList } from "../../services/chat";

import { /* setList, */ selectAllChats, fectchChats } from "./recentListSlice";
import { useDispatch, useSelector } from "react-redux";

import SideBarHeader from "./PageHeader";
// import { getFriendList } from "../../services/friend";
import { IFriendListItem } from "../../types";
import { IState } from "../../store/data";

const callback = (e: string) => {
  switch (e) {
    case "1":
      console.log("获取最近消息列表...");
      break;
    case "2":
      console.log("获取好友列表...");
      break;
    case "3":
      console.log("获取功能列表...");
      break;
    case "4":
      console.log("获取个人信息...");
      break;
    default:
      console.log("没有此标签页");
  }
};

export default function SideBarArea() {
  // TODO
  // const recentChatData: any[] = ;
  const dispatch = useDispatch();
  const select = useSelector(selectAllChats);
  const postStatus = useSelector(
    (state: IState) => state.recentList.reqStatus.status
  );
  useEffect(() => {
    if (postStatus === "idle") dispatch(fectchChats());
    // // 从后端获取数据
    // getRecentList().then((res) => {
    //   dispatch(
    //     setList({
    //       list: res.data,
    //     })
    //   );
    // });
  }, [dispatch, postStatus]);

  // TODO　初始化加载数据　异步
  let friendList: IFriendListItem[] = [];
  // getFriendList().then((res) => {
  //   console.log(res)
  //   friendList = res.data;
  // });

  const { height } = useWindowDimensions();

  return (
    <div>
      <SideBarHeader></SideBarHeader>
      <Tabs defaultActiveKey="1" onChange={callback} centered>
        <Tabs.TabPane
          tab="最近"
          key="1"
          className={styles.tabContent}
          style={{
            height: `${height - 128}px`,
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={select}
            renderItem={(item) => (
              <List.Item style={{ padding: "0" }}>
                <Link to={`/recent/${item.accountId}`}>
                  <RecentChatItem data={item} />
                </Link>
              </List.Item>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="好友"
          key="2"
          className={styles.tabContent}
          style={{
            height: `${height - 128}px`,
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={friendList}
            renderItem={(item) => (
              <List.Item style={{ padding: "0" }}>
                <Link to={`/friend/${item.accountId}`}>
                  <FriendItem data={item} />
                </Link>
              </List.Item>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="生态" key="3">
          <Link to="/activities">
            <MenuOutlined></MenuOutlined>{" "}
          </Link>
        </Tabs.TabPane>
        <Tabs.TabPane tab="我的" key="4">
          我的
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
