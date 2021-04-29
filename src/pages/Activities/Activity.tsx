import React from "react";
import { Button, Card, Comment, Input, List, Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import styles from "./Activities.module.less";
import moment from "moment";
import MdRenderer from "@/components/MdRenderer";

const markdownStr = `
# C语言进程与线程

## 基本区别

学过操作系统这一门课的会知道这样一个知识点。

> 进程是操作系统资源分配的基本单位，线程是操作系统进行 CPU 调度的基本单位。

关系：

> 进程  对 线程： 一对多的关系。

进程在《操作系统》中的定义是“运行中的程序，以及它的上下文”。也就是说一个进程包含有：

1. 可运行的程序

2. 运行上下文环境

而线程则不同，线程是进程中的一个代码执行路径。

fork() 函数复制的是进程，pthread_create() 函数是创建一个线程`;

const comments = [
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(1, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: "Han Solo",
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(2, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
];

function ContentSection() {
  return (
    <Card
      actions={[
        <Button type="text">点赞</Button>,
        <Button type="text">点踩</Button>,
        <Button type="text">分享</Button>,
        <Button type="text">举报</Button>,
      ]}
    >
      <div className={styles.metaInfoBox}>
        <Avatar size={56} />
        <div className={styles.detail}>
          <div className={styles.detail_nickname}>nickname</div>
          <div className={styles.aboutActivity}>
            <div>time </div>
            <div>
              <span>原创 MIT</span>
            </div>
            <div>版权信息</div>
            <div>
              <span>{59}</span> 阅读
            </div>
            <div>
              <span>{111}</span> 字数
            </div>
            <div>
              <span>{3}</span> 点赞
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tags}>
        <span className={styles.tagsTitle}>文章标签：</span>
        <span>分享</span>
        <span>心情</span>
        <span>hello</span>
        <span className={styles.tagsTitle}>文章分类：</span>
        <span>分享</span>
        <span>心情</span>
        <span>hello</span>
      </div>

      <div className={styles.originalInfo}>原创信息</div>
      <MdRenderer>{markdownStr}</MdRenderer>
    </Card>
  );
}

function CommentSection() {
  return (
    <Card className={styles.comments}>
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
              datetime={item.datetime}
            />
          </li>
        )}
      />
    </Card>
  );
}

export default function Activity() {
  return (
    <div className={styles.content}>
      <ContentSection />
      <CommentSection />
    </div>
  );
}
