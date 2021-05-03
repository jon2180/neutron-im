import React, { useState } from "react";

import Helmet from "@/components/Helmet";
import TabsCard from "./TabsCard";
import WideContentWrapper from "@/components/WideContentWrapper/WideContentWrapper";
import BasicAccountInfo from "./BasicAccountInfo";
import type { UserInfo } from "@/types/state";
import { Col, Row } from "antd";

export default function AccountProfile() {
  const [friendInfo] = useState({} as UserInfo);

  return (
    <>
      <Helmet>
        <title>{`用户信息-${friendInfo.nickname}`}</title>
      </Helmet>
      <WideContentWrapper>
        <Row gutter={[16, 16]}>
          <Col span={24} md={10} lg={7}>
            <BasicAccountInfo />
          </Col>
          <Col span={24} md={14} lg={17}>
            <TabsCard />
          </Col>
        </Row>
      </WideContentWrapper>
    </>
  );
}
