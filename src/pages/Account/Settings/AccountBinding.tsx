/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  message,
  Radio,
  Upload,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { Cookie } from "@/utils/cookie";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/userInfoSlice";
import AppConstants from "@/config/url.const";
import WideContentWrapper from "@/components/WideContentWrapper/WideContentWrapper";

import type { FormInstance } from "antd";
import styles from "./BasicSettings.module.less";

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

// type SizeType = Parameters<typeof Form>[0]["size"];
// type RequiredMark = boolean | 'optional';

const props = {
  name: "file",
  action: AppConstants.AVATAR_UPLOAD_URL,
  headers: {
    Authorization: Cookie.getCookie("Authorization"),
  },
  onChange(info: UploadChangeParam<UploadFile<any>>): void {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function BasicSettings() {
  const userInfo = useSelector(selectUserInfo);
  // const [newUserInfo, setNewUserInfo] = useState<UserInfoSubstate>(userInfo);
  const [avatar, setAvatar] = useState(userInfo.avatar);
  const [email, setEmail] = useState(userInfo.email);
  const [nickname, setNickanem] = useState(userInfo.nickname);
  const [gender, setGender] = useState("");
  const [signature, setSignature] = useState(userInfo.signature || "");
  const formRef = useRef<FormInstance<any>>(null);
  // const [avatar, setAvatar] = useState("");
  // const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');

  // const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
  //   setRequiredMarkType(requiredMarkValue);
  // };

  // const [componentSize, setComponentSize] = useState<SizeType | "default">(
  //   "default"
  // );
  // const onFormLayoutChange = ({ size }: { size: SizeType }) => {
  //   setComponentSize(size);
  // };
  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    formRef.current!.resetFields();
  };

  const onFill = () => {
    // this.formRef.current!.setFieldsValue({
    //   note: "Hello world!",
    //   gender: "male",
    // });
  };

  return (
    <div className={styles.container}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        size="middle"
        layout="vertical"
        className={styles.form}
        // onFill
        onReset={onReset}
        onFinish={onFinish}
        ref={formRef}
      >
        <Form.Item label={<>Email</>}>
          <Input value={email} disabled />
        </Form.Item>

        <Form.Item label="Nickname">
          <Input
            value={nickname}
            onChange={(e) => {
              setNickanem(e.target.value);
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
          <Select>
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

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Update Information
          </Button>
          <Button htmlType="button">Cancel</Button>
        </Form.Item>
      </Form>

      <div className={styles.avatar}>
        <Avatar shape="circle" size={144} src={avatar} />
        <Upload {...props}>
          <Button icon={<UploadOutlined />} className={styles.uploadBtn}>
            Change Avatar
          </Button>
        </Upload>
      </div>
    </div>
  );
}
