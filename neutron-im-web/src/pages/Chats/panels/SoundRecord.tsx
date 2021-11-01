import type React from 'react';
import { useState } from 'react';
import { Button, message, Space, Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import RecordRTC from 'recordrtc';

import styles from './SoundRecord.module.less';
import { createSemaphore } from '@/utils/wrapper';

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
  const recordSound: React.MouseEventHandler<HTMLElement> = async () => {
    if (recordStatus.loading === 'idle') {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (!stream) {
          message.error('未知原因使录音申请权限失败');
          setRecording(false);
          return;
        }
      } catch (e) {
        message.error('您拒绝了录音权限的申请');
        setRecording(false);
        return;
      }

      try {
        recorder = new RecordRTC(stream, { type: 'audio' });
        recorder.onStateChanged((state: RecordRTC.State) => {
          console.log(state);
        });
        recordStatus.loading = 'pending';
        setRecording(true);
        recorder.startRecording();
      } catch (e) {
        message.error('未知异常');
      }
      return;
    } else if (recordStatus.loading === 'pending' && recorder) {
      recorder.stopRecording(() => {
        try {
          if (recorder) {
            if (
              props &&
              props.handleRecorded &&
              typeof props.handleRecorded === 'function'
            )
              props.handleRecorded(recorder.getBlob());

            // recycle recorder object
            recorder.destroy();

            // recycle record tracks
            if (stream && stream.getTracks) {
              for (const track of stream.getTracks()) {
                track.stop();
              }
              stream = null;
            }

            // assign null manually
            recorder = null;
          }
        } catch (e) {
          console.error(e);
          message.error('录音保存失败');
        }
        setRecording(false);
        recordStatus.loading = 'idle';
        return;
      });
    }
  };

  if (
    !navigator ||
    !navigator.mediaDevices ||
    !navigator.mediaDevices.getUserMedia
  ) {
    message.error('您的浏览器不支持此 getUserMedia 方法');
    return (
      <div>
        您的浏览器不支持此 getUserMedia 方法, 请更新您的浏览器至最新版本
      </div>
    );
  }

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
