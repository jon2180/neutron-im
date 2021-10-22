import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

import type { Friend } from '@/types/http';

import styles from "./FrinedListItem.module.less";

interface FriendItemProps {
  data: Friend;
}

export function FriendListItem({ data }: FriendItemProps) {
  return (
    <Link
      to={`/friends/${data.account_id}`}
      className={styles.link}
    >
      <div
        className={styles.itemBox}
      >
        <div>
          <Avatar size={48} src={data.avatar}></Avatar>
        </div>
        <div
         className={styles.nickname}
        >
          {data.remark_name ? data.remark_name : data.nickname}
        </div>
      </div>
    </Link>
  );
}
