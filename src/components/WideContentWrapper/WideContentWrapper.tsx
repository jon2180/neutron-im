import React from "react";
import styles from "./WideContentWrapper.module.less";

export default function WideContentWrapper({
  children: Component,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className={styles.outterBox}>
      <div className={styles.innerBox}>{Component}</div>
    </div>
  );
}
