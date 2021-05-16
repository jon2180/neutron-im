import React from "react";
import { Space } from "antd";

export default function IconText({ icon, text }: { icon: any; text: any }) {
  return (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
}
