import { postAddFriendRequest, searchAccount } from "@/services/friend";
import { UserInfoSubstate } from "@/types/state";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Input, List, Tabs } from "antd";
import React, { useCallback, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./Search.module.less";

export default withRouter(function SearchBox(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [result, setResult] = useState([] as UserInfoSubstate[]);

  const onSearch = useCallback(
    (val: string) => {
      console.log(val);
      if (searchKeyword && searchKeyword !== "") {
        searchAccount({ keyword: searchKeyword, type: "all" })
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
    [searchKeyword]
  );

  const requestAddFriend = (id: string) => {
    postAddFriendRequest({ id, reason: "测试" })
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  };

  return (
    <Card className={styles.searchCard} title="搜索结果">
      <Input.Search
        className={styles.searchBox}
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
                          {searchKeyword === value.email ? value.email : ""}
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
  );
});
