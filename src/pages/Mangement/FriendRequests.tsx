import React, { useCallback, useEffect, useState } from "react";
import { Avatar, List, message, Popconfirm } from "antd";

import styles from "./FriendRequests.module.less";
import { createSemaphore } from "@/utils/wrapper";
import { friendService } from "@/services";
import { UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/store/userInfoSlice";

export interface FriendRequest {
  id: string;
  initiator_id: string;
  target_id: string;
  type: number;
  submit_reason: string;
  submit_time: number;
  solved_result: number;
  solved_reason: string;
  solved_time: number | null;
  extra: any;
}

const loadingStatus = createSemaphore();
const confirmOrReject = createSemaphore();

export default function FriendsRequest() {
  const userInfo = useSelector(selectUserInfo);
  const [list, setList] = useState<FriendRequest[]>([]);
  const [handledList, setHandledList] = useState<FriendRequest[]>([]);

  const loadList = useCallback(async function loadList() {
    if (loadingStatus.loading === "pending") return;

    loadingStatus.loading = "pending";
    const res = await friendService.getFriendsRequests();
    loadingStatus.loading = "idle";

    if (!res || res.status !== 20000) {
      message.warn("获取数据失败");
      return;
    }

    if (!res.data || !Array.isArray(res.data)) {
      message.info("无数据");
      return;
    }
    // res.data.filter((val) => (val.type === 0 && val.solved_result === 0))
    setList(
      res.data.filter((val) => val.type === 0 && val.solved_result === 0)
    );
    setHandledList(
      res.data.filter((val) => !(val.type === 0 && val.solved_result === 0))
    );
  }, []);

  useEffect(() => {
    loadList();
  }, [loadList]);

  async function onConfirm(requestId: string, accept: boolean) {
    if (confirmOrReject.loading === "pending") return;

    confirmOrReject.loading = "pending";
    const resp = await friendService.putAddFriendConfirm({
      id: requestId,
      type: accept ? "accept" : "reject",
      reason: "Nice to meet you",
    });
    confirmOrReject.loading = "idle";

    if (!resp || resp.status !== 20000) {
      message.warn("添加失败");
      return;
    }

    message.info("添加成功");
  }

  return (
    <div className={styles.container}>
      <List
        dataSource={list}
        renderItem={(item, i) => {
          console.log(item);
          return (
            <List.Item key={item.id} className={styles.list}>
              <Link
                to={`/accounts/${item.initiator_id}`}
                target="_blank"
                title="点击查看用户详情"
                className={styles.name}
              >
                <Avatar
                  src={
                    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  }
                  size={36}
                  className={styles.avatar}
                />
                <div>
                  {item.id}
                  {userInfo.id === item.id ? "(myself)" : ""}
                </div>
              </Link>
              {userInfo.id !== item.id ? (
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  placement="leftTop"
                  onConfirm={() => {
                    onConfirm(item.id, true);
                  }}
                  onCancel={() => {
                    onConfirm(item.id, false);
                  }}
                >
                  <UserAddOutlined />
                </Popconfirm>
              ) : (
                <span>myself</span>
              )}
            </List.Item>
          );
        }}
      ></List>

      {handledList && handledList.length ? (
        <List
          header={<>已处理</>}
          dataSource={handledList}
          renderItem={(item, i) => {
            console.log(item);
            return (
              <List.Item key={item.id} className={styles.list}>
                <Link
                  to={`/accounts/${item.initiator_id}`}
                  target="_blank"
                  title="点击查看用户详情"
                  className={styles.name}
                >
                  <Avatar
                    src={
                      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    }
                    size={36}
                    className={styles.avatar}
                  />
                  <div>
                    {item.id}
                    {userInfo.id === item.id ? "(myself)" : ""}
                  </div>
                </Link>
                {/* {userInfo.id !== item.id ? (
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    placement="leftTop"
                    onConfirm={() => {
                      onConfirm(item.id, true);
                    }}
                    onCancel={() => {
                      onConfirm(item.id, false);
                    }}
                  >
                    <UserAddOutlined />
                  </Popconfirm>
                ) : (
                  <span>myself</span>
                )} */}
                <span />
              </List.Item>
            );
          }}
        ></List>
      ) : (
        <></>
      )}
    </div>
  );
}
