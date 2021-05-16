import React, { useCallback, useEffect, useState } from "react";
import { Card, List, Space, Skeleton, message } from "antd";
import styles from "./Activities.module.less";
import { Link } from "react-router-dom";
// import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
// import { GoThumbsup, GoThumbsdown } from "react-icons/go";
import WideContentWrapper from "@/components/WideContentWrapper/WideContentWrapper";
import { momentService } from "@/services";
import { createSemaphore } from "@/utils/wrapper";

import type { IActivity } from "@/types/state";
import { formatTimestamp } from "@/utils/format";
import MdRenderer from "@/components/MdRenderer";

export const IconText = ({ icon, text }: { icon: any; text: any }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

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

function renderItem(item: IActivity, index: number) {
  return (
    <List.Item className={styles.activityLi}>
      <div className={styles.metaRow}>
        <div className={styles.meta}>
          <Link to={`/accounts/${item.author_id}`} className={styles.nickname}>
            {item.author_id}
          </Link>
          <span title="2021" className={styles.time}>
            {formatTimestamp(item.create_time)}
          </span>
        </div>
        <div>
          {/* <a href={`/tags/tag`} className={styles.activityTag}>
            tag1
          </a>
          <a href={`/tags/tag`} className={styles.activityTag}>
            tag2
          </a> */}
        </div>
      </div>
      <Link to={`/activities/${item.id}`} className={styles.mainLink}>
        <div className={styles.contentRow}>
          <div>
            <h2 className={styles.activityTitle}>{item.title}</h2>
            <div className={styles.content}>
              <MdRenderer withoutStyle>
                {item.content.split("\n").splice(0, 3).join("\n")}
              </MdRenderer>
            </div>
            {/* <div>
              <Button.Group className={styles.btnGroup}>
                <Button
                  type="text"
                  icon={<GoThumbsup />}
                  onClick={handleThumbsUp}
                >
                  248
                </Button>
                <Button
                  type="text"
                  icon={<GoThumbsdown />}
                  onClick={handleThumbsDown}
                >
                  48
                </Button>
                <Button
                  type="text"
                  icon={<AiOutlineComment />}
                  onClick={handleComments}
                >
                  48
                </Button>
                <Button
                  type="text"
                  icon={<AiOutlineShareAlt />}
                  onClick={handleShare}
                >
                  48
                </Button>
              </Button.Group>
            </div> */}
          </div>

          {/* <img
            className={styles.activityCover}
            src="https://wx1.sinaimg.cn/mw2000/67a52ad2gy1gq4ebkwdtfj20zo0gutf6.jpg"
            alt="pic"
          /> */}
        </div>
      </Link>
    </List.Item>
  );
}

const WARN_NOTICE_KEY = "WARN_NOTICE_KEY";
const loadingStatus = createSemaphore();

export default function Activities() {
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
    <div className={styles.content}>
      <WideContentWrapper>
        <Card title="Activities">
          <Skeleton loading={!loaded}>
            <List dataSource={activities} renderItem={renderItem}></List>
          </Skeleton>
        </Card>
      </WideContentWrapper>
    </div>
  );
}
