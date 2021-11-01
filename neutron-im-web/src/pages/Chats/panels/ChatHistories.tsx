import React, { useCallback, useEffect, useRef } from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useWindowDimensions from '@/utils/hooks';
import {
  fetchChatHistory,
  selectChatHistoryById,
} from '@/store/chatsHistoriesSlice';

import { formatTimestamp } from '@/utils/format';

import { selectUserInfo } from '@/store/userInfoSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/store';
import { selectRecentChatById } from '@/store/recentChatsSlice';
import { ReloadOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';

import styles from './ChatHistories.module.less';
import type { MessageData } from '@/types/http';
import {
  ChatAudioItem,
  ChatCodesnipsItem,
  ChatFavoriteItem,
  ChatImageItem,
  ChatTextItem,
  ChatVideoItem,
} from './ChatItems';
import { ChatMessageType } from '@/websocket/conf';
import type { NimSafeAny } from '@/types';

/**
 * 把 消息数据 转成 jsx
 * @param data 消息主体
 */
const contentTypeMap: Record<NimSafeAny, ChatMessageType> = {
  0: ChatMessageType.TEXT,
  1: ChatMessageType.IMAGE,
  2: ChatMessageType.AUDIO,
  3: ChatMessageType.VIDEO,
  4: ChatMessageType.CODESNIPS,
  5: ChatMessageType.FAVORITE,
};

function MessageContent({
  myid,
  data,
}: {
  myid: number | string;
  data: MessageData;
}) {
  let val;
  if (Number.isInteger(data.content_type)) {
    val = contentTypeMap[data.content_type];
  } else {
    val = data.content_type;
  }

  switch (val) {
    case ChatMessageType.TEXT:
      return (
        <ChatTextItem self={data.sender_id === myid} content={data.content} />
      );
    case ChatMessageType.IMAGE:
      return <ChatImageItem src={data.content} />;
    case ChatMessageType.AUDIO:
      return <ChatAudioItem src={data.content} />;
    case ChatMessageType.VIDEO:
      return <ChatVideoItem src={data.content} />;
    case ChatMessageType.CODESNIPS:
      return <ChatCodesnipsItem />;
    case ChatMessageType.FAVORITE:
      return <ChatFavoriteItem />;
    default:
      return <span />;
  }
}

// const MS_IN_DAY = 1e3 * 3600 * 24;
export interface ChatRouteParams {
  id: string;
  type: 'group' | 'single';
}
/**
 * 消息列表框
 */
export default function ChatHistories() {
  const intl = useIntl();
  const userInfo = useSelector(selectUserInfo);
  const { height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const params = useParams<ChatRouteParams>();

  /// 从 store 中获取数据
  const chatHistory = useSelector(selectChatHistoryById(params.id));
  const currentChat = useSelector(selectRecentChatById(params.id));
  const messagesBox = useRef<HTMLDivElement>(null);

  const scrollToBottom = (delay = 300) => {
    setTimeout(() => {
      if (messagesBox && messagesBox.current) {
        messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
      }
    }, delay);
  };

  // 如果 store 中没有，则向服务器端请求
  const handleGetHistory = useCallback(
    async (params: { id: string; type: string }) => {
      const resultAction = await dispatch(
        fetchChatHistory({ chatId: params.id, type: params.type }),
      );

      if (fetchChatHistory.fulfilled.match(resultAction)) {
        const res = unwrapResult(resultAction);
        console.log(res);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!chatHistory) {
      handleGetHistory({ id: params.id, type: 'single' });
      scrollToBottom();
    }
  }, [handleGetHistory, chatHistory, params]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const renderMessage = (item: MessageData, index: number) => {
    let shouldShowTime = true;
    // 时间差小于 150s 不显示
    if (index > 0 && item.time - chatHistory[index - 1].time < 150 * 1000) {
      shouldShowTime = false;
    }

    return (
      <>
        {shouldShowTime ? (
          <List.Item style={{ padding: '0' }}>
            <div
              className={styles.time}
            >
              {typeof item.time === 'number'
                ? formatTimestamp(item.time)
                : item.time}
            </div>
          </List.Item>
        ) : (
          <span />
        )}

        <List.Item style={{ padding: '0' }}>
          <div className={styles.message}>
            <div className={styles.avatar}>
              {userInfo.id === item.sender_id ? (
                <Avatar src={userInfo.avatar}></Avatar>
              ) : (
                <Avatar src={currentChat?.account_avatar}></Avatar>
              )}
            </div>
            <div className={styles.messageContent}>
              <MessageContent myid={userInfo.id} data={item} />
            </div>
          </div>
        </List.Item>
      </>
    );
  };

  return (
    <div
      className={styles.messageBox}
      ref={messagesBox}
      style={{ height: `${height - 200}px` }}
    >
      <div className={styles.loadMore}>
        <Spin spinning={true} size="small" />
        <Button
          type="text"
          shape="circle"
          onClick={(e) => {
            console.log(e);
          }}
          icon={<ReloadOutlined />}
          title={intl.formatMessage({
            id: 'loadmore',
            defaultMessage: 'Load more',
          })}
        ></Button>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={chatHistory || []}
        split={false}
        renderItem={renderMessage}
      />
    </div>
  );
}
