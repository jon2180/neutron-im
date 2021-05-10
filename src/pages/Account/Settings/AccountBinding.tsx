import React, { useRef, useState } from "react";
import { Form, Input, Button, Space } from "antd";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/userInfoSlice";

import type { FormInstance } from "antd";
import styles from "./BasicSettings.module.less";

export default function AccountBindings() {
  const userInfo = useSelector(selectUserInfo);
  const [email] = useState(userInfo.email);
  const [github, setGithub] = useState("");
  const [zhihu, setZhihu] = useState("");
  const [weibo, setWeibo] = useState(userInfo.signature || "");
  const [qq, setQQ] = useState("");
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
        size="middle"
        layout="vertical"
        className={styles.form}
        onReset={onReset}
        onFinish={onFinish}
        ref={formRef}
      >
        <Form.Item label={<>Email</>}>
          <Input value={email} disabled />
        </Form.Item>

        <Form.Item label="Github">
          <Input
            value={github}
            onChange={(e) => {
              setGithub(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item label="Weibo">
          <Input
            value={weibo}
            onChange={(e) => {
              setWeibo(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item label="Zhihu">
          <Input
            value={zhihu}
            onChange={(e) => {
              setZhihu(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item label="QQ">
          <Input
            value={qq}
            onChange={(e) => {
              setQQ(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item>
          <Space size={16}>
            <Button type="primary" htmlType="submit">
              Update Information
            </Button>
            <Button htmlType="button">Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
