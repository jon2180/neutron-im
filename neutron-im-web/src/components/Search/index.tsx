/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import { postAddFriendRequest, searchAccount } from '@/services/friend';
import type { UserInfoSubstate } from '@/types/state';
import { PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Input, List, Menu, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Search.module.less';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@/store/userInfoSlice';
import Modal from 'antd/lib/modal/Modal';

interface SearchParam {
  keyword: string;
  type: string;
}

function useSearch() {
  const [result, setResult] = useState([] as UserInfoSubstate[]);

  const onSearch = useCallback(({ keyword, type }: SearchParam) => {
    console.log(keyword);
    if (keyword && keyword !== '') {
      searchAccount({ keyword: keyword, type: type || 'all' })
        .then((res) => {
          console.log(res);
          if (res.status === 20000 && res.data && Array.isArray(res.data)) {
            setResult(res.data);
          } else {
            console.log('搜索失败');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return {
    page: {
      pageSize: 0,
      total: 0,
      current: 0,
    },
    data: result,
  };
}

function AddFriend({ result, ...props }: { result: UserInfoSubstate[] }) {
  const userInfo = useSelector(selectUserInfo);
  const requestAddFriend = (id: string) => {
    postAddFriendRequest({ id, reason: '测试' })
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  };

  return (
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
                      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    }
                    size={36}
                    className={styles.avatar}
                  />
                  <Link
                    to={`/accounts/${value.id}`}
                    target="_blank"
                    title="点击查看用户详情"
                  />
                  <div>
                    {value.nickname}
                    {userInfo.id === value.id ? '(myself)' : ''}
                  </div>
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
                  >
                    <UserAddOutlined />
                    <Button
                      type="text"
                      icon={<UserAddOutlined />}
                      // onClick={() => {
                      //   requestAddFriend(value.id);
                      // }}
                      title="添加好友"
                    ></Button>
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
  );
}

export function SearchInput() {
  return <div></div>;
}

export function SearchHeader() {
  const [hasResult, setHasResult] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [visible, setVisible] = useState(false);

  const onSearch = () => {
    // props.updateResult({
    //   keyword: searchKeyword,
    //   type: 'account',
    // });
    if (searchKeyword) setHasResult(true);
    else setHasResult(false);
  };

  return (
    <>
      <div className={styles.searchBox}>
        <div className={styles.searchInput}>
          <Input.Search
            className={styles.searchInput}
            value={searchKeyword}
            size="middle"
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              if (!e.target.value) {
                setHasResult(false);
              }
            }}
            onSearch={onSearch}
            allowClear
          />
        </div>
        <Dropdown
          overlay={
            <Menu
              onSelect={() => {
                setVisible(!visible);
                console.log(visible);
              }}
            >
              <Menu.Item
                key="addNewFriend"
                onClick={() => {
                  setVisible(!visible);
                  console.log(visible);
                }}
              >
                添加新朋友
              </Menu.Item>
            </Menu>
          }
        >
          <Button
            icon={<PlusOutlined />}
            className={styles.addBtn}
            type="text"
          ></Button>
        </Dropdown>
        <Modal
          visible={visible}
          onCancel={() => {
            setVisible(false);
          }}
        >
          console.log(modal)
        </Modal>
      </div>
      <div
        className={[styles.overlay, hasResult ? styles.show : ''].join(' ')}
      ></div>
    </>
  );
}
