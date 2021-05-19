import React, { useState } from "react";
import { Button, Space, Spin } from "antd";
import { FormattedMessage } from "react-intl";

import RecordRTC from "recordrtc";

import styles from "./SoundRecord.module.less";
import { createSemaphore } from "@/utils/wrapper";

const recordStatus = createSemaphore();

let recorder: RecordRTC | null = null;
let stream: MediaStream | null = null;

// 获取授权
// 开始录制
// 结束录制
// 上传数据
// 回显在聊天窗口

export interface SoundRecordProps {
  handleRecorded: (blob: Blob) => void;
}

export default function SoundRecord(props: SoundRecordProps) {
  const [recording, setRecording] = useState(false);

  // TODO 录音
  const recordSound: React.MouseEventHandler<HTMLElement> = async (e) => {
    if (recordStatus.loading === "idle") {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorder = new RecordRTC(stream, { type: "audio" });
        recorder.onStateChanged((state: RecordRTC.State) => {
          console.log(state);
        });
        recorder.startRecording();
        setRecording(true);
        recordStatus.loading = "pending";
      } catch (e) {
        console.error(e);
      }
    } else if (recorder) {
      recorder.stopRecording(() => {
        try {
          if (recorder) {
            if (
              props &&
              props.handleRecorded &&
              typeof props.handleRecorded === "function"
            )
              props.handleRecorded(recorder.getBlob());

            // recycle recorder object
            recorder.destroy();

            // recycle record tracks
            if (stream && stream.getTracks) {
              for (let track of stream.getTracks()) {
                track.stop();
              }
              stream = null;
            }

            // assign null manually
            recorder = null;
          }
        } catch (e) {
          console.error(e);
        }
        setRecording(false);
      });
    }
  };

  return (
    <Space className={styles.recordBox} size={16}>
      <Spin spinning={recording}>
        <div className={styles.recording}></div>
      </Spin>
      <Button onClick={recordSound}>
        {!recording ? (
          <FormattedMessage
            id="start_record"
            defaultMessage="Start Recording"
          />
        ) : (
          <FormattedMessage id="stop_record" defaultMessage="Stop Recording" />
        )}
      </Button>
    </Space>
  );
}
