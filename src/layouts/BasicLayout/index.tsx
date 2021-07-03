import React from 'react';
import { Layout } from 'antd';
import BasicFooter from './BasicFooter';
import BasicHeader from './BasicHeader';

import styles from './index.module.less';

export default function BasicLayout({ children }: { children: JSX.Element }) {
  return (
    <Layout className={styles.layoutFrame}>
      <BasicHeader />
      <Layout.Content>{children}</Layout.Content>
      <BasicFooter></BasicFooter>
    </Layout>
  );
}
