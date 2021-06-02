import React, { useCallback, useEffect, useState } from "react";

import { momentService } from "@/services";
import { IActivity } from "@/types/state";
import { List, message, Spin } from "antd";
import { createSemaphore } from "@/utils/wrapper";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/userInfoSlice";
import ActivityLI from "@/components/ActivityListItem";

const WARN_NOTICE_KEY = "WARN_NOTICE_KEY";
const loadingStatus = createSemaphore();

export default function Activities() {
  const userInfo = useSelector(selectUserInfo);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoaded] = useState(false);

  const fetchActivities = useCallback(
    async function fetchActivities() {
      if (loadingStatus.loading === "pending") return;

      setLoaded(true);
      loadingStatus.loading = "pending";
      const resp = await momentService.getActivities({
        uid: userInfo.id || "",
        keyword: "",
      });
      loadingStatus.loading = "idle";
      setLoaded(false);

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
    },
    [userInfo]
  );

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <Spin spinning={loading}>
      <List
        dataSource={activities}
        renderItem={(item: IActivity, index) => {
          return <ActivityLI item={item} index={index} />;
        }}
      />
    </Spin>
  );
}
