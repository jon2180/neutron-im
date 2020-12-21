import React from "react";
import { Avatar } from "antd";

import styles from "./RecentChatItem.module.css";
import { RecentChatItemData } from "@/@types/types";

export interface RecentChatItemProps {
  data: RecentChatItemData;
  width: number;
}

export default function RecentChatItem(props: RecentChatItemProps) {
  const { data, width } = props;

  return (
    <div className={styles.itemBox}>
      <div className={styles.avatarBox}>
        <Avatar size={48} src={data.avatar} />
      </div>

      <div
        className={styles.infoBox}
        style={{
          width: `${width}px`,
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
