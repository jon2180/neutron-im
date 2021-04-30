import React, { useState } from "react";

import { Form, Input, Button, Col, Row } from "antd";
import {
  CheckOutlined,
  IdcardOutlined,
  LockOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";

import styles from "./Login.module.less";
import Captcha from "./Captcha";

export interface RegisterParams {
  email: string;
  password: string;
  nickname: string;
  captcha: string;
}

export default function RegisterForm(props: {
  onSubmit: (data: RegisterParams) => void;
}) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const submitForm = () => {
    setSubmitting(true);
    props.onSubmit({ email, password, nickname, captcha });
    setSubmitting(false);
  };

  return (
    <Form
      name="Register"
      initialValues={{ remember: true }}
      className={styles.loginForm}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input
          prefix={<UserOutlined />}
          value={email}
          placeholder="E-Mail"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item
        name="nickname"
        rules={[{ required: true, message: "Please input your nickname!" }]}
      >
        <Input
          prefix={<IdcardOutlined />}
          value={nickname}
          name="password"
          placeholder="Nickname"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          value={password}
          name="password"
          placeholder="Your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item name="captcha" valuePropName="captcha">
        <Row gutter={4} align="middle">
          <Col span={16}>
            <Input
              prefix={<CheckOutlined />}
              value={captcha}
              name="captcha"
              placeholder="Captcha"
              onChange={(e) => {
                setCaptcha(e.target.value);
              }}
            />
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
