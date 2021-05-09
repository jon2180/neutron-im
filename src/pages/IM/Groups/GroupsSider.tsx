import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  // Input,
  List,
  //  Avatar
} from "antd";
import { group } from "@/services";
// import { useAppDispatch } from "@/store/store";
// import { fetchFriendList } from "@/store/friendsSlice";

export default function GroupsSider() {
  // const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(fetch);

    group.postGroups().then(console.log).catch(console.error);
  }, []);

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={[]}
        renderItem={(item, index) => (
          <List.Item>
            <Link
              to={`/im/groups/`}
              style={{
                display: "block",
                width: "100%",
              }}
            >
              <div>Friend {index}</div>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}
