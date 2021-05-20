import React, { useCallback, useState } from "react";
import WideContentWrapper from "@/components/WideContentWrapper";
import { postAddFriendRequest, searchAccount } from "@/services/friend";
import { UserInfoSubstate } from "@/types/state";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Input,
  List,
  message,
  PageHeader,
  Popconfirm,
  Tabs,
} from "antd";
import { Link, withRouter } from "react-router-dom";
import styles from "./Search.module.less";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/userInfoSlice";
import { useGetParams } from "@/utils/hooks";

function SearchHeader(props: { updateResult: (params: any) => void }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const query = useGetParams({ tab: "accounts", kw: "" });
  const tabs = [
    { key: "accounts", tab: "Accounts" },
    { key: "activities", tab: "Activities" },
  ];
  const routes = [
    {
      path: "/search",
      breadcrumbName: "First-level Menu",
    },
    {
      path: "first",
      breadcrumbName: "Second-level Menu",
    },
    // {
    //   path: "second",
    //   breadcrumbName: "Third-level Menu",
    // },
  ];

  const onSearch = () => {
    props.updateResult({
      keyword: searchKeyword,
      type:
        tabs.map((val) => val.key).indexOf(query.tab) === -1
          ? "accounts"
          : query.tab,
    });
  };

  return (
    <PageHeader
      className="site-page-header"
      title="搜索"
      // breadcrumb={{ routes }}
      subTitle={
        tabs.find((val) => {
          return val.key === query.tab;
        })?.tab
      }
      style={{ backgroundColor: "#ffffff" }}
      footer={
        <Tabs defaultActiveKey={query.tab}>
          <Tabs.TabPane tab="用户" key="accounts" />
          <Tabs.TabPane tab="动态" key="activities" />
        </Tabs>
      }
    >
      <div className={styles.searchBox}>
        <Input.Search
          className={styles.searchInput}
          value={searchKeyword}
          size="middle"
          enterButton={
            <Button type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
          }
          onChange={(e) => setSearchKeyword(e.target.value)}
          onSearch={onSearch}
        />
      </div>
    </PageHeader>
  );
}

function SearchResultCard({
  result,
  ...props
}: {
  result: UserInfoSubstate[];
}) {
  const userInfo = useSelector(selectUserInfo);
  const requestAddFriend = (id: string) => {
    postAddFriendRequest({ id, reason: "测试" })
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  };

  return (
    <WideContentWrapper>
      <Card
        className={[styles.searchCard, "without-padding-card"].join(" ")}
        title="搜索结果"
      >
        <div>
          {result && result.length ? (
            <List>
              {result.map((value, index) => {
                return (
                  <List.Item key={`popli${index}`} className={styles.list}>
                    <Link
                      to={`/accounts/${value.id}`}
                      target="_blank"
                      title="点击查看用户详情"
                      className={styles.name}
                    >
                      <Avatar
                        src={
                          value.avatar ||
                          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        }
                        size={36}
                        className={styles.avatar}
                      />
                      {/* <Link
                        to={`/accounts/${value.id}`}
                        target="_blank"
                        title="点击查看用户详情"
                      > */}
                      <div>
                        {value.nickname}
                        {userInfo.id === value.id ? "(myself)" : ""}
                      </div>
                      {/* </Link> */}
                    </Link>
                    {userInfo.id !== value.id ? (
                      <Popconfirm
                        title="Are you sure？"
                        okText="Yes"
                        cancelText="No"
                        placement="leftTop"
                        onConfirm={() => {
                          requestAddFriend(value.id);
                        }}
                        // onCancel={() => {

                        // }}
                      >
                        <UserAddOutlined />
                        {/* <Button
                        type="text"
                        icon={<UserAddOutlined />}
                        // onClick={() => {
                        //   requestAddFriend(value.id);
                        // }}
                        title="添加好友"
                      ></Button> */}
                      </Popconfirm>
                    ) : (
                      <span>myself</span>
                    )}
                  </List.Item>
                );
              })}
            </List>
          ) : (
            <></>
          )}
        </div>
      </Card>
    </WideContentWrapper>
  );
}

export default withRouter(function SearchBox(props) {
  const [result, setResult] = useState([] as UserInfoSubstate[]);

  const onSearch = useCallback(
    ({ keyword, type }: { keyword: string; type: string }) => {
      console.log(keyword);
      if (keyword && keyword !== "") {
        searchAccount({ keyword: keyword, type: "all" })
          .then((res) => {
            console.log(res);
            if (res.status === 20000 && res.data && Array.isArray(res.data)) {
              setResult(res.data);
            } else {
              console.log("搜索失败");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    []
  );

  return (
    <>
      <SearchHeader updateResult={onSearch} />
      <SearchResultCard result={result} />
    </>
  );
});
