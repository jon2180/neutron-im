import React, { useRef, useState } from "react";
import { PageHeader, Button, Input } from "antd";
import { Random } from "mockjs";

import {
  SmileOutlined,
  PictureOutlined,
  AudioOutlined,
  VideoCameraAddOutlined,
  EnterOutlined,
} from "@ant-design/icons";

import styles from "./Chat.module.css";
import useWindowDimensions from "../../utils/useWindowDimensions";

import { pushToSingleChat, selectSingleChat } from "./chatHistorySlice";
import { IMessage } from "../../types";

import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

export type IChatHistory = Array<IMessage>;

export interface IAction {
  type: string;
  inputValue: string;
  payload: any;
}

// function reducer(state: IChatHistory, action: IAction) {
//   switch (action.type) {
//     case "push":
//       // console.log(state);
//       return [...state, action.payload];
//     default:
//       return undefined;
//   }
// }

// const getMessageContent = (item: {
//   type: "text" | "image";
//   isSentByMe: boolean;
//   content: string;
// }) => {
//   if (item.type === "text") {
//     return (
//       <div
//         className={[
//           styles.messageText,
//           item.isSentByMe ? styles.messageSentByMe : "",
//         ].join(" ")}
//       >
//         {item.content}
//       </div>
//     );
//   } else if (item.type === "image") {
//     return (
//       item.isSentByMe ? styles.messageSentByMe : "",
//       (
//         <img
//           className={[styles.messageImg].join(" ")}
//           src={item.content}
//           alt="图片"
//         ></img>
//       )
//     );
//   }
// };

export interface IChatProps {
  // accountId: string;
}

export default function Chat(props: RouteComponentProps) {
  console.log(props);

  const { height } = useWindowDimensions();

  // const [chatHistory, setChatHistory] = useReducer(reducer, preChatHistory);

  // TODO
  const messagesEnd = useRef(null);
  // const scrollToBottom = () => {
  //   messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     scrollToBottom();
  //   }, 500);
  // }, [chatHistory.length]);

  const [inputValue, setInputValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    // console.log(inputValue);
  };

  /**
   * onClick 事件被触发了两次
   */
  const dispatch = useDispatch();
  const sendMessage = () => {
    // setChatHistory({
    //   type: "push",
    //   inputValue,
    //   payload: {
    //     accountId: Random.id(),
    //     avatar: Random.image("48x48"),
    //     // accountName: Random.cname(),
    //     type: "string",
    //     content: inputValue,
    //     isSentByMe: true,
    //     // time: Random.time(),
    //     time: Date.now(),
    //     // unread: Random.integer(0, 100),
    //   },
    // });

    dispatch(
      pushToSingleChat({
        accountId: "5464561321548",
        message: {
          messageId: Random.id(),
          from: Random.id(),
          avatar: Random.image("48x48"),
          // accountName: Random.cname(),
          type: "text",
          content: inputValue,
          isSentByMe: true,
          // time: Random.time(),
          time: Date.now(),
          // unread: Random.integer(0, 100),
        },
      })
    );
    // console.log(chatHistory);
    setInputValue("");
  };

  const singleChatHistor = useSelector(selectSingleChat);

  return (
    <div>
      <PageHeader
        className={styles["site-page-header"]}
        onBack={() => null}
        title="用户名"
        subTitle="状态"
        extra={<Button title="...">hahah</Button>}
      />
      {/** 消息列表框 */}
      <div
        className={styles.messageBox}
        style={{ height: `${height - 200}px` }}
      >
        {/* <List
          itemLayout="horizontal"
          dataSource={chatHistory}
          split={false}
          renderItem={(item) => (
            <List.Item style={{ padding: "0" }}>
              <div className={styles.message}>
                <div className={styles.avatar}>
                  <Avatar src={item.avatar}></Avatar>
                </div>
                {getMessageContent(item)}
                <div className={styles.time}>{item.time}</div>
              </div>
            </List.Item>
          )}
        /> */}
        <div style={{ clear: "both", height: "1px" }} ref={messagesEnd}>
          {JSON.stringify(singleChatHistor)}
        </div>
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
        <Input.TextArea value={inputValue} onChange={onChange} rows={3} />
      </div>
    </div>
  );
}
