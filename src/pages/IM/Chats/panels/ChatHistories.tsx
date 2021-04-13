import React, { useCallback, useEffect, useRef } from "react";
import { List, Avatar } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useWindowDimensions from "@/utils/hooks";
import {
  fetchChatHistory,
  selectChatHistoryById,
} from "@/store/chatsHistoriesSlice";
import { MessageData } from "@/types/http";

import { formatTimestamp } from "@/utils/format";

import styles from "./ChatHistories.module.less";
import { selectUserInfo } from "@/store/userInfoSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/store/store";

/**
 * 把 消息数据 转成 jsx
 * @param data 消息主体
 */
const contentTypeMap: Record<any, string> = {
  0: "text",
  1: "image",
  2: "voice",
  3: "video",
};

function getMessageContent(myid: number | string, data: MessageData) {
  let val;
  if (Number.isInteger(data.content_type)) {
    val = contentTypeMap[data.content_type];
  } else {
    val = data.content_type;
  }

  switch (val) {
    case "text":
      return (
        <div
          className={[
            styles.messageText,
            data.sender_id === myid ? styles.messageSentByMe : "",
          ].join(" ")}
        >
          {data.content}
        </div>
      );
    case "image":
      return (
        <img className={styles.messageImg} src={data.content} alt="图片" />
      );
    default:
      return <span />;
  }
}

/**
 * 消息列表框
 */
export default function ChatHistories() {
  const userInfo = useSelector(selectUserInfo);
  const { height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const params = useParams<{
    id: string;
    type: "group" | "single";
  }>();

  /// 从 store 中获取数据
  let chatHistory = useSelector(selectChatHistoryById(params.id));
  const messagesEnd = useRef<HTMLDivElement>(null);

  const scrollToBottom = (delay = 200) => {
    setTimeout(() => {
      if (messagesEnd && messagesEnd.current) {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
      }
    }, delay);
  };

  // 如果 store 中没有，则向服务器端请求
  const handleGetHistory = useCallback(
    async (params: { id: string; type: string }) => {
      const resultAction = await dispatch(
        fetchChatHistory({ chatId: params.id, type: params.type })
      );

      if (fetchChatHistory.fulfilled.match(resultAction)) {
        const res = unwrapResult(resultAction);
        console.log(res);
        scrollToBottom(500);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    console.log("fetch chat history...outside");
    if (!chatHistory) {
      console.log("fetch chat history...");
      handleGetHistory({ id: params.id, type: "single" });
      // dispatch(fetchChatHistory({ chatId: params.id, type: "single" }));
    }
  }, [handleGetHistory, chatHistory, params]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div className={styles.messageBox} style={{ height: `${height - 200}px` }}>
      <List
        itemLayout="horizontal"
        dataSource={chatHistory?.messages || []}
        split={false}
        renderItem={(item) => {
          return (
            <>
              <List.Item style={{ padding: "0" }}>
                <div
                  className={styles.time}
                  style={{
                    margin: "0 auto",
                  }}
                >
                  {typeof item.time === "number"
                    ? formatTimestamp(item.time)
                    : item.time}
                </div>
              </List.Item>
              <List.Item style={{ padding: "0" }}>
                <div className={styles.message}>
                  <div className={styles.avatar}>
                    <Avatar src={chatHistory?.avatar}></Avatar>
                  </div>
                  <div className={styles.messageContent}>
                    {getMessageContent(userInfo.id, item)}
                  </div>
                </div>
              </List.Item>
            </>
          );
        }}
      />
      <div
        style={{ clear: "both", height: "1px", width: "100%" }}
        ref={messagesEnd}
      ></div>
    </div>
  );
}
