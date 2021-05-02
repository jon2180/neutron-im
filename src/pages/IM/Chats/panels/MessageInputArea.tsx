import React, { useState } from "react";
import { Button, Input, Popover, Upload, message } from "antd";
import { Random } from "mockjs";
import { useParams } from "react-router-dom";
import {
  SmileOutlined,
  PictureOutlined,
  AudioOutlined,
  EnterOutlined,
} from "@ant-design/icons";
import { pushMessage } from "@/store/chatsHistoriesSlice";
import { useAppDispatch } from "@/store/store";
import { MessageData } from "@/types/http";

import styles from "./MessageInputArea.module.less";
import EmojiPicker, { EmojiSelectHandler } from "./EmojiPicker";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { Cookie } from "@/utils/cookie";
import {
  pushLastMessage,
  selectRecentChatById,
} from "@/store/recentChatsSlice";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/userInfoSlice";
import websocketStore from "@/websocket/websocket";
import AppConstants from "@/config/url.const";

// TODO 录音
const recordSound: React.MouseEventHandler<HTMLElement> = (e) => {
  if (navigator.mediaDevices.getUserMedia) {
    const constraints = { audio: true };
    navigator.mediaDevices.getUserMedia(constraints).then(
      (stream) => {
        console.log("授权成功！");
      },
      () => {
        console.error("授权失败！");
      }
    );
  } else {
    console.error("浏览器不支持 getUserMedia");
  }
};
/**
 * 聊天输入框
 */
export default function MessageInputArea() {
  const [inputValue, setInputValue] = useState("");
  const [urls, setUrls] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const params = useParams<{
    id: string;
    type: "group" | "single";
  }>();

  const chatData = useSelector(selectRecentChatById(params.id));
  const userInfo = useSelector(selectUserInfo);

  const props = {
    name: "file",
    action: AppConstants.PIC_UPLOAD_URL,
    headers: {
      Authorization: Cookie.getCookie("Authorization"),
    },
    onChange(info: UploadChangeParam<UploadFile<any>>): void {
      if (info.file.status !== "uploading") {
        console.log(info.fileList);
      }
      if (info.file.status === "done") {
        const currentUrls = urls;
        currentUrls.push("string");
        setUrls(currentUrls);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const sendMessage = () => {
    if (inputValue === "") return;

    if (!chatData) {
      message.error({ content: "该聊天不" });
      return;
    }

    const msg: MessageData = {
      chat_id: params.id,
      sender_id: userInfo.id,
      receiver_id: chatData.receiver_id,
      id: Random.id(),
      content_type: "text",
      content: inputValue,
      time: Date.now(),
    };
    dispatch(pushMessage(msg));
    dispatch(pushLastMessage(msg));

    if (
      websocketStore.websocket &&
      websocketStore.websocket.readyState === WebSocket.OPEN
    ) {
      websocketStore.websocket.send(
        JSON.stringify({
          sender: userInfo.id,
          receiver: chatData.target_id,
          timestamp: Date.now(),
          type: "single",
          body: msg,
        })
      );
    } else {
      console.error("本地已离线，或程序逻辑错误");
    }

    setInputValue("");
  };

  const selectEmoji: EmojiSelectHandler = (e) => {
    setInputValue(inputValue + e.native);
  };

  return (
    <div className={styles.input_box}>
      <div className={styles.operationBar}>
        <div className={styles.operationSelect}>
          <Popover
            content={
              <div>
                <EmojiPicker addEmoji={selectEmoji} />
              </div>
            }
            // title="Title"
            overlayClassName="overlayEmojiPicker"
            trigger="click"
            destroyTooltipOnHide={false}
            placement="topLeft"
          >
            <Button type="text" icon={<SmileOutlined />}></Button>
          </Popover>

          <Upload
            {...props}
            accept={["image/png", "image/jpeg", "image/gif"].join(",")}
          >
            <Button type="text" icon={<PictureOutlined />}></Button>
          </Upload>
        </div>

        <div className={styles.operationSend}>
          <Button type="text" icon={<AudioOutlined />} onClick={recordSound}>
            Audio
          </Button>
          {/* <Button type="text" icon={<VideoCameraAddOutlined />}>
            Video
          </Button> */}
          <Button type="text" icon={<EnterOutlined />} onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>

      <Input.TextArea
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        className={styles.inputTextArea}
        rows={4}
      />
    </div>
  );
}
