import React, { useCallback } from "react";
import { Button, List } from "antd";
import { Link } from "react-router-dom";
import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";

import type { IActivity } from "@/types/state";
import { formatTimestamp } from "@/utils/format";
import MdRenderer from "@/components/MdRenderer";

import styles from "./index.module.less";

function isFunc(param: any) {
  return typeof param === "function";
}

type ActivityHandlerFunc = (data: IActivity, index: number) => void;

/**
 * 构造一个由 List.Item 包裹的 Activity 组件
 * @param item ActivityInfo
 * @param index Index 参数
 * @returns 返回一个 List.Item 包裹的组件
 */
export default function ActivityLI({
  item,
  index,
  ...restProps
}: {
  item: IActivity;
  index: number;
  handleThumbsUp?: ActivityHandlerFunc;
  handleThumbsDown?: ActivityHandlerFunc;
  handleComments?: ActivityHandlerFunc;
  handleShare?: ActivityHandlerFunc;
}) {
  const eventHandler = useCallback(
    (func: ActivityHandlerFunc) => {
      return (() => {
        func(item, index);
      }) as React.MouseEventHandler<HTMLElement>;
    },
    [item, index]
  );
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
          {item.tags && Array.isArray(item.tags) ? (
            item.tags.map(() => {
              return (
                <a href={`/tags/tag`} className={styles.activityTag}>
                  tag1
                </a>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles.contentRow}>
        <div>
          <h2 className={styles.activityTitle}>{item.title}</h2>
          <div className={styles.content}>
            <MdRenderer withoutStyle>
              {item.content.split("\n").splice(0, 3).join("\n")}
            </MdRenderer>
          </div>
          <div>
            <Button.Group className={styles.btnGroup}>
              {restProps.handleThumbsUp && isFunc(restProps.handleThumbsUp) && (
                <Button
                  type="text"
                  icon={<GoThumbsup />}
                  onClick={eventHandler(restProps.handleThumbsUp)}
                >
                  248
                </Button>
              )}
              {restProps.handleThumbsDown &&
                isFunc(restProps.handleThumbsDown) && (
                  <Button
                    type="text"
                    icon={<GoThumbsdown />}
                    onClick={eventHandler(restProps.handleThumbsDown)}
                  >
                    48
                  </Button>
                )}
              {restProps.handleComments && isFunc(restProps.handleComments) && (
                <Button
                  type="text"
                  icon={<AiOutlineComment />}
                  onClick={eventHandler(restProps.handleComments)}
                >
                  48
                </Button>
              )}
              {restProps.handleShare && isFunc(restProps.handleShare) && (
                <Button
                  type="text"
                  icon={<AiOutlineShareAlt />}
                  onClick={eventHandler(restProps.handleShare)}
                >
                  48
                </Button>
              )}
            </Button.Group>
          </div>
        </div>

        {item.cover_img ? (
          <img
            className={styles.activityCover}
            src="https://wx1.sinaimg.cn/mw2000/67a52ad2gy1gq4ebkwdtfj20zo0gutf6.jpg"
            alt="pic"
          />
        ) : (
          <div></div>
        )}
      </div>
    </List.Item>
  );
}
