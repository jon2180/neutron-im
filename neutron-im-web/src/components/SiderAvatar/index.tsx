import React, { useEffect } from 'react';
import { Avatar, message } from 'antd';
import { useSelector } from 'react-redux';
import { connect } from '@/websocket';
import styles from './index.module.less';
import { useAppDispatch } from '@/store';
import { fetchUserInfo, selectUserInfo } from '@/store/userInfoSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useIntl } from 'react-intl';

export interface SiderAvatarProps {
  collapsed: boolean;
}

export default function SiderAvatar({
  collapsed,
}: SiderAvatarProps): JSX.Element {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    const func = async () => {
      const resultAction = await dispatch(fetchUserInfo());
      const userInfo = unwrapResult(resultAction);

      // 存在，说明请求成功
      if (userInfo) {
        message.info({ content: `获取用户信息成功 ${userInfo.nickname}` });
        return;
      }
      // 不存在，且是 undefined
      if (typeof userInfo === 'undefined') {
        message.warn({ content: '获取用户信息失败' });
        return;
      }
    };
    func().then();
  }, [dispatch]);

  return (
    <div className={styles.headerContainer}>
      <Avatar shape="square" size={48} src={userInfo.avatar} alt="avatar" />
      {!collapsed && (
        <div className={styles.nickname} title={userInfo.nickname}>
          {userInfo.nickname || 'hello world'}
        </div>
      )}
    </div>
  );
}
