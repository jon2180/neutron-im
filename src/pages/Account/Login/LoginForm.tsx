import React, { useRef, useState } from "react";

import { Form, Input, Button, Col, Row, FormInstance } from "antd";
import {
  CheckOutlined,
  LockOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";

import styles from "./Login.module.less";
import Captcha from "./Captcha";
import { FormattedMessage } from "react-intl";

export interface LoginParams {
  email: string;
  password: string;
  captcha: string;
}

export default function LoginForm(props: {
  onSubmit: (params: LoginParams) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<FormInstance<any>>(null);

  const submitForm = () => {
    setSubmitting(true);
    if (formRef && formRef.current) {
      const values = formRef.current.getFieldsValue();
      console.log(values);
      props.onSubmit(values);
    }
    setSubmitting(false);
  };

  return (
    <Form
      name="Login"
      initialValues={{ remember: true }}
      className={styles.loginForm}
      ref={formRef}
    >
      <Form.Item
        name="email"
        // rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        // rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
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
          icon={<LoginOutlined spin={submitting} />}
          block
        >
          <FormattedMessage id="app.login.submit" defaultMessage="Sign In" />
        </Button>
      </Form.Item>
    </Form>
  );
}
