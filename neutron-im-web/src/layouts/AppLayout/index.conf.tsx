import React from 'react';
import {
  TeamOutlined,
  UserOutlined,
  MessageOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';

export const ROUTES_CONFIG = [
  {
    icon: <MessageOutlined />,
    to: '/chats',
    text: '最近',
  },
  {
    icon: <UserOutlined />,
    to: '/friends',
    text: '好友',
  },
  {
    icon: <TeamOutlined />,
    to: '/groups',
    text: '群组',
  },
  {
    icon: <PaperClipOutlined />,
    to: '/colllections',
    text: '收集',
  },
];
