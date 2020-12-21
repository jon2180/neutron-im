import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { Tabs, List } from "antd";
import RecentChatItem from "@/components/recent-chat-item/RecentChatItem";
import FriendItem from "@/components/friend-item/FriendItem";

import styles from "./SideBar.module.css";
import useWindowDimensions from "@/utils/useWindowDimensions";
import { fectchChats, selectAllChats } from '@/store/chatsSlice';
import { fetchFriendList } from "@/store/friendsSlice";
import { useDispatch, useSelector } from "react-redux";

import SideBarHeader from "./SideBarHeader";
import { RootState } from "@/@types/state";

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

/**
 * 获取侧边栏宽度
 * @param width 屏幕宽度
 */
const getListItemWidth = (width: number) => Math.floor(width / 3) - 80;

/**
 * 获取侧边栏盒子高度
 * @param height 屏幕高度
 */
const getListBoxHeight = (height: number) => Math.floor(height) - 128;

export default function SideBarArea() {
  const dispatch = useDispatch();
  const recentChats = useSelector(selectAllChats);
  const postStatus = useSelector(
    (state: RootState) => state.chats.recentChats.reqStatus.status
  );

  const friendList = useSelector(
    (state: RootState) => state.friends.friendList
  );
  useEffect(() => {
    if (postStatus === "idle") dispatch(fectchChats());
    dispatch(fetchFriendList({ id: "xxx" }));
  }, [dispatch, postStatus]);

  // TODO　初始化加载数据　异步
  // let friendList: IFriendListItem[] = [];

  // TODO
  // const recentChatData: any[] = ;

  const { width, height } = useWindowDimensions();
  console.log("SideBar: width %f  height: %f", width, height);

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
            dataSource={recentChats || []}
            renderItem={(item) => (
              <List.Item style={{ padding: "0" }}>
                <Link to={`/app/recent/${item.accountId}`}>
                  <RecentChatItem data={item} width={getListItemWidth(width)} />
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
            height: `${getListBoxHeight(height)}px`,
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={friendList || []}
            renderItem={(item) => (
              <List.Item style={{ padding: "0" }}>
                <Link to={`/app/friend/${item.accountId}`}>
                  <FriendItem data={item} />
                </Link>
              </List.Item>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="生态" key="3">
          <Link to="/app/activities">
            <List>
              <List.Item style={{ padding: "0" }}>
                <Link to={`/app/activities/}`}>朋友圈</Link>
              </List.Item>
              <List.Item style={{ padding: "0" }}>
                <Link to={`/app/snipaste`}>code board</Link>
              </List.Item>
              <List.Item style={{ padding: "0" }}>
                <Link to={`/app/snipaste`}>收藏</Link>
              </List.Item>
              <List.Item style={{ padding: "0" }}>
                <Link to={`/app/snipaste`}>hello</Link>
              </List.Item>
            </List>
          </Link>
        </Tabs.TabPane>
        <Tabs.TabPane tab="我的" key="4">
          我的
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
