import React, { useCallback, useEffect, useState } from "react";
import { Card, Skeleton, Button, message, Space, Divider } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormattedDate } from "react-intl";
import {
  GithubOutlined,
  QqOutlined,
  WeiboOutlined,
  ZhihuOutlined,
} from "@ant-design/icons";

import { chatService, userService } from "@/services";

import { selectUserInfo } from "@/store/userInfoSlice";
import type { UserInfo } from "@/types/state";
import { createSemaphore } from "@/utils/wrapper";
import { selectAllChats } from "@/store/recentChatsSlice";

import styles from "./BasicAccountInfo.module.less";

const loadingStatus = createSemaphore();

export default function BasicAccountInfo({ id }: { id: string }) {
  const userInfo = useSelector(selectUserInfo);
  const chats = useSelector(selectAllChats);
  const [friendInfo, setFriendInfo] = useState({} as UserInfo);
  const [loading, setLoading] = useState(true);
  const isMyself = userInfo.id === friendInfo.id;
  // const dispatch = useAppDispatch();

  const fetchAccountInfo = useCallback(
    async function fetchAccountInfo() {
      if (loadingStatus.loading === "idle") {
        setLoading(true);
        loadingStatus.loading = "pending";
        const resp = await userService.getAccountInfo({ uid: id });
        loadingStatus.loading = "idle";
        setLoading(false);
        if (
          resp.status !== 20000 ||
          !resp.data ||
          typeof resp.data !== "object"
        ) {
          message.error({ content: `获取此用户信息失败, ${resp.message}` });
          return;
        }
        setFriendInfo(resp.data as UserInfo);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchAccountInfo();
  }, [fetchAccountInfo]);

  return (
    <Card className={styles.profileCard}>
      <Skeleton
        avatar={{ shape: "circle", size: 104 }}
        active
        paragraph={{ rows: 3, width: "100%" }}
        loading={loading}
      >
        <div className={styles.metaInfoBox}>
          <img
            alt="avatar"
            className={styles.avatar}
            src={
              friendInfo.avatar ||
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            }
          />
          <div className={styles.metaInfoMain_nickname}>
            {friendInfo.nickname || ""}
          </div>
          <div className={styles.metaInfoMain_more}>
            {friendInfo.signature || ""}
          </div>
        </div>

        <Space size="middle" className={styles.metaInfoMain}>
          <div className={styles.metaInfoMain_email}>
            {friendInfo.email || ""}
          </div>
          <div>
            {friendInfo.birthday && typeof friendInfo.birthday === "number" ? (
              <FormattedDate value={friendInfo.birthday} />
            ) : (
              ""
            )}
          </div>
          {/* <div>{"未知位置"}</div>
          <div>{"未知职业"}</div> */}
        </Space>

        <Divider />

        <div className={styles.metaInfoOption}>
          <div className={styles.metaInfoOption_social}>
            <Button type="default" shape="circle" icon={<GithubOutlined />} />
            <Button type="default" shape="circle" icon={<WeiboOutlined />} />
            <Button type="default" shape="circle" icon={<ZhihuOutlined />} />
            <Button type="default" shape="circle" icon={<QqOutlined />} />
          </div>
          <div>
            <Space size={8}>
              {isMyself ? <span /> : <a href="#2">删除好友</a>}
              {isMyself ? (
                <Link to={`/accounts/settings/profile`}>编辑资料</Link>
              ) : (
                <Button
                  type="text"
                  onClick={async (e) => {
                    // 是否已经存在此chat信息
                    const chat = chats.find((chat) => {
                      return (
                        (chat.sender_id === id &&
                          chat.receiver_id === userInfo.id) ||
                        (chat.sender_id === userInfo.id &&
                          chat.receiver_id === id)
                      );
                    });

                    if (chat) {
                      setTimeout(() => {
                        document.location.pathname = `/im/chats/${chat.id}`;
                      }, 300);
                      return;
                    }

                    const postChatResp = await chatService.postChat({
                      firstUid: userInfo.id,
                      secondUid: id,
                    });

                    if (postChatResp.status !== 20000 || !postChatResp.data) {
                      message.error("参数状态错误");
                      return;
                    }

                    // const getChatResp = await chatService.getChat({
                    //   id: (postChatResp.data as { chat_id: string }).chat_id,
                    // });

                    // if (getChatResp.status !== 20000 || !getChatResp.data) {
                    //   message.error("获取聊天信息失败");
                    //   return;
                    // }
                    // const chatData = getChatResp.data as ChatData;
                    // dispatch(pushChat(chatData));
                    // setTimeout(() => {
                    //   document.location.pathname = `/im/chats/${chatData.id}`;
                    // }, 300);
                  }}
                >
                  聊天
                </Button>
              )}
            </Space>
          </div>
        </div>
      </Skeleton>
    </Card>
  );
}
