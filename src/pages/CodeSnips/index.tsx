import React, { useCallback, useEffect, useState } from "react";
import WideContentWrapper from "@/components/WideContentWrapper";
import { Card, List, message, Skeleton } from "antd";
import { momentService } from "@/services";
import type { IActivity } from "@/types/state";
import { createSemaphore } from "@/utils/wrapper";
import ActivityLI from "@/components/ActivityListItem";
// import styles from "./CodeSnips.module.less";

const WARN_NOTICE_KEY = "WARN_NOTICE_KEY";
const loadingStatus = createSemaphore();

export default function CodeSnips() {
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
    <WideContentWrapper>
      <Card>
        <Skeleton loading={!loaded}>
          <List
            dataSource={activities}
            renderItem={(item: IActivity, index) => {
              return <ActivityLI item={item} index={index} />;
            }}
          />
        </Skeleton>
      </Card>
    </WideContentWrapper>
  );
}
