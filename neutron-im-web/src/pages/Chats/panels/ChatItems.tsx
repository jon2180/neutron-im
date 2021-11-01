import React from 'react';
import { Image } from 'antd';
import styles from './ChatHistories.module.less';

/**
 * 文本消息
 * @param param0 文本消息
 * @returns
 */
export function ChatTextItem({
  self,
  content,
}: {
  self: boolean;
  content: string;
}) {
  const classNames = [
    styles.messageText,
    self ? styles.messageSentByMe : '',
  ].join(' ');

  return <div className={classNames}>{content}</div>;
}

/**
 * 图片消息
 * @param url 图片地址
 * @returns
 */
export function ChatImageItem({ src }: { src: string }) {
  return (
    <div className={styles.messageImg}>
      <Image src={src} alt="图片" />
    </div>
  );
}

/**
 * 语音消息
 * @param param0 参数
 * @returns
 */
export function ChatAudioItem({ src }: { src: string }) {
  return (
    <audio src={src} className={styles.audio} controls>
      Your browser do not support audio tag in HTML5
    </audio>
  );
}

/**
 * 视频消息
 * @param param0 参数
 * @returns
 */
export function ChatVideoItem({ src }: { src: string }) {
  return (
    <video src={src} className={styles.video} controls>
      Your browser do not suppport video tag in HTML5
    </video>
  );
}

/**
 * 代码剪切板
 * @returns codesnips
 */
export function ChatCodesnipsItem() {
  return <div></div>;
}

/**
 * 收藏板
 * @returns 收藏板
 */
export function ChatFavoriteItem() {
  return <div></div>;
}

/**
 * 系统消息
 * @returns 系统消息
 */
export function ChatNoticeItem() {
  return <div></div>;
}
