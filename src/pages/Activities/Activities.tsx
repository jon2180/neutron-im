import React from "react";
import { Card } from "antd";
import styles from "./Activities.module.less";
import WideContentWrapper from "@/components/WideContentWrapper";
import ActivityList from "@/components/ActivityList";

export default function Activities() {
  return (
    <div className={styles.content}>
      <WideContentWrapper>
        <Card title="Activities" className="without-padding-card">
          <ActivityList />
        </Card>
      </WideContentWrapper>
    </div>
  );
}
