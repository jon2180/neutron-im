import React from "react";
import {
  Link,
  // useParams
} from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import {
  // Input,
  List,
  //  Avatar
} from "antd";
// import { useAppDispatch } from "@/store/store";
// import { fetchFriendList } from "@/store/friendsSlice";

export function GroupsSider() {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetch);
  // }, []);

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
