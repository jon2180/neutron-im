import React from "react";
import { Switch } from "react-router-dom";
import { Row, Col } from "antd";

import PrivateRoute from "@/components/PrivateRoute";

export type CombinedPagePropsType = {
  sider?: JSX.Element;
  content: JSX.Element;
  detailPath: string;
  detailExact: boolean;
};

export default function CombinedPage({
  sider,
  content,
  detailExact,
  detailPath,
}: // ...props
CombinedPagePropsType) {
  if (!sider) {
    return (
      <Row>
        <Col
          span={24}
          style={{
            height: "100vh",
          }}
        >
          {content}
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      <Col
        xs={24}
        sm={12}
        md={9}
        lg={6}
        xl={6}
        style={{
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {sider}
      </Col>
      <Col
        xs={0}
        sm={12}
        md={15}
        lg={18}
        xl={18}
        style={{
          height: "100vh",
          backgroundColor: "#f5f5f5",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Switch>
          <PrivateRoute path={detailPath} exact={detailExact}>
            {content}
          </PrivateRoute>
        </Switch>
      </Col>
    </Row>
  );
}
