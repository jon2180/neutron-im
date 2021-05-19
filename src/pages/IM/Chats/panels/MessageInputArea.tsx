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
import { useAppDispatch } from "@/store";

import styles from "./MessageInputArea.module.less";
import EmojiPicker from "./EmojiPicker";
import { Cookie } from "@/utils/cookie";
import {
  pushLastMessage,
  selectRecentChatById,
  setUnread,
} from "@/store/recentChatsSlice";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/userInfoSlice";
import websocketStore from "@/websocket";
import AppConstants from "@/config/url.const";

import type { EmojiSelectHandler } from "./EmojiPicker";
import type { HttpResponseData, MessageData } from "@/types/http";
import type { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { messageService, msgCheckingService } from "@/services";
import { ChatMessageType, MessageType } from "@/websocket/conf";
import SoundRecord from "./SoundRecord";

export interface ChatRouteParams {
  id: string;
  type: "group" | "single";
}

/**
 * 聊天输入框
 */
export default function MessageInputArea() {
  const [inputValue, setInputValue] = useState("");
  const [showSoundRecord, setShowSoundRecord] = useState(false);
  const dispatch = useAppDispatch();
  const params = useParams<ChatRouteParams>();

  const chatData = useSelector(selectRecentChatById(params.id));
  const userInfo = useSelector(selectUserInfo);

  function buildMessageData({
    content_type,
    content,
  }: {
    content_type: ChatMessageType;
    content: string;
  }): MessageData | null {
    if (!chatData) {
      return null;
    }

    return {
      chat_id: params.id,
      sender_id: userInfo.id,
      receiver_id: chatData.receiver_id,
      id: Random.id(),
      content_type,
      content,
      time: Date.now(),
    };
  }

  function buildSocketMessageBody({
    type,
    params,
  }: {
    type: MessageType;
    params: Record<string, any>;
  }) {
    if (!chatData) {
      return null;
    }
    return {
      sender: userInfo.id,
      receiver:
        chatData.target_id === userInfo.id
          ? chatData.sender_id
          : chatData.target_id,
      timestamp: Date.now(),
      type: type,
      body: { ...params },
    };
  }

  const sendMessage = () => {
    if (inputValue === "") return;

    if (!chatData) {
      message.error({ content: "该聊天不" });
      return;
    }
    const msg = buildMessageData({
      content_type: ChatMessageType.TEXT,
      content: inputValue,
    });
    if (!msg) {
      message.error({ content: "该聊天不" });
      return;
    }
    dispatch(pushMessage(msg));
    dispatch(pushLastMessage(msg));
    dispatch(setUnread({ accountId: params.id, unread: 0 }));
    msgCheckingService.update({ targetId: params.id });
    const websocketMessage = buildSocketMessageBody({
      type: MessageType.SINGLE,
      params: msg,
    });
    if (!websocketMessage) {
      message.error({ content: "该聊天不" });
      return;
    }

    const returnCode = websocketStore.send(websocketMessage);
    console.log(returnCode);
    setInputValue("");
  };

  const sentImg = ({ url, filename }: { filename: string; url: string }) => {
    if (!url || url === "" || !filename || filename === "") return;

    const msg = buildMessageData({
      content_type: ChatMessageType.IMAGE,
      content: filename,
    });

    if (!msg) {
      message.error({ content: "该聊天不存在" });
      return;
    }
    dispatch(pushMessage(msg));
    dispatch(pushLastMessage(msg));
    const body = buildSocketMessageBody({
      type: MessageType.SINGLE,
      params: msg,
    });
    if (!body) {
      message.error({ content: "该聊天不存在" });
      return;
    }
    const returnCode = websocketStore.send(body);
    console.log("return Code: %d", returnCode);
    setInputValue("");
  };

  const sendAudio = (url: string) => {
    if (!url || url === "") return;

    const msg = buildMessageData({
      content_type: ChatMessageType.AUDIO,
      content: url,
    });

    if (!msg) {
      message.error({ content: "该聊天不存在" });
      return;
    }

    dispatch(pushMessage(msg));
    dispatch(pushLastMessage(msg));

    // construct socket message`s content
    const body = buildSocketMessageBody({
      type: MessageType.SINGLE,
      params: msg,
    });
    if (!body) {
      message.error({ content: "该聊天不存在" });
      return;
    }
    const returnCode = websocketStore.send(body);
    console.log("return Code: %d", returnCode);
    // setInputValue("");
  };

  const props = {
    name: "file",
    action: AppConstants.PIC_UPLOAD_URL,
    headers: {
      Authorization: Cookie.getCookie("Authorization"),
    },

    onChange(info: UploadChangeParam<UploadFile<HttpResponseData>>): void {
      const loadingKey = "LOADING_KEY";
      switch (info.file.status) {
        case "uploading":
          console.log(info);
          message.loading({ key: loadingKey, content: "Picture Uploading..." });
          break;
        case "done":
        case "success":
          message.destroy(loadingKey);
          const { response } = info.file;
          if (response) {
            console.log(response);
            if (
              response.status === 20000 &&
              response.data &&
              Array.isArray(response.data)
            ) {
              const { data } = response;
              for (let i = 0; i < data.length; ++i) {
                if (data[i].url) {
                  sentImg({ url: data[i].url, filename: data[i].filename });
                }
              }
              message.success("Picture Upload Successfully");
            } else {
              message.error("Picture Upload Failed");
            }
          }
          break;
        case "error":
        case "removed":
        default:
          message.destroy(loadingKey);
          console.log(info);
          message.error("Picture Upload Failed");
      }
    },
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
            maxCount={9}
            multiple
            accept={["image/png", "image/jpeg", "image/gif"].join(",")}
            showUploadList={false}
          >
            <Button type="text" icon={<PictureOutlined />}></Button>
          </Upload>
        </div>

        <div className={styles.operationSend}>
          <Popover
            content={
              <SoundRecord
                handleRecorded={(blob) => {
                  messageService.postChatAudio({ blob: blob }).then((res) => {
                    if (
                      !res ||
                      res.status !== 20000 ||
                      !res.data ||
                      !(res.data as Record<string, any>).url
                    ) {
                      message.error(res.message, 0.5);
                      return;
                    }
                    sendAudio((res.data as Record<string, any>).url);
                  });
                }}
              />
            }
            trigger="click"
            visible={showSoundRecord}
          >
            <Button
              type="text"
              icon={<AudioOutlined />}
              onClick={() => {
                setShowSoundRecord(!showSoundRecord);
              }}
            >
              Audio
            </Button>
          </Popover>
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
        placeholder="Press <control + enter> to send"
        className={styles.inputTextArea}
        rows={4}
        onPressEnter={(e) => {
          if (e.ctrlKey) {
            sendMessage();
          }
        }}
      />
    </div>
  );
}
