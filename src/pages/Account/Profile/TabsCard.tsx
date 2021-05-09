import React, { useState } from "react";

import { Card, Space, List, Avatar } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

const IconText = ({ icon, text }: { icon: any; text: any }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const tabListNoTitle = [
  {
    key: "article",
    tab: "Article",
  },
  {
    key: "app",
    tab: "App",
  },
  {
    key: "project",
    tab: "Project",
  },
];

const contentListNoTitle: { [propName: string]: JSX.Element } = {
  article: (
    <>
      <div className="site-layout-background">
        ...
        <br />
        Really
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        long
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        content
      </div>
    </>
  ),
  app: (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={listData}
      footer={
        <div>
          <b>ant design</b> footer part
        </div>
      }
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  ),
  project: <p>project content</p>,
};

export default function TabsCard({ id }: { id: string }) {
  const [state, setState] = useState({
    key: "tab1",
    noTitleKey: "article",
  } as { [x: string]: string });

  const onTabChange = (key: string, type: string) => {
    console.log(key, type);
    setState({ [type]: key });
  };
  return (
    <>
      <Card
        tabList={tabListNoTitle}
        activeTabKey={state.noTitleKey}
        tabBarExtraContent={<a href="#1">More</a>}
        onTabChange={(key) => {
          onTabChange(key, "noTitleKey");
        }}
      >
        {contentListNoTitle[state.noTitleKey]}
      </Card>
    </>
  );
}
