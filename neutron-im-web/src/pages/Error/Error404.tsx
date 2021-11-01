import { Empty } from 'antd';
import React from 'react';

export default function Error404() {
  return (
    <div
      style={{
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Empty
        description={'404 NOT FOUNT 您要找的页面丢失了'}
        style={{
          margin: '0 auto',
        }}
      ></Empty>
    </div>
  );
}
