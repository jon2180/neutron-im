import React, { useCallback, useEffect, useState } from 'react';
import { Card, Skeleton, Button, message, Space, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';import {
  GithubOutlined,
  QqOutlined,
  WeiboOutlined,
  ZhihuOutlined,
} from '@ant-design/icons';
import { FormattedDate } from 'react-intl';


import { chatService, userService } from '@/services';

import { selectUserInfo } from '@/store/userInfoSlice';
import type { UserInfo } from '@/types/state';
import { createSemaphore } from '@/utils/wrapper';
import {
  pushChat,
  selectAllChats,
  selectChatByAccountId,
} from '@/store/recentChatsSlice';

import styles from './BasicAccountInfo.module.less';
import { useHistory, useLocation } from 'umi';
import { useAppDispatch } from '@/store';
import { Chat } from '@/types/http';

const loadingStatus = createSemaphore();

function useGetAccountInfo(accountId: string) {
  const [friendInfo, setFriendInfo] = useState({} as UserInfo);
  const [loading, setLoading] = useState(true);

  const fetchAccountInfo = useCallback(
    async function fetchAccountInfo() {
      if (loadingStatus.loading === 'idle') {
        setLoading(true);
        loadingStatus.loading = 'pending';
        const resp = await userService.getAccountInfo({ uid: accountId });
        loadingStatus.loading = 'idle';
        setLoading(false);
        if (
          resp.status !== 20000 ||
          !resp.data ||
          typeof resp.data !== 'object'
        ) {
          message.error({ content: `获取此用户信息失败, ${resp.message}` });
          return;
        }
        setFriendInfo(resp.data as UserInfo);
      }
    },
    [accountId],
  );

  useEffect(() => {
    fetchAccountInfo();
  }, [fetchAccountInfo]);

  return {
    loading,
    data: friendInfo,
  };
}

export default function BasicAccountInfo({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { loading, data: friend } = useGetAccountInfo(id);
  const userInfo = useSelector(selectUserInfo);
  const chat = useSelector(selectChatByAccountId(id, userInfo.id));
  const isMyself = userInfo.id === friend.id;

  const redirectToChats = () => {
    // 是否已经存在此chat信息
    if (!chat) {
      chatService
        .postChat({
          firstUid: userInfo.id,
          secondUid: id,
        })
        .then((postChatResp) => {
          if (
            postChatResp.status !== 20000 ||
            !postChatResp.data ||
            !postChatResp.data.id
          ) {
            message.error('参数状态错误');
            return;
          }
          const chat: Chat = postChatResp.data;
          dispatch(pushChat(chat));
          setTimeout(() => {
            history.push(`/chats/${chat.id}`);
          });
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    history.push(`/chats/${chat.id}`);
  };

  return (
    <Card className={styles.profileCard}>
      <Skeleton
        avatar={{ shape: 'circle', size: 104 }}
        active
        paragraph={{ rows: 3, width: '100%' }}
        loading={loading}
      >
        <div className={styles.metaInfoBox}>
          <img
            alt="avatar"
            className={styles.avatar}
            src={
              friend.avatar ||
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            }
          />
          <div className={styles.metaInfoMain_nickname}>
            {friend.nickname || ''}
          </div>
          <div className={styles.metaInfoMain_more}>
            {friend.signature || ''}
          </div>
        </div>

        <Space size="middle" className={styles.metaInfoMain}>
          <div className={styles.metaInfoMain_email}>{friend.email || ''}</div>
          <div>
            {friend.birthday && typeof friend.birthday === 'number' ? (
              <FormattedDate value={friend.birthday} />
            ) : (
              ''
            )}
          </div>
          {/* <div>{"未知位置"}</div>
          <div>{"未知职业"}</div> */}
        </Space>

        <Divider />

        <div className={styles.metaInfoOption}>
          <div className={styles.metaInfoOption_social}>
            <Button type="default" shape="circle" icon={<GithubOutlined />} />
            <Button type="default" shape="circle" icon={<WeiboOutlined />} />
            <Button type="default" shape="circle" icon={<ZhihuOutlined />} />
            <Button type="default" shape="circle" icon={<QqOutlined />} />
          </div>
          <div>
            <Space size={8}>
              {isMyself ? (
                <>
                  <span />
                  <Link to={`/accounts/settings/profile`}>编辑资料</Link>
                </>
              ) : (
                <>
                  <a href="#2">删除好友</a>
                  <Button type="text" onClick={redirectToChats}>
                    聊天
                  </Button>
                </>
              )}
            </Space>
          </div>
        </div>
      </Skeleton>
    </Card>
  );
}
