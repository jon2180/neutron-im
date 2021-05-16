import React, { useCallback, useState } from "react";
import WideContentWrapper from "@/components/WideContentWrapper";
import { postAddFriendRequest, searchAccount } from "@/services/friend";
import { UserInfoSubstate } from "@/types/state";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Input, List, PageHeader, Tabs } from "antd";
import { Link, withRouter } from "react-router-dom";
import styles from "./Search.module.less";

const routes = [
  {
    path: "index",
    breadcrumbName: "First-level Menu",
  },
  {
    path: "first",
    breadcrumbName: "Second-level Menu",
  },
  {
    path: "second",
    breadcrumbName: "Third-level Menu",
  },
];

function SearchHeader(props: { updateResult: (params: any) => void }) {
  const [searchKeyword, setSearchKeyword] = useState("");

  const onSearch = useCallback(
    (val: string) => {
      console.log(val);
      if (searchKeyword && searchKeyword !== "") {
        searchAccount({ keyword: searchKeyword, type: "all" })
          .then((res) => {
            console.log(res);
            if (res.status === 20000 && res.data && Array.isArray(res.data)) {
              props.updateResult(res.data);
            } else {
              console.log("搜索失败");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    [searchKeyword, props]
  );
  return (
    <PageHeader
      className="site-page-header"
      title="搜索"
      breadcrumb={{ routes }}
      subTitle="文章"
      style={{ backgroundColor: "#ffffff" }}
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
  const requestAddFriend = (id: string) => {
    postAddFriendRequest({ id, reason: "测试" })
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  };

  return (
    <WideContentWrapper>
      <Card className={styles.searchCard} title="搜索结果">
        <Tabs>
          <Tabs.TabPane tab="用户" key="1">
            <div>
              {result && result.length ? (
                <List bordered>
                  {result.map((value, index) => {
                    return (
                      <List.Item key={`popli${index}`} className={styles.list}>
                        <div>
                          <Avatar
                            src={
                              value.avatar ||
                              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            }
                            size={36}
                            className={styles.avatar}
                          />
                          <Link to={`/accounts/${value.id}`} target="_blank">
                            {value.nickname}
                          </Link>
                        </div>
                        <Button
                          type="text"
                          icon={<UserAddOutlined />}
                          onClick={() => {
                            requestAddFriend(value.id);
                          }}
                        ></Button>
                      </List.Item>
                    );
                  })}
                </List>
              ) : (
                <span />
              )}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="动态" key="2">
            <div>动态</div>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </WideContentWrapper>
  );
}

export default withRouter(function SearchBox(props) {
  const [result, setResult] = useState([] as UserInfoSubstate[]);
  return (
    <>
      <SearchHeader updateResult={setResult} />
      <SearchResultCard result={result} />
    </>
  );
});
