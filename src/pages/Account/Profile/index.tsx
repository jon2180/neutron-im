import React, { useMemo, useState } from "react";
import { Card, Avatar, Skeleton, Button, message } from "antd";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  GithubOutlined,
  QqOutlined,
  WeiboOutlined,
  ZhihuOutlined,
} from "@ant-design/icons";

import { user } from "@/services";
import Helmet from "@/components/Helmet";
import TabsCard from "./TabsCard";
import { selectUserInfo } from "@/store/userInfoSlice";
import WideContentWrapper from "@/components/WideContentWrapper/WideContentWrapper";

import type { UserInfo } from "@/types/state";
import styles from "./index.module.less";

function BasicAccountInfo() {
  const params = useParams<{
    id: string;
  }>();

  const userInfo = useSelector(selectUserInfo);
  const [friendInfo, setFriendInfo] = useState({} as UserInfo);

  const isMyself = userInfo.id === friendInfo.id;

  useMemo(() => {
    user
      .getAccountInfo({ uid: params.id })
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
  }, [params]);

  return (
    <Skeleton active loading={false}>
      <Card className={styles.profileCard}>
        <div className={styles.metaInfoBox}>
          <Avatar
            alt="avatar"
            className={styles.avatar}
            size={96}
            src={
              friendInfo.avatar ||
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            }
          />
          <div className={styles.metaInfoMain}>
            <div className={styles.metaInfoMainContainer}>
              <div className={styles.metaInfoMain_nickname}>
                {friendInfo.nickname || "未知人物"}
              </div>
              <div className={styles.metaInfoMain_email}>
                {friendInfo.email || "未知邮箱"}
              </div>
              <div className={styles.metaInfoMain_more}>
                {friendInfo.signature || "未知签名"}{" "}
                {/* {friendInfo.birthday || "未知年龄"}
            {"未知位置"}
            {"未知性别"}
            {"未知职业"} */}
              </div>
            </div>
          </div>
          <div className={styles.metaInfoOption}>
            <div className={styles.metaInfoOption_social}>
              <Button type="default" shape="circle" icon={<GithubOutlined />} />
              <Button type="default" shape="circle" icon={<WeiboOutlined />} />
              <Button type="default" shape="circle" icon={<ZhihuOutlined />} />
              <Button type="default" shape="circle" icon={<QqOutlined />} />
            </div>
            {/* <Popover content={"f"}> */}
            {isMyself ? (
              <span />
            ) : (
              <a href="#2">已是好友 / 删除好友 或不显示</a>
            )}
            {/* </Popover> */}
            {isMyself ? (
              <Link to={`/accounts/settings/profile`}>编辑资料</Link>
            ) : (
              <Link to={`/im/chats/${params.id}`}>聊天</Link>
            )}
          </div>
        </div>
      </Card>
    </Skeleton>
  );
}

export default function AccountProfile() {
  const [friendInfo] = useState({} as UserInfo);

  return (
    <>
      <Helmet>
        <title>{`用户信息-${friendInfo.nickname}`}</title>
      </Helmet>
      <WideContentWrapper>
        <BasicAccountInfo />
        <TabsCard />
      </WideContentWrapper>
    </>
  );
}
