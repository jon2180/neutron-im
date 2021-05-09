import React, { useMemo, useState } from "react";
import { Card, Skeleton, Button, message } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  GithubOutlined,
  QqOutlined,
  WeiboOutlined,
  ZhihuOutlined,
} from "@ant-design/icons";

import { user } from "@/services";

import { selectUserInfo } from "@/store/userInfoSlice";

import type { UserInfo } from "@/types/state";
import styles from "./BasicAccountInfo.module.less";

export default function BasicAccountInfo({ id }: { id: string }) {
  const userInfo = useSelector(selectUserInfo);
  const [friendInfo, setFriendInfo] = useState({} as UserInfo);

  const isMyself = userInfo.id === friendInfo.id;

  useMemo(() => {
    user
      .getAccountInfo({ uid: id })
      .then((res) => {
        console.log(res);

        if (!res || res.status !== 20000) {
          message.error({ content: `获取此用户信息失败, ${res.message}` });
          return;
        }

        if (!res.data) {
          message.error({ content: "服务器内部错误" });
          return;
        }

        setFriendInfo(res.data as UserInfo);
      })
      .catch((err) => {
        message.error({ content: `获取用户信息失败` });
        console.log(err);
      });
  }, [id]);

  return (
    <Skeleton active loading={false}>
      <Card className={styles.profileCard}>
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
            {friendInfo.nickname || "未知人物"}
          </div>
          <div className={styles.metaInfoMain_more}>
            {friendInfo.signature || "未知签名"}{" "}
          </div>
        </div>

        <div className={styles.metaInfoMain}>
          {/* <div className={styles.metaInfoMainContainer}></div> */}
          <div className={styles.metaInfoMain_email}>
            {friendInfo.email || "未知邮箱"}
          </div>
          <div>
            {friendInfo.birthday || "未知年龄"}
            {"未知性别"}
          </div>
          <div>{"未知位置"}</div>
          <div>{"未知职业"}</div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.metaInfoOption}>
          <div className={styles.metaInfoOption_social}>
            <Button type="default" shape="circle" icon={<GithubOutlined />} />
            <Button type="default" shape="circle" icon={<WeiboOutlined />} />
            <Button type="default" shape="circle" icon={<ZhihuOutlined />} />
            <Button type="default" shape="circle" icon={<QqOutlined />} />
          </div>
          <div>
            {isMyself ? <span /> : <a href="#2">删除好友</a>}
            {isMyself ? (
              <Link to={`/accounts/settings/profile`}>编辑资料</Link>
            ) : (
              <Link to={`/im/chats/${id}`}>聊天</Link>
            )}
          </div>
        </div>
      </Card>
    </Skeleton>
  );
}
