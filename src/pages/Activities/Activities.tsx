import React from "react";
import { Card, /* Menu,  */ Tooltip, List } from "antd";
import styles from "./Activities.module.less";
import moment from "moment";

interface IActivity {
  actions: JSX.Element[];
  author: string;
  avatar: string;
  content: JSX.Element;
  datetime: JSX.Element;
}

const data: IActivity[] = [
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

function renderItem(item: IActivity, index: number) {
  return (
    <List.Item>
      <div>{item.content}</div>
      <div>{item.datetime}</div>
      <div>{item.author}</div>
    </List.Item>
  );
}

export default function Activities() {
  return (
    <div className={styles.content}>
      <Card title="Hello Activities">
        <List dataSource={data} renderItem={renderItem}></List>
      </Card>
    </div>
  );
}
