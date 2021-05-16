/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import WideContentWrapper from "@/components/WideContentWrapper";
import { Card, message, Skeleton } from "antd";
import { momentService } from "@/services";
import type { IActivity } from "@/types/state";
import { createSemaphore } from "@/utils/wrapper";
import "./CodeSnips.less";

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
    if (resp.status !== 20000 || !resp.data) {
      message.warn(
        {
          key: WARN_NOTICE_KEY,
          content: "获取列表失败",
        },
        0.2
      );
      return;
    }

    // setActivities(resp.data as IActivity[]);
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <WideContentWrapper>
      <Card>
        <Skeleton loading={!loaded}>
          <div>helloworld, this is codesnips</div>
          <div></div>
        </Skeleton>
      </Card>
    </WideContentWrapper>
  );
}
