import React, { useCallback, useEffect, useState } from "react";
import { Card, Skeleton, Button, message, Space, Divider } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  GithubOutlined,
  QqOutlined,
  WeiboOutlined,
  ZhihuOutlined,
} from "@ant-design/icons";

import { userService } from "@/services";

import { selectUserInfo } from "@/store/userInfoSlice";

import type { UserInfo } from "@/types/state";
import styles from "./BasicAccountInfo.module.less";
import { createSemaphore } from "@/utils/wrapper";
import { FormattedDate } from "react-intl";

const loadingStatus = createSemaphore();

export default function BasicAccountInfo({ id }: { id: string }) {
  const userInfo = useSelector(selectUserInfo);
  const [friendInfo, setFriendInfo] = useState({} as UserInfo);
  const [loading, setLoading] = useState(true);
  const isMyself = userInfo.id === friendInfo.id;

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
                <Link to={`/im/chats/${id}`}>聊天</Link>
              )}
            </Space>
          </div>
        </div>
      </Skeleton>
    </Card>
  );
}
