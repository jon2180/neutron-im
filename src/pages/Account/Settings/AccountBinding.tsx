import React, { useRef } from "react";
import { Form, Input, Button, Space } from "antd";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/userInfoSlice";

import type { FormInstance } from "antd";
import styles from "./BasicSettings.module.less";

export default function AccountBindings() {
  const userInfo = useSelector(selectUserInfo);
  const formRef = useRef<FormInstance<any>>(null);

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    formRef.current!.resetFields();
  };

  return (
    <div className={styles.container}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={{
          email: userInfo.email,
        }}
        size="middle"
        layout="vertical"
        className={styles.form}
        onReset={onReset}
        ref={formRef}
      >
        <Form.Item label={<>Email</>} name="email">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Github" name="github">
          <Input />
        </Form.Item>

        <Form.Item label="Weibo" name="weibo">
          <Input />
        </Form.Item>

        <Form.Item label="Zhihu" name="zhihu">
          <Input />
        </Form.Item>

        <Form.Item label="QQ" name="qq">
          <Input />
        </Form.Item>

        <Form.Item>
          <Space size={16}>
            <Button
              type="primary"
              htmlType="submit"
              disabled
              onClick={onFinish}
            >
              Update Information
            </Button>
            <Button htmlType="reset">Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
