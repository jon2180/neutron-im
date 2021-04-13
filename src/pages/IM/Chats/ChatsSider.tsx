import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { List, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { ChatData } from "@/types/http";
import { fetchRecentChats, selectAllChats } from "@/store/recentChatsSlice";
import { formatTimestamp } from "@/utils/format";
import styles from "./Chats.module.less";

export function RecentChatItem(props: { data: ChatData }) {
  const { data } = props;
  return (
    <Link
      to={`/im/chats/${data.id}`}
      style={{
        display: "block",
        width: "100%",
      }}
    >
      <div className={styles.itemBox}>
        <div className={styles.avatarBox}>
          <Avatar size={48} src={data.avatar} />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.nameAndTimeBox}>
            <div className={styles.name}>{data.account_name}</div>
            <div className={styles.time}>
              {formatTimestamp(data.last_msg_time)}
            </div>
          </div>
          <div className={styles.contentAndUnreadBox}>
            <div className={styles.content}>{data.last_msg_content}</div>
            {data.unread_count === 0 ? (
              <div></div>
            ) : (
              <div className={styles.unread}>{data.unread_count}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

/**
 * 聊天界面中的侧边栏
 */
export default function ChatsSider() {
  const dispatch = useDispatch();
  // TODO
  const recentChats = useSelector(selectAllChats);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchRecentChats());
  }, [dispatch]);

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={recentChats}
        renderItem={(item) => (
          <List.Item
            style={{
              width: "100%",
              padding: "4px",
              boxSizing: "border-box",
              backgroundColor:
                params.id && params.id === item.id ? "#c5c5c5" : "#eae8e7",
            }}
          >
            <RecentChatItem data={item} />
          </List.Item>
        )}
      />
    </div>
  );
}
