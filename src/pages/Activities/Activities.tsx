import {
  Button,
  Card,
  Comment,
  Input,
  /*  Dropdown, Layout,  */ List,
  /* Menu,  */ Tooltip,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { ActivityContent } from "./Activity";
import styles from "./Activities.module.less";
import React, { useState } from "react";
import moment from "moment";
// import AppFrame from "@/components/layout/AppFrame";
import DefaultFrame from "@/components/layout/AppFrame";

const data = [
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

export default function Activities() {
  // const activityData =
  // const [activityData, setActivityData] = useState({});

  return (
    // <DefaultFrame>
    <div className={styles.content}>
      <Card>Hello Activities</Card>
    </div>
    // </DefaultFrame>
  );
}
