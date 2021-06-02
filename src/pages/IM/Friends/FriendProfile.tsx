// import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { useParams } from "react-router-dom";
import styles from "./FriendProfile.module.less";

import { Card, Skeleton } from "antd";
// import { getAccountInfo } from "@/services/user";
import BasicAccountInfo from "@/pages/Account/Profile/BasicAccountInfo";

// type UserInfo = {
//   avatar: string;
//   birthday: string;
//   email: string;
//   id: number;
//   nickname: string;
//   reg_time: string;
//   signature: string;
//   status: number;
//   tel: string;
//   uid: string;
// };
export default function FriendProfile() {
  const params =
    useParams<{
      id: string;
    }>();
  // console.log(params);
  // const [friendInfo, setFriendInfo] = useState({} as UserInfo);

  // useMemo(() => {
  //   getAccountInfo({ uid: params.id }).then((res) => {
  //     console.log(res);

  //     if (res && res.status === 20000 && res.data) {
  //       setFriendInfo(res.data as UserInfo);
  //     }
  //     // if (res.status === 20000) {
  //     // console.log(res);
  //     // setFriendInfo(res.data as UserInfo)
  //     // }
  //   });
  // }, [params]);

  return (
    <div>
      <Skeleton active loading={false}>
        <Card
          style={{ margin: "16px" }}
          // cover={
          //   <img
          //     alt="example"
          //     // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          //     src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif/440px-Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif"
          //   />
          // }
          // actions={[
          //   <Button onClick={(e) => {}}>聊天</Button>,
          //   <Link to={`/im/chats/${params.id}`}>详情</Link>,
          // ]}
          className={[styles.profileCard].join(" ")}
        >
          <BasicAccountInfo id={params.id} />
        </Card>
      </Skeleton>
    </div>
  );
}
