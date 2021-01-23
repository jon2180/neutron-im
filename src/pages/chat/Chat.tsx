import React, { useCallback, useEffect, useRef, useState } from "react";
import { PageHeader, Button, Input, List } from "antd";
import { Random } from "mockjs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  SmileOutlined,
  PictureOutlined,
  AudioOutlined,
  VideoCameraAddOutlined,
  EnterOutlined,
} from "@ant-design/icons";

import useWindowDimensions from "@/utils/useWindowDimensions";
import {
  selectChatHistoryById,
  pushMessage,
  fetchChatHistory,
} from "@/store/chatsSlice";

import { useAppDispatch } from "@/store/store";
import MessageContent from "./MessageContent";

import styles from "./Chat.module.less";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Chat() {
  const { height } = useWindowDimensions();
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();
  const params = useParams<{
    id: string;
    type: "group" | "single";
  }>();

  const messagesEnd = useRef<HTMLDivElement>(null);

  const scrollToBottom = (delay = 200) => {
    setTimeout(() => {
      if (messagesEnd && messagesEnd.current) {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
      }
    }, delay);
  };

  /// 从 store 中获取数据
  let chatHistory = useSelector(selectChatHistoryById(params.id));

  /// 如果 store 中没有，则向服务器端请求
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

  /// 确定 数据
  console.log("chat refreshing....");
  // TODO

  const sendMessage = () => {
    if (inputValue === "") {
      return;
    }

    dispatch(
      pushMessage({
        accountId: params.id,
        message: {
          messageId: Random.id(),
          from: Random.id(),
          avatar: Random.image("48x48"),
          type: "text",
          content: inputValue,
          isSentByMe: true,
          time: Date.now(),
        },
      })
    );
    setInputValue("");
    scrollToBottom();
  };

  return (
    <div>
      <PageHeader
        className={styles["site-page-header"]}
        // TODO 跳转到首页但不能触发页面刷新
        onBack={() => window.history.back()}
        title="用户名"
        subTitle="状态"
        extra={<Button title="...">更多</Button>}
      />

      {/** 消息列表框 */}
      <div
        className={styles.messageBox}
        style={{ height: `${height - 200}px` }}
      >
        <List
          itemLayout="horizontal"
          dataSource={chatHistory?.messages || []}
          split={false}
          renderItem={(item) => {
            return (
              <List.Item style={{ padding: "0" }}>
                <MessageContent
                  data={item}
                  avatar={chatHistory?.avatar}
                />
              </List.Item>
            );
          }}
        />
        <div
          style={{ clear: "both", height: "1px", width: "100%" }}
          ref={messagesEnd}
        ></div>
      </div>

      {/* 聊天输入框 */}
      <div className={styles.input_box}>
        <div className={styles.operationBar}>
          <div className={styles.operationSelect}>
            <Button
              ghost
              style={{
                color: "#666",
              }}
              icon={<SmileOutlined />}
            ></Button>
            <Button
              ghost
              style={{
                color: "#666",
              }}
              icon={<PictureOutlined />}
            ></Button>
          </div>
          <div className={styles.operationSend}>
            <Button icon={<AudioOutlined />}>Audio</Button>
            <Button icon={<VideoCameraAddOutlined />}>Video</Button>
            <Button icon={<EnterOutlined />} onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
        <Input.TextArea
          value={inputValue}
          autoSize={false}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          rows={3}
        />
      </div>
    </div>
  );
}
