import React, { useRef, useState } from 'react';

import type { FormInstance } from 'antd';
import { Form, Input, Button, Col, Row } from 'antd';
import {
  CheckOutlined,
  LockOutlined,
  LoginOutlined,
  UserOutlined,
} from '@ant-design/icons';

import styles from './Login.module.less';
import Captcha from './Captcha';
import { FormattedMessage } from 'react-intl';

export interface LoginParams {
  email: string;
  password: string;
  captcha: string;
}

export default function LoginForm(props: {
  onSubmit: (params: LoginParams) => void;
}): JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<FormInstance<LoginParams>>(null);

  const submitForm = () => {
    setSubmitting(true);
    if (formRef && formRef.current) {
      const values = formRef.current.getFieldsValue();
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
        rules={[
          {
            required: true,
            pattern:
              /^[A-Za-z0-9]+([.+-_][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,14}$/,
            message: 'Please input your email correctly!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            pattern: /^\w{6,16}$/,
            message: 'Please input your password correctly!',
          },
        ]}
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
        >
          &nbsp;
          <FormattedMessage id="app.login.submit" defaultMessage="Sign In" />
        </Button>
      </Form.Item>
    </Form>
  );
}
