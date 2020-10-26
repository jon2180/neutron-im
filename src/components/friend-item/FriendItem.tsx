import React from "react";
import { Avatar } from "antd";

export interface IFriendItemProps {
  data: {
    avatar: string;
    accountName: string;
  };
}

export default function FriendItem(props: IFriendItemProps) {
  const { data } = props;
  return (
    <div
      style={{
        width: "100%",
        height: "64px",
        padding: "8px",
        boxSizing: "border-box",
        display: "flex",
      }}
    >
      <div
        style={{
          marginRight: "8px",
        }}
      >
        <Avatar size={48} src={data.avatar}></Avatar>
      </div>
      <div
        style={{
          lineHeight: "48px",
          fontSize: "18px",
          color: "#333",
        }}
      >
        {data.accountName}
      </div>
    </div>
  );
}
