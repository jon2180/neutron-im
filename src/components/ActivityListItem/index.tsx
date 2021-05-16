import React from "react";
import { List, Space } from "antd";
import styles from "./index.module.less";
import { Link } from "react-router-dom";
// import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
// import { GoThumbsup, GoThumbsdown } from "react-icons/go";
// import WideContentWrapper from "@/components/WideContentWrapper/WideContentWrapper";
// import { momentService } from "@/services";
// import { createSemaphore } from "@/utils/wrapper";

import type { IActivity } from "@/types/state";
import { formatTimestamp } from "@/utils/format";
import MdRenderer from "@/components/MdRenderer";

export const IconText = ({ icon, text }: { icon: any; text: any }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

/**
 * 构造一个由 List.Item 包裹的 Activity 组件
 * @param item ActivityInfo
 * @param index Index 参数
 * @returns 返回一个 List.Item 包裹的组件
 */
export default function ActivityListItem(item: IActivity, index: number) {
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
