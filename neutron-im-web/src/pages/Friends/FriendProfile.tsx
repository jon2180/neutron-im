import React from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import BasicAccountInfo from '@/pages/Profile/BasicAccountInfo';
import styles from './FriendProfile.module.less';

export default function FriendProfile() {
  const params = useParams<{
    id: string;
  }>();

  return (
    <div>
      <Skeleton active loading={false}>
        <div style={{ margin: '8px' }}>
          <BasicAccountInfo id={params.id} />
        </div>
      </Skeleton>
    </div>
  );
}
