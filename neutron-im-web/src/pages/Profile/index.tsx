import React, { useState } from 'react';

import { Helmet } from 'react-helmet-async';
import ProfileCard from './ProfileCard';
import WideContentWrapper from '@/components/WideContentWrapper';
import BasicAccountInfo from './BasicAccountInfo';
import type { UserInfo } from '@/types/state';
import { Col, Row } from 'antd';
import { withRouter } from 'react-router';
import { useIntl } from 'react-intl';
import { useGetParams } from '@/utils/hooks';

export default withRouter(function AccountProfile({ match }) {
  const intl = useIntl();
  const [friendInfo] = useState({} as UserInfo);

  const params = useGetParams({ tab: 'article' });

  const title = `${intl.formatMessage({
    defaultMessage: 'User Information',
    id: 'userinfo',
  })} ${friendInfo.nickname ? `- ${friendInfo.nickname}` : ''}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <WideContentWrapper>
        <Row gutter={[16, 16]}>
          <Col span={24} md={10} lg={7}>
            <BasicAccountInfo id={match.params.id || ''} />
          </Col>
          <Col span={24} md={14} lg={17}>
            <ProfileCard id={match.params.id || ''} activeTabKey={params.tab} />
          </Col>
        </Row>
      </WideContentWrapper>
    </>
  );
});
