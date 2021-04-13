import { UserOutlined } from "@ant-design/icons";
import {
  // Button,
  Card,
  message,
  // DatePicker,
  // Input,
  // Switch,
  // TimePicker,
  Upload,
} from "antd";
// import React from "react";

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import styles from "./ProfileSetting.module.less";
import Avatar from "antd/lib/avatar/avatar";
import { Cookie } from "@/utils/cookie";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/userInfoSlice";
import { UserInfoSubstate } from "@/types/state";

export function ProfileSetting() {
  return (
    <div>
      <Card title="用户信息设置" className={styles.settingCard}>
        <ul className={styles.inputList}>
          <li>
            <Input type="file" name="avatar" />
            <Upload />
          </li>

          <li>
            <Input
              type="text"
              name="nickname"
              size="large"
              prefix={<UserOutlined />}
              suffix={
                <>
                  <Button type="link" danger>
                    取消
                  </Button>
                  <Button type="link">确定</Button>
                </>
              }
            />
          </li>

          <li>
            <Input type="text" name="occupation" />
          </li>

          <li>
            <Input type="text" name="company" />
          </li>

          <li>
            <Input type="text" />
            <Switch></Switch>
          </li>

          <li>
            <Input type="text" />
            {/* <TimePicker /> */}
            <DatePicker />
          </li>

          <li>
            <Input type="text" />
          </li>
        </ul>
      </Card>
    </div>
  );
}

type SizeType = Parameters<typeof Form>[0]["size"];



const props = {
  name: "file",
  action: `${process.env.REACT_APP_API_BASE_URL || '//localhost:3001'}/upload/chat-img`,
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
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};
export default function FormSizeDemo() {
  const userInfo = useSelector(selectUserInfo);
  // const [newUserInfo, setNewUserInfo] = useState<UserInfoSubstate>(userInfo);
  const [avatar, setAvatar] = useState(userInfo.avatar);
  const [email, setEmail] = useState(userInfo.email);
  const [nickname, setNickanem] = useState(userInfo.nickname);
  const [gender, setGender] = useState("");
  const [signature, setSignature] = useState(userInfo.signature || "");
  // const [avatar, setAvatar] = useState("");

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
    // this.formRef.current!.resetFields();
  };

  const onFill = () => {
    // this.formRef.current!.setFieldsValue({
    //   note: "Hello world!",
    //   gender: "male",
    // });
  };

  return (
    <div>
      <Card title="用户信息设置" className={styles.settingCard}>
        <>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            // initialValues={{ size: componentSize }}
            size="large"
            // onValuesChange={onFormLayoutChange}
            // size={componentSize as SizeType}
          >
            {/* <Form.Item label="Form Size" name="size">
              <Radio.Group>
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
              </Radio.Group>
            </Form.Item> */}
            <Form.Item label="Avatar">
              <Upload {...props}>
                <Avatar shape="square" size={96} src={avatar} />
              </Upload>
            </Form.Item>

            <Form.Item label="Email">
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

            {/* <Form.Item label="Password">
              <Input />
            </Form.Item> */}

            {/* <Form.Item label="Birthday">
              <DatePicker
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </Form.Item> */}

            <Form.Item label="Gender">
              <Select>
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="secret">Secret</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button">Cancel</Button>
              {/* <Button type="link" htmlType="button" onClick={onFill}>
                Fill form
              </Button> */}
            </Form.Item>

            {/* <Form.Item label="TreeSelect">
              <TreeSelect
                treeData={[
                  {
                    title: "Light",
                    value: "light",
                    children: [{ title: "Bamboo", value: "bamboo" }],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Cascader">
              <Cascader
                options={[
                  {
                    value: "zhejiang",
                    label: "Zhejiang",
                    children: [
                      {
                        value: "hangzhou",
                        label: "Hangzhou",
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>

            <Form.Item label="InputNumber">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Switch">
              <Switch />
            </Form.Item>
            <Form.Item label="Button">
              <Button>Button</Button>
            </Form.Item> */}
          </Form>
        </>
      </Card>
    </div>
  );
}

// ReactDOM.render(<FormSizeDemo />, mountNode);
