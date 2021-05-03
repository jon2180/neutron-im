import React from "react";
import { Card, /* Menu,  */ Tooltip, List, Space, Button } from "antd";
import styles from "./Activities.module.less";
import moment from "moment";
import { Link } from "react-router-dom";
import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";
import WideContentWrapper from "@/components/WideContentWrapper/WideContentWrapper";

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

export const IconText = ({ icon, text }: { icon: any; text: any }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const handleThumbsUp: React.MouseEventHandler<HTMLElement> = (e) => {
  e.stopPropagation();
  e.preventDefault();

  console.log(e);
};

const handleThumbsDown: React.MouseEventHandler<HTMLElement> = (e) => {
  e.stopPropagation();
  e.preventDefault();

  console.log(e);
};

const handleShare: React.MouseEventHandler<HTMLElement> = (e) => {
  e.stopPropagation();
  e.preventDefault();

  console.log(e);
};
const handleComments: React.MouseEventHandler<HTMLElement> = (e) => {
  e.stopPropagation();
  e.preventDefault();
  console.log(e);
};

function renderItem(item: IActivity, index: number) {
  return (
    <List.Item className={styles.activityLi}>
      <div className={styles.metaRow}>
        <div className={styles.meta}>
          <Link to={"/accounts"} className={styles.nickname}>
            {item.author}
          </Link>
          <span title="2021" className={styles.time}>
            {item.datetime}
          </span>
        </div>
        <div>
          <a href={`/tags/tag`} className={styles.activityTag}>
            tag1
          </a>
          <a href={`/tags/tag`} className={styles.activityTag}>
            tag2
          </a>
        </div>
      </div>
      <Link to={`/activities/123456`} className={styles.mainLink}>
        <div className={styles.contentRow}>
          <div>
            <h2
              className={styles.activityTitle}
            >{`We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently`}</h2>
            <div>{item.content}</div>
            <div>
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
            </div>
          </div>

          <img
            className={styles.activityCover}
            src="https://wx1.sinaimg.cn/mw2000/67a52ad2gy1gq4ebkwdtfj20zo0gutf6.jpg"
            alt="pic"
          />
        </div>
      </Link>
    </List.Item>
  );
}

export default function Activities() {
  return (
    <div className={styles.content}>
      <WideContentWrapper>
        <Card title="Activities">
          <List dataSource={data} renderItem={renderItem}></List>
        </Card>
      </WideContentWrapper>
    </div>
  );
}
