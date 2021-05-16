import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Comment, Input, List, message, Skeleton } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import styles from "./Activity.module.less";
import MdRenderer from "@/components/MdRenderer";
import WideContentWrapper from "@/components/WideContentWrapper";
import { momentService } from "@/services";
import { createSemaphore } from "@/utils/wrapper";
import { useParams } from "react-router";
import type { IActivity } from "@/types/state";
import { formatTimestamp } from "@/utils/format";

export interface ContentSectionParams {
  routerParams: ContentRouterParams;
}
const loadingStatus = createSemaphore();
const NOTICE_KEY = "NOTICE_KEY";

function ContentSection({ routerParams }: ContentSectionParams) {
  const [activityInfo, setActivityInfo] = useState<IActivity>({
    author_id: "",
    content: "",
    content_type: 0,
    copyright: "",
    create_time: Date.now(),
    id: "",
    is_original: 0,
    status: 0,
    title: "",
    update_time: null,
    version: "",
  });
  const [loaded, setLoaded] = useState(false);

  const fetchContentInfo = useCallback(
    async function fetchContentInfo() {
      if (loadingStatus.loading === "pending") return;

      loadingStatus.loading = "pending";
      setLoaded(false);
      const resp = await momentService.getActivity({ id: routerParams.id });
      setLoaded(true);
      loadingStatus.loading = "idle";

      if (resp.status !== 20000 || !resp.data) {
        message.warn(
          {
            key: NOTICE_KEY,
            content: "获取动态失败",
          },
          200
        );
        return;
      }
      setActivityInfo(resp.data as IActivity);
    },
    [routerParams]
  );

  useEffect(() => {
    fetchContentInfo();
  }, [fetchContentInfo]);

  return (
    <Card
      actions={[
        <Button type="text">点赞</Button>,
        <Button type="text">点踩</Button>,
        <Button type="text">分享</Button>,
        <Button type="text">举报</Button>,
      ]}
    >
      <Skeleton loading={!loaded}>
        <div className={styles.metaInfoBox}>
          <Avatar size={56} />
          <div className={styles.detail}>
            <div className={styles.detail_nickname}>nickname</div>
            <div className={styles.aboutActivity}>
              <div>{formatTimestamp(activityInfo.create_time)} </div>
              <div>
                <span>
                  {/* 原创  */}
                  {activityInfo.is_original ? "原创" : "转载"}
                </span>
              </div>
              {/* <div>
                版权信息
                {activityInfo.copyright}
              </div> */}
              {/* <div>
                <span>{59}</span> 阅读
              </div>
              <div>
                <span>{111}</span> 字数
              </div>
              <div>
                <span>{3}</span> 点赞
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className={styles.tags}>
          <span className={styles.tagsTitle}>文章标签：</span>
          <span>分享</span>
          <span>心情</span>
          <span>hello</span>
          <span className={styles.tagsTitle}>文章分类：</span>
          <span>分享</span>
          <span>心情</span>
          <span>hello</span>
        </div> */}
        {activityInfo.is_original ? (
          <span />
        ) : (
          <div className={styles.originalInfo}>
            原文信息:&nbsp;
            <a href={activityInfo.copyright}>原文链接</a>
          </div>
        )}

        <MdRenderer>{activityInfo.content}</MdRenderer>
      </Skeleton>
    </Card>
  );
}

export interface CommentInfo {
  actions: JSX.Element[];
  author: string;
  avatar: string;
  content: JSX.Element;
}

const WARN_NOTICE_KEY = "WARN_NOTICE_KEY";

export interface CommentsSectionParams {
  routerParams: ContentRouterParams;
}

const commentsLoadingStatus = createSemaphore();

function CommentSection({ routerParams }: CommentsSectionParams) {
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchComments = useCallback(
    async function fetchComents() {
      if (commentsLoadingStatus.loading === "pending") return;

      setLoaded(false);
      loadingStatus.loading = "pending";
      const resp = await momentService.getActivityComments({
        id: routerParams.id,
      });
      loadingStatus.loading = "idle";
      setLoaded(true);

      if (resp.status !== 20000 || !resp.data) {
        message.warn({
          key: WARN_NOTICE_KEY,
          content: "获取评论信息失败",
        });
        return;
      }
      setComments(resp.data as CommentInfo[]);
      // FIXME
    },
    [routerParams]
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <Card className={styles.comments}>
      <Skeleton loading={!loaded}></Skeleton>
      <div>
        <Input.TextArea />
        <Button.Group className={styles.commentButtons}>
          <Button type="primary">提交</Button>
        </Button.Group>
      </div>
      <List
        className="comment-list"
        header={`${comments.length} replies`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item) => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              // datetime={item.datetime}
            />
          </li>
        )}
      />
    </Card>
  );
}

export interface ContentRouterParams {
  id: string;
}
export default function Activity() {
  const params = useParams<ContentRouterParams>();
  return (
    <WideContentWrapper>
      <ContentSection routerParams={params} />
      <CommentSection routerParams={params} />
    </WideContentWrapper>
  );
}
