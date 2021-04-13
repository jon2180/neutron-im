import React, { useEffect } from /* , useMemo, useState */ "react";
import { Link } from "react-router-dom";
import {
  /*  Input, */ List,
  Avatar /* , Collapse, Badge, Popover, Button */,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchFriendList,
  selectFriendList,
  // setFriendList,
} from "@/store/friendsSlice";
// import { RootState, UserInfoSubstate } from "@/types/state";
// import { friendList as staticFriendList } from "@/datasources/friends";
// import {
//   getFriendsRequests,
//   postAddFriendRequest,
//   searchAccount,
// } from "@/services/friend";
// import { UserAddOutlined } from "@ant-design/icons";
import { FriendData } from "@/types/http";

export function FriendItem(props: { data: FriendData }) {
  const { data } = props;
  return (
    <Link
      to={`/im/friends/${data.id}`}
      style={{
        display: "block",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "64px",
          padding: "8px",
          boxSizing: "border-box",
          display: "flex",
        }}
      >
        <div>
          <Avatar size={48} src={data.avatar}></Avatar>
        </div>
        <div
          style={{
            marginLeft: "8px",
            lineHeight: "48px",
            fontSize: "18px",
            color: "#333",
          }}
        >
          {data.remark_name ? data.remark_name : data.nickname}
        </div>
      </div>
    </Link>
  );
}


/* 
export function FriendRequestList() {
  const [requests, setRequests] = useState([] as RequestType);
  // TODO　初始化加载数据　异步
  useMemo(() => {
    getFriendsRequests()
      .then((res) => {
        if (res.status === 20000) {
          setRequests(res.data as RequestType);
        } else {
          console.log(res);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <Collapse defaultActiveKey={["1"]} bordered={false}>
      <Collapse.Panel
        header="好友申请"
        key="1"
        extra={
          <Badge count={requests && requests.length ? requests.length : 0} />
        }
      >
        <List
          itemLayout="horizontal"
          dataSource={requests}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "0px",
              }}
            >
              <FriendItem data={item} />
            </List.Item>
          )}
        />
      </Collapse.Panel>
    </Collapse>
  );
} */

export function FriendsSider() {
  const dispatch = useDispatch();
  const friendList = useSelector(selectFriendList);

  useEffect(() => {
    dispatch(fetchFriendList());
    // dispatch(setFriendList(staticFriendList));
  }, [dispatch]);

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={friendList}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: "0px",
            }}
          >
            <FriendItem data={item} />
            {/* <Link
              to={`/im/friends/${item.account_id}`}
              style={{
                display: "block",
                width: "100%",
              }}
            >
            </Link> */}
          </List.Item>
        )}
      />
    </div>
  );
}
