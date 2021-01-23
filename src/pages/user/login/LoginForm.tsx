import React, { useState } from "react";

import { Form, Input, Button, Col, Row } from "antd";
import { CheckOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

import styles from "./Login.module.less";

export default function LoginForm(props: {
  onSubmit: (email: string, password: string, captcha: string) => void;
}) {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitForm = () => { 
    setSubmitting(true);
    props.onSubmit(email, password, captcha);
    setSubmitting(false);
  }
  
  return (
    <Form name="login" initialValues={{ remember: true }}>
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
            setUsername(e.target.value);
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
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item name="captcha" valuePropName="captcha">
        <Row gutter={4}>
          <Col span={12}>
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
          <Col span={11}>
            <img src="" alt="captcha" />
          </Col>
        </Row>
      </Form.Item>
      <Form.Item>
        <Button
          // icon={<LoginOutlined />}
          type="primary"
          htmlType="submit"
          onClick={submitForm}
          loading={submitting}
          className={styles.loginFormButton}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
