import React, { useRef, useState } from "react";
import {
  message,
  Avatar,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/userInfoSlice";

import type { UploadChangeParam } from "antd/lib/upload";
import type { UploadFile } from "antd/lib/upload/interface";
import type { FormInstance } from "antd";

import styles from "./BasicSettings.module.less";
import AvatarUpload from "./AvatarUpload";

export default function BasicSettings() {
  const userInfo = useSelector(selectUserInfo);
  const [avatar, setAvatar] = useState(userInfo.avatar);
  const [email, setEmail] = useState(userInfo.email);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [gender, setGender] = useState("secret");
  const [signature, setSignature] = useState(userInfo.signature || "");
  // const [birthday, setBirthday] = useState<moment.Moment>();
  const formRef = useRef<FormInstance<any>>(null);

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    formRef.current!.resetFields();
  };

  const onChange = (info: UploadChangeParam<UploadFile<any>>): void => {
    const loadingKey = "LOADING_KEY";
    switch (info.file.status) {
      case "uploading":
        console.log(info);
        message.loading({ key: loadingKey, content: "Picture Uploading..." });
        break;
      case "done":
      case "success":
        message.destroy(loadingKey);
        const { response } = info.file;
        if (response) {
          if (response.status === 20000 && response.data.url) {
            setAvatar(response.data.url);
            message.success("Picture Upload Successfully");
          } else {
            message.error("Picture Upload Failed");
          }
        }
        break;
      case "error":
      case "removed":
      default:
        message.destroy(loadingKey);
        console.log(info);
        message.error("Picture Upload Failed");
    }
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
          <DatePicker
            onChange={(e) => {
              // setBirthday(Date.now())
              console.log(e);
            }}
          />
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
        <AvatarUpload onChange={onChange}>
          <Button icon={<UploadOutlined />} className={styles.uploadBtn}>
            Change Avatar
          </Button>
        </AvatarUpload>
      </div>
    </div>
  );
}
