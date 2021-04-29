import React from "react";
import { List } from "antd";

import styles from "./FriendRequests.module.less";

export default function FriendsRequest() {
  return (
    <div className={styles.container}>
      <List>
        <List.Item>
          <div></div>
        </List.Item>
      </List>
    </div>
  );
}
