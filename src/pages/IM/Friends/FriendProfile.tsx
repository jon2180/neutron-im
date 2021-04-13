// import Avatar from "antd/lib/avatar/avatar";
import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./FriendProfile.module.less";

import { Card, Descriptions, Avatar, Skeleton, Popover } from "antd";
import { getAccountInfo } from "@/services/user";

const { Meta } = Card;

type UserInfo = {
  avatar: string;
  birthday: string;
  email: string;
  id: number;
  nickname: string;
  reg_time: string;
  signature: string;
  status: number;
  tel: string;
  uid: string;
};
export default function FriendProfile() {
  const params = useParams<{
    id: string;
  }>();
  console.log(params);

  const [friendInfo, setFriendInfo] = useState({} as UserInfo);

  useMemo(() => {
    getAccountInfo({ uid: params.id }).then((res) => {
      console.log(res);

      if (res && res.status === 20000 && res.data) {
        setFriendInfo(res.data as UserInfo);
      }
      // if (res.status === 20000) {
      // console.log(res);
      // setFriendInfo(res.data as UserInfo)
      // }
    });
  }, [params]);

  return (
    <div>
      <Skeleton active loading={false}>
        <Card
          style={{ margin: "16px" }}
          cover={
            <img
              alt="example"
              // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif/440px-Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif"
            />
          }
          actions={[
            <Link to={`/im/chats/${params.id}`}>聊天</Link>,
            <Popover content={"f"}>
              <a href="#1">...</a>
            </Popover>,
          ]}
          className={styles.profileCard}
        >
          <>
            <Meta
              avatar={
                <Avatar
                  alt="avatar"
                  className={styles.avatar}
                  src={
                    friendInfo.avatar ||
                    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  }
                />
              }
              title={friendInfo.nickname}
              description={friendInfo.email}
            />
            <div className={styles.moreinfo}>
              <div>
                <Descriptions
                  column={{ xxl: 3, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
                >
                  <Descriptions.Item label="Gender">
                    {friendInfo.nickname || "未设置"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Age">
                    {friendInfo.birthday || "未设置"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Location">
                    {"四川成都"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Occupation">学生</Descriptions.Item>
                  <Descriptions.Item label="Activities">56</Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </>
        </Card>
      </Skeleton>
    </div>
  );
}
