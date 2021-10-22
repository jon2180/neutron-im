import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Form, Input, List, message } from 'antd';

import { createSemaphore } from '@/utils/wrapper';
import { friendService } from '@/services';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@/store/userInfoSlice';

import styles from './Requests.module.less';
import { UserAddOutlined } from '@ant-design/icons';
import { useSafeState } from 'ahooks';

export interface FriendRequest {
  id: string;
  account_id: string;
  type: number;
  submit_reason: string;
  submit_time: number;
  solved_result: number;
  solved_reason: string;
  solved_time: number | null;
  extra: string;
  avatar: string;
  nickname: string;
}

const loadingStatus = createSemaphore();
const confirmOrReject = createSemaphore();

interface RequestComponentProps {
  request: FriendRequest;
  isSentByMyself?: boolean;
  onClickAdd: (request: FriendRequest) => void;
}

function translateResult(result: number) {
  let msg;
  switch (result) {
    case 0:
      msg = '未处理';
      break;
    case 1:
      msg = '已同意';
      break;
    case 2:
      msg = '已拒绝';
      break;
    default:
      msg = '未适配状态';
  }
  return msg;
}

function RequestComponent(props: RequestComponentProps): JSX.Element {
  const { request, isSentByMyself: isMyself = false, onClickAdd } = props;
  return (
    <div className={styles.requestMain}>
      <div className={styles.left}>
        <Link
          to={`/friends/${request.account_id}`}
          title="点击查看用户详情"
          className={styles.name}
        >
          <Avatar
            src={
              request.avatar ||
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            }
            size={36}
            className={styles.avatar}
          />
          <div>{request.nickname || request.id}</div>
        </Link>
      </div>
      <div>
        {request.solved_result !== 0 ? (
          <>{translateResult(request.solved_result)}</>
        ) : (
          <>
            {isMyself ? (
              <div>待对方确认</div>
            ) : (
              <Button
                icon={<UserAddOutlined />}
                onClick={() => {
                  onClickAdd(request);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface HandleRequestProps {
  request: FriendRequest;
}

function HandleRequestComponent(props: HandleRequestProps): JSX.Element {
  const { request } = props;
  const [reply, setReply] = useSafeState('');
  return (
    <div>
      <RequestComponent request={request} onClickAdd={() => {}} />
      <Form>
        <Form.Item>
          <Input.TextArea placeholder="确认留言" />
        </Form.Item>
      </Form>
    </div>
  );
}

export interface RequestsProps {
  type: number;
  status: string;
}

/**
 * 获取 requests
 * @returns 获取到的数据
 */
function useGetRequests() {
  const [list, setList] = useSafeState<FriendRequest[]>();

  const loadList = useCallback(async function loadList() {
    if (loadingStatus.loading === 'pending') return;

    loadingStatus.loading = 'pending';
    const res = await friendService.getMyFriendRequests();
    loadingStatus.loading = 'idle';

    if (!res || res.status !== 20000) {
      message.warn('获取数据失败');
      return;
    }

    if (!res.data || !Array.isArray(res.data)) {
      message.info('无数据');
      return;
    }
    setList(res.data);
  }, [setList]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  return {
    page: {
      total: 0,
      pageSize: 10,
      current: 1,
    },
    list,
  };
}

export default function Requests({ type, status }: RequestsProps): JSX.Element {
  const userInfo = useSelector(selectUserInfo);
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<FriendRequest>();
  const requests = useGetRequests();

  function onClickAdd(req: FriendRequest) {
    setIsShowModal(true);
    setCurrentRequest(req);
  }

  function showModal() {
    setIsShowModal(true);
  }

  function closeModal() {
    setIsShowModal(false);
  }

  function handleCancel() {
    setIsShowModal(false);
  }

  /**
   * 加好友
   */
  async function onConfirm(): Promise<void> {
    if (confirmOrReject.loading === 'pending') return;
    if (!currentRequest?.account_id) return;
    confirmOrReject.loading = 'pending';
    const resp = await friendService.putAddFriendConfirm({
      id: currentRequest.account_id,
      type: 'accept',
      reason: 'Nice to meet you',
    });
    confirmOrReject.loading = 'idle';

    if (!resp || resp.status !== 20000) {
      message.warn('添加失败');
      return;
    }

    message.info('添加成功');
  }

  return (
    <List
      dataSource={requests.list}
      pagination={{
        ...requests.page,
        hideOnSinglePage: true,
      }}
      renderItem={(item) => (
        <List.Item key={item.id} className={styles.list}>
          <RequestComponent
            request={item}
            isSentByMyself={true}
            onClickAdd={onClickAdd}
          />
        </List.Item>
      )}
    />
  );
}

// {/* {request.solved_reason && request.solved_reason} */}
//       {/* <Paragraph>{request.submit_reason}</Paragraph> */}
//       {/* <Timeline mode="left">
//         <Timeline.Item label={formatTimestamp(request.submit_time)}>
//           {request.submit_reason}
//         </Timeline.Item>
//         <Timeline.Item>
//           {request.solved_result === 0 ? 'waiting for confirm' : ''}
//           {request.solved_result === 1 ? request.solved_reason : ''}
//         </Timeline.Item>
//       </Timeline> */}
