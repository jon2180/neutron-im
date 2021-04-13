import React, { useEffect } from "react";
import { PageHeader, Button } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/store/store";

import styles from "./Chats.module.less";
import { selectRecentChatById, setUnread } from "@/store/recentChatsSlice";
import ChatHistories from "./panels/ChatHistories";
import MessageInputArea from "./panels/MessageInputArea";

export default function ChatPanel() {
  const dispatch = useAppDispatch();
  const params = useParams<{
    id: string;
    type: "group" | "single";
  }>();

  let recentChat = useSelector(selectRecentChatById(params.id));

  useEffect(() => {
    dispatch(
      setUnread({
        accountId: params.id,
        unread: 0,
      })
    );
  });

  return (
    <div>
      <PageHeader
        className={styles["site-page-header"]}
        onBack={() => window.history.back()}
        title={recentChat ? recentChat.account_name : "unknown"}
        style={{
          height: "64px",
        }}
        extra={
          <Button type="text" title="...">
            更多
          </Button>
        }
      />
      <ChatHistories />
      <MessageInputArea />
    </div>
  );
}