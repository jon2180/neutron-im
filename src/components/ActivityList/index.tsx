import React, { useCallback, useEffect, useState } from "react";

import { List, message, Spin } from "antd";
// import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import ActivityListItem from "@/components/ActivityListItem";
// import { useIntl } from "react-intl";
import { momentService } from "@/services";
import { IActivity } from "@/types/state";
import { createSemaphore } from "@/utils/wrapper";
import styles from "./index.module.less";
const WARN_NOTICE_KEY = "WARN_NOTICE_KEY";
const loadingStatus = createSemaphore();

// const handleThumbsUp: React.MouseEventHandler<HTMLElement> = (e) => {
//   e.stopPropagation();
//   e.preventDefault();
//   console.log(e);
// };

// const handleThumbsDown: React.MouseEventHandler<HTMLElement> = (e) => {
//   e.stopPropagation();
//   e.preventDefault();

//   console.log(e);
// };

// const handleShare: React.MouseEventHandler<HTMLElement> = (e) => {
//   e.stopPropagation();
//   e.preventDefault();

//   console.log(e);
// };
// const handleComments: React.MouseEventHandler<HTMLElement> = (e) => {
//   e.stopPropagation();
//   e.preventDefault();
//   console.log(e);
// };

/**
 * Antd List 组件包裹的 Activity List
 * @returns ActivityList(base on Antd)
 */
export default function ActivityList() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchActivities = useCallback(async function fetchActivities() {
    if (loadingStatus.loading === "pending") return;

    setLoaded(false);
    loadingStatus.loading = "pending";
    const resp = await momentService.getActivities({ keyword: "" });
    loadingStatus.loading = "idle";
    setLoaded(true);

    console.log(resp);
    if (resp.status !== 20000 || !resp.data) {
      message.warn({
        key: WARN_NOTICE_KEY,
        content: "获取列表失败",
      });
      return;
    }

    setActivities(resp.data as IActivity[]);
    // FIXME
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <Spin spinning={!loaded}>
      <List
        itemLayout="vertical"
        size="large"
        // pagination={{
        //   // onChange: (page) => {
        //   //   console.log(page);
        //   // },
        //   size: "small",
        //   position: "bottom",
        //   pageSize: 10,
        // }}
        dataSource={activities}
        // footer={
        //   <div>
        //     <b>ant design</b> footer part
        //   </div>
        // }
        className={styles.antList}
        renderItem={ActivityListItem}
      />
    </Spin>
  );
}
