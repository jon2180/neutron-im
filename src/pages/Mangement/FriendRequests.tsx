import React, { useCallback, useMemo, useState } from "react";
import { searchAccount } from "@/services/friend";
import { Input, List } from "antd";

import styles from "./FriendRequests.module.less";

export default function FriendsRequest() {
  return (
    <div>
      <List>
        <List.Item>
          <div></div>
        </List.Item>
      </List>
    </div>
  );
}
