import React from 'react';

import { Row, Col } from 'antd';
import styles from './index.module.less';

const autoFitProps = {
  left: {
    xs: 24,
    sm: 11,
    md: 11,
    lg: 8,
    xl: 8,
  },
  right: {
    xs: 24,
    sm: 13,
    md: 13,
    lg: 16,
    xl: 16,
  },
};

export interface TwoColLayoutProps {
  leftSider: JSX.Element;
  children: JSX.Element;
}

/**
 * 两列布局
 * @param leftSider 左侧
 * @param children 内容
 * @returns
 */
export default function TwoColLayout({
  leftSider,
  children,
}: TwoColLayoutProps) {
  return (
    <Row className={styles.imWrapper}>
      <Col {...autoFitProps.left} className={styles.leftCol}>
        {leftSider}
      </Col>
      <Col {...autoFitProps.right} className={styles.rightCol}>
        {children}
      </Col>
    </Row>
  );
}
