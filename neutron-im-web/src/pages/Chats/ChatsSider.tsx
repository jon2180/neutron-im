import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar, List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRecentChats, selectAllChats } from '@/store/recentChatsSlice';
import { formatTimestamp } from '@/utils/format';
import styles from './Chats.module.less';

import type { Chat } from '@/types/http';

import {
  Item,
  Menu,
  Separator,
  Submenu,
  useContextMenu,
} from 'react-contexify';

import 'react-contexify/dist/ReactContexify.css';
import { SearchHeader } from '@/components/Search';

const MENU_ID = 'menu-id';

export function ChatItem(props: { data: Chat }): JSX.Element {
  const { data } = props;

  // 🔥 you can use this hook from everywhere. All you need is the menu id
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  return (
    <Link
      to={encodeURI(`/chats/${data.id}`)}
      style={{
        display: 'block',
        width: '100%',
      }}
      onContextMenu={show}
    >
      <div className={styles.itemBox}>
        <div className={styles.avatarBox}>
          <Avatar size={48} src={data.account_avatar} />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.nameAndTimeBox}>
            <div className={styles.name}>{data.account_nickname}</div>
            <div className={styles.time}>
              {formatTimestamp(data.last_msg_time)}
            </div>
          </div>
          <div className={styles.contentAndUnreadBox}>
            <div className={styles.content}>{data.last_msg_content}</div>
            {data.unread_count === 0 ? (
              <div></div>
            ) : (
              <div className={styles.unread}>
                {Math.min(data.unread_count, 99)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function handleItemClick({ event, props, triggerEvent, data }: any) {
  console.log(event, props, triggerEvent, data);
}

const CONTEXT_MENU = (
  <Menu id={MENU_ID}>
    <Item onClick={handleItemClick}>Item 1</Item>
    <Item onClick={handleItemClick}>Item 2</Item>
    <Separator />
    <Item disabled>Disabled</Item>
    <Separator />
    <Submenu label="Submenu">
      <Item onClick={handleItemClick}>Sub Item 1</Item>
      <Item onClick={handleItemClick}>Sub Item 2</Item>
    </Submenu>
  </Menu>
);

function Chats() {
  const dispatch = useDispatch();
  // TODO
  const recentChats = useSelector(selectAllChats);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchRecentChats());
  }, [dispatch]);

  return (
    <div className={styles.chatsBox}>
      <List
        itemLayout="horizontal"
        size="small"
        dataSource={recentChats.filter((val) => !!val.last_msg_time)}
        renderItem={(item) => (
          <List.Item
            className={styles.listItem}
            style={{
              backgroundColor:
                params.id && params.id === item.id ? '#f2f2f2' : '#f7f7f7',
            }}
          >
            <ChatItem data={item} />
          </List.Item>
        )}
      />
    </div>
  );
}

/**
 * 聊天界面中的侧边栏
 */
export default function ChatsSider() {
  return (
    <div className={styles.listBox}>
      <SearchHeader />
      <Chats />
    </div>
  );
}
