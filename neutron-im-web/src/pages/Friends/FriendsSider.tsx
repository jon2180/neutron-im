import React, { useEffect } from 'react';
import { List } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendList, selectFriendList } from '@/store/friendsSlice';
import { SearchHeader } from '@/components/Search';
import Requests from '@/components/Requests/Requests';
import { FriendListItem } from './components/FriendListItem';
import styles from './FriendsSider.module.less';
import { useState } from 'react';

export function Friends() {
  const dispatch = useDispatch();
  const friendList = useSelector(selectFriendList);

  useEffect(() => {
    dispatch(fetchFriendList());
  }, [dispatch]);

  return (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={friendList}
      renderItem={(item) =>
        item.account_id && (
          <List.Item
            style={{
              padding: '0px',
            }}
          >
            <FriendListItem data={item} />
          </List.Item>
        )
      }
    />
  );
}

export default function FriendsSider() {
  const [left, setLeft] = useState('0px');

  return (
    <div className={styles.siderBox}>
      <SearchHeader />
      <div className={styles.twoCol}>
        <div
          className={styles.innerContainer}
          style={{
            left: left,
          }}
        >
          <div className={styles.col}>
            <div
              onClick={() => {
                setLeft(left === '-100%' ? '0' : '-100%');
              }}
              className={styles.slideController}
            >
              新朋友
            </div>
            <Friends />
          </div>
          <div className={styles.col}>
            <div
              className={[styles.slideController, styles.backController].join(
                ' ',
              )}
              onClick={() => {
                setLeft(left === '-100%' ? '0' : '-100%');
              }}
            >
              返回首页
            </div>
            <Requests type={0} status="f" />
          </div>
        </div>
      </div>
    </div>
  );
}
