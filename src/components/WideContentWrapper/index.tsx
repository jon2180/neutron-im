import React from "react";
import styles from "./WideContentWrapper.module.less";

/**
 * 宽屏状态下保持内容最大宽度为 1200 px，默认情况下的外边距为 16 px，
 * 添加 className 参数之后，将会自动忽略外边距设置
 *
 * @param param0 宽屏包裹器
 * @returns react 组件
 */
export default function WideContentWrapper({
  children: Component,
  className,
  style,
}: {
  children: JSX.Element | JSX.Element[];
  className?: string;
  style?: React.CSSProperties;
}) {
  const classNames = [styles.outterBox];
  if (className) classNames.push(className);

  return (
    <div className={classNames.join(" ")} style={style || {}}>
      <div className={styles.innerBox}>{Component}</div>
    </div>
  );
}
