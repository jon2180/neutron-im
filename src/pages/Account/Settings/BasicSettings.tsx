import React, { useRef, useState } from "react";
import {
  message,
  Avatar,
  Radio,
  Upload,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Cookie } from "@/utils/cookie";
import { selectUserInfo } from "@/store/userInfoSlice";
import AppConstants from "@/config/url.const";

import type { UploadChangeParam } from "antd/lib/upload";
import type { UploadFile } from "antd/lib/upload/interface";
import type { FormInstance } from "antd";

import styles from "./BasicSettings.module.less";

const defaultUploadAvatarProps = {
  name: "file",
  action: AppConstants.AVATAR_UPLOAD_URL,
  headers: {
    Authorization: Cookie.getCookie("Authorization"),
  },
};

export default function BasicSettings() {
  const userInfo = useSelector(selectUserInfo);
  const [avatar, setAvatar] = useState(userInfo.avatar);
  const [email, setEmail] = useState(userInfo.email);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [gender, setGender] = useState("secret");
  const [signature, setSignature] = useState(userInfo.signature || "");
  const formRef = useRef<FormInstance<any>>(null);

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    formRef.current!.resetFields();
  };

  const uploadAvatarProps = {
    ...defaultUploadAvatarProps,
    onChange(info: UploadChangeParam<UploadFile<any>>): void {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setAvatar(info);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
          <Input
            value={email}
            disabled
            onChange={(ev) => {
              setEmail(ev.target.value);
            }}
          />
        </Form.Item>

        <Form.Item label="Nickname">
          <Input
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item label="Signature">
          <Input
            value={signature}
            onChange={(e) => {
              setSignature(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item label="Gender">
          <Select
            value={gender}
            onChange={(value) => {
              console.log(value);
              if (value) setGender(value.toString());
            }}
          >
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="secret">Secret</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Birthday">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Space size="middle">
            <Button type="primary" htmlType="submit">
              Update Information
            </Button>
            <Button htmlType="button">Cancel</Button>
          </Space>
        </Form.Item>
      </Form>

      <div className={styles.avatar}>
        <Avatar shape="circle" size={144} src={avatar} />
        <Upload {...uploadAvatarProps}>
          <Button icon={<UploadOutlined />} className={styles.uploadBtn}>
            Change Avatar
          </Button>
        </Upload>
      </div>
    </div>
  );
}
