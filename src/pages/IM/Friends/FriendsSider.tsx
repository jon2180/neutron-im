import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { List, Avatar } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { fetchFriendList, selectFriendList } from "@/store/friendsSlice";

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

export function FriendsSider() {
  const dispatch = useDispatch();
  const friendList = useSelector(selectFriendList);

  useEffect(() => {
    dispatch(fetchFriendList());
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
          </List.Item>
        )}
      />
    </div>
  );
}
