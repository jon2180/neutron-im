import React from "react";
import { MessageData } from "@/@types/types";
import { Avatar } from "antd";

import styles from "./Chat.module.css";

/**
 * 把 消息数据 转成 jsx
 * @param data 消息主体
 */
const getMessageContent = (data: MessageData) => {
  if (data.type === "text") {
    return (
      <div
        className={[
          styles.messageText,
          data.isSentByMe ? styles.messageSentByMe : styles.messageSentByOthers,
        ].join(" ")}
      >
        {data.content}
      </div>
    );
  } else if (data.type === "image") {
    return <img className={styles.messageImg} src={data.content} alt="图片" />;
  }
};

const MessageContent = ({
  data,
  avatar,
}: // name,
{
  data: MessageData;
  avatar: string;
  // name: string;
}) => {
  return (
    <div className={styles.message}>
      <div className={styles.avatar}>
        <Avatar src={avatar}></Avatar>
      </div>
      <div className={styles.messageContent}>{getMessageContent(data)}</div>
      <div className={styles.time}>{data.time}</div>
    </div>
  );
};

export default MessageContent;
