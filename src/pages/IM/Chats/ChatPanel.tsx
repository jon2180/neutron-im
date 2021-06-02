import React, { useEffect, useState } from "react";
import { PageHeader, Button, Drawer } from "antd";
import { useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useAppDispatch } from "@/store";

import styles from "./Chats.module.less";
import { selectRecentChatById, setUnread } from "@/store/recentChatsSlice";
import ChatHistories from "./panels/ChatHistories";
import MessageInputArea from "./panels/MessageInputArea";
import { FormattedMessage } from "react-intl";
import { msgCheckingService } from "@/services";
// import CodeSnipList from "@/components/CodeSnipList";

interface ChatPanelRouterParamsType {
  id: string;
  type: "group" | "single";
}

export default withRouter(function ChatPanel(props) {
  const dispatch = useAppDispatch();
  const params = useParams<ChatPanelRouterParamsType>();
  const [state, setState] = useState({ visible: false });

  const showDrawer = () => {
    setState({
      visible: true,
    });
  };

  const onClose = () => {
    setState({
      visible: false,
    });
  };

  // const onChange = (e) => {
  //   setState({
  //     placement: e.target.value,
  //   });
  // };
  let recentChat = useSelector(selectRecentChatById(params.id));

  useEffect(() => {
    dispatch(
      setUnread({
        accountId: params.id,
        unread: 0,
      })
    );
    msgCheckingService
      .update({ targetId: params.id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div>
      <PageHeader
        className={styles["site-page-header"]}
        onBack={() => props.history.replace("/im/chats")}
        title={recentChat ? recentChat.account_nickname : "unknown"}
        style={{
          height: "64px",
        }}
        extra={
          <Button type="text" title="..." onClick={showDrawer}>
            <FormattedMessage id="more" defaultMessage="More" />
          </Button>
        }
      />
      <ChatHistories />
      <MessageInputArea />
      <Drawer
        title="Code Snips"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={state.visible}
        key="drawer-codenips"
      >
        {/* <CodeSnipList /> */}
      </Drawer>
    </div>
  );
});
