import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./profile.module.less";

export default function FriendProfile() {
  const params = useParams<{
    id: string;
  }>();
  console.log(params);

  return (
    <div>
      <div className={styles.topArea}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif/440px-Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif"
          alt="profile background"
        />
      </div>
      <div className={styles.profileCard}>
        <div className={styles.profileBGContainer}></div>
        <div>
          <div className={styles.basicInfo}>
            <img
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="avatar"
              className={styles.avatar}
            />
            <div>Mick</div>
            <div>E-mail / Other</div>
          </div>
          <div className={styles.moreinfo}>
            <div>男</div>
            <div>18岁</div>
            <div>现居四川成都</div>
            <div>学生</div>
          </div>
          <div>Signature</div>
          好友详情页面
        </div>
      </div>
      <div>
        <button>聊天</button>
        <button>更多</button>
      </div>
    </div>
  );
}
