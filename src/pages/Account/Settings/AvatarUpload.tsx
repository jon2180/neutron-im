import React from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import AppConstants from "@/config/url.const";
import { Cookie } from "@/utils/cookie";

import type { UploadChangeParam } from "antd/lib/upload";
import type { UploadFile } from "antd/lib/upload/interface";

import "./AvatarUpload.less";

const defaultUploadAvatarProps = {
  name: "file",
  maxCount: 1,
  showUploadList: false,
  action: AppConstants.AVATAR_UPLOAD_URL,
  headers: {
    Authorization: Cookie.getCookie("Authorization"),
  },
};

export interface AvatarUploadProps {
  children: JSX.Element | JSX.Element[];
  onChange: (info: UploadChangeParam<UploadFile<any>>) => void;
}

export default function AvatarUpload(props: AvatarUploadProps) {
  const uploadAvatarProps = {
    ...defaultUploadAvatarProps,
    ...props,
  };

  return (
    <ImgCrop rotate>
      <Upload {...uploadAvatarProps}>{props.children}</Upload>
    </ImgCrop>
  );
}
