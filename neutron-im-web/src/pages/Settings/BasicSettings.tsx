import React, { useCallback, useRef, useState } from 'react';
import {
  message,
  Avatar,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Space,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { fetchUserInfo, selectUserInfo } from '@/store/userInfoSlice';

import type { UploadChangeParam } from 'antd/lib/upload';
import type { UploadFile } from 'antd/lib/upload/interface';
import type { FormInstance } from 'antd';

import styles from './BasicSettings.module.less';
import AvatarUpload from './AvatarUpload';
import { userService } from '@/services';
import { useAppDispatch } from '@/store';
import moment from 'moment';
import { createSemaphore } from '@/utils/wrapper';

const uploadStatus = createSemaphore();

export function BasicSettingsForm() {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useAppDispatch();
  const formRef = useRef<FormInstance<any>>(null);
  const [uploading, setUploading] = useState(false);

  const submitForm = useCallback(
    async function submitForm() {
      if (uploadStatus.loading === 'pending') return;

      const values = formRef.current?.getFieldsValue();
      setUploading(true);
      uploadStatus.loading = 'pending';
      const resp = await userService.putUserInfo({
        ...values,
        birthday: values.birthday
          ? new Date(values.birthday).getTime()
          : undefined,
      });
      uploadStatus.loading = 'idle';
      setUploading(false);
      console.log(resp);

      if (!resp || !resp.status) {
        message.error(resp.message);
        return;
      }

      message.info('修改成功');

      dispatch(fetchUserInfo());
    },
    [dispatch],
  );

  setTimeout(() => {
    if (formRef && formRef.current) formRef.current?.resetFields();
  });

  const onReset = () => {
    formRef.current!.resetFields();
    console.log('reet');
  };

  const formatGenderNum = (gender: number) => {
    switch (gender) {
      case 1:
        return 'female';
      case 2:
        return 'male';
      case 0:
      default:
        return 'secret';
    }
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      size="middle"
      initialValues={{
        ...userInfo,
        gender:
          userInfo.gender && typeof userInfo.gender === 'number'
            ? formatGenderNum(userInfo.gender)
            : 'secret',
        birthday: userInfo.birthday ? moment(userInfo.birthday) : undefined,
      }}
      layout="vertical"
      className={styles.form}
      onReset={onReset}
      ref={formRef}
      name={'update_account'}
    >
      <Form.Item label={<>Email</>} name="email">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Nickname" name="nickname">
        <Input />
      </Form.Item>

      <Form.Item label="Signature" name="signature">
        <Input />
      </Form.Item>

      <Form.Item label="Gender" name="gender">
        <Select>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="secret">Secret</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Birthday" name="birthday">
        <DatePicker
          disabledDate={(date) => {
            return date.isSameOrAfter();
          }}
        />
      </Form.Item>

      <Form.Item>
        <Space size="middle">
          <Button
            type="primary"
            htmlType="submit"
            onClick={submitForm}
            loading={uploading}
          >
            Update Information
          </Button>
          <Button htmlType="reset">Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export function AvatarSettings() {
  const dispatch = useAppDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [avatar, setAvatar] = useState(userInfo.avatar);

  const onChange = (info: UploadChangeParam<UploadFile<any>>): void => {
    const loadingKey = 'LOADING_KEY';
    switch (info.file.status) {
      case 'uploading':
        console.log(info);
        message.loading({ key: loadingKey, content: 'Picture Uploading...' });
        break;
      case 'done':
      case 'success':
        message.destroy(loadingKey);
        const { response } = info.file;
        if (response) {
          if (response.status === 20000 && response.data.url) {
            setAvatar(response.data.url);
            message.success('Picture Upload Successfully');
            dispatch(fetchUserInfo());
          } else {
            message.error('Picture Upload Failed');
          }
        }
        break;
      case 'error':
      case 'removed':
      default:
        message.destroy(loadingKey);
        console.log(info);
        message.error('Picture Upload Failed');
    }
  };

  // 重新从 store 中获取数据
  setTimeout(() => {
    setAvatar(userInfo.avatar);
  });

  return (
    <div className={styles.avatar}>
      <Avatar
        shape="circle"
        size={144}
        src={avatar && avatar !== '' ? avatar : userInfo.avatar}
      />
      <AvatarUpload onChange={onChange}>
        <Button icon={<UploadOutlined />} className={styles.uploadBtn}>
          Change Avatar
        </Button>
      </AvatarUpload>
    </div>
  );
}

export default function BasicSettings() {
  return (
    <div className={styles.container}>
      <BasicSettingsForm />
      <AvatarSettings />
    </div>
  );
}
