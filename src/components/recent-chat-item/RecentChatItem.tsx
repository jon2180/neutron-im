import React from "react";
import { Avatar } from "antd";
import useWindowDimensions from "@/utils/useWindowDimensions";

import styles from "./RecentChatItem.module.css";
import { IRecentItem } from "@/types";

export interface IRecentChatItemProps {
  data: IRecentItem;
}

export default function RecentChatItem(props: IRecentChatItemProps) {
  const { data } = props;

  const { width } = useWindowDimensions();

  return (
    <div className={styles.itemBox}>
      <div className={styles.avatarBox}>
        <Avatar size={48} src={data.avatar} />
      </div>

      <div
        className={styles.infoBox}
        style={{
          width: `${Math.floor(width / 3) - 80}px`,
        }}
      >
        <div className={styles.nameAndTimeBox}>
          <div className={styles.name}>{data.accountName}</div>
          <div className={styles.time}>{data.time}</div>
        </div>
        <div className={styles.contentAndUnreadBox}>
          <div className={styles.content}>{data.lastMsg}</div>
          <div className={styles.unread}>
            {data.unread > 0 ? data.unread : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
