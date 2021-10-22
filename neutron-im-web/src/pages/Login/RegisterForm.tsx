import React, { useRef, useState } from "react";

import { Form, Input, Button, Col, Row, FormInstance } from "antd";
import {
  CheckOutlined,
  IdcardOutlined,
  LockOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";

import styles from "./Login.module.less";
import Captcha from "./Captcha";
import { FormattedMessage } from "react-intl";

export interface RegisterParams {
  email: string;
  password: string;
  nickname: string;
  captcha: string;
}

export default function RegisterForm(props: {
  onSubmit: (data: RegisterParams) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<FormInstance<any>>(null);

  const submitForm = () => {
    setSubmitting(true);
    if (formRef && formRef.current)
      props.onSubmit(formRef.current.getFieldsValue());
    setSubmitting(false);
  };

  return (
    <Form
      name="Register"
      initialValues={{ remember: true }}
      className={styles.loginForm}
      ref={formRef}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="E-Mail" />
      </Form.Item>

      <Form.Item
        name="nickname"
        rules={[{ required: true, message: "Please input your nickname!" }]}
      >
        <Input prefix={<IdcardOutlined />} placeholder="Nickname" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Your password" />
      </Form.Item>

      <Form.Item name="captcha">
        <Row gutter={4} align="middle">
          <Col span={16}>
            <Input prefix={<CheckOutlined />} placeholder="Captcha" />
          </Col>
          <Col span={8}>
            <Captcha />
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={submitForm}
          loading={submitting}
          icon={<LoginOutlined />}
          block
        >
          <FormattedMessage id="app.register.submit" defaultMessage="Sign On" />
        </Button>
      </Form.Item>
    </Form>
  );
}
