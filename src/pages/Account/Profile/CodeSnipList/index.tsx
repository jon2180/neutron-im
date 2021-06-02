import React, { useCallback, useEffect, useState } from "react";

import { message, Space, Spin } from "antd";
// import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { momentService } from "@/services";
import { IActivity } from "@/types/state";
import { createSemaphore } from "@/utils/wrapper";
import CodeSnipListItem from "@/components/CodeSnipListItem";

const WARN_NOTICE_KEY = "WARN_NOTICE_KEY";
const loadingStatus = createSemaphore();

export default function CodeSnipList() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchActivities = useCallback(async function fetchActivities() {
    if (loadingStatus.loading === "pending") return;

    setLoaded(false);
    loadingStatus.loading = "pending";
    const resp = await momentService.getCodesnips({ keyword: "" });
    loadingStatus.loading = "idle";
    setLoaded(true);

    console.log(resp);
    if (resp.status !== 20000) {
      message.warn(
        {
          key: WARN_NOTICE_KEY,
          content: "获取列表失败",
        },
        0.2
      );
      return;
    }

    setActivities((resp.data || []) as IActivity[]);
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <>
      <Spin spinning={!loaded}>
        <Space>
          {activities.map((value) => {
            return <CodeSnipListItem data={value} />;
          })}
        </Space>
      </Spin>
    </>
  );
}
