import React, { useState } from "react";

import Helmet from "@/components/Helmet";
import TabsCard from "./TabsCard";
import WideContentWrapper from "@/components/WideContentWrapper/WideContentWrapper";
import BasicAccountInfo from "./BasicAccountInfo";
import type { UserInfo } from "@/types/state";
import { Col, Row } from "antd";
import { withRouter } from "react-router";
import { useIntl } from "react-intl";

export default withRouter(function AccountProfile({ match }) {
  const intl = useIntl();
  const [friendInfo] = useState({} as UserInfo);

  const title = `${intl.formatMessage({
    defaultMessage: "User Information",
    id: "userinfo",
  })} ${friendInfo.nickname ? `- ${friendInfo.nickname}` : ""}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <WideContentWrapper>
        <Row gutter={[16, 16]}>
          <Col span={24} md={10} lg={7}>
            <BasicAccountInfo id={match.params.id || ""} />
          </Col>
          <Col span={24} md={14} lg={17}>
            <TabsCard id={match.params.id || ""} />
          </Col>
        </Row>
      </WideContentWrapper>
    </>
  );
});
