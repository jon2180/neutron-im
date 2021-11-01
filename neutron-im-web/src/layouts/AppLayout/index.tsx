import type React from 'react';
import { useState, useMemo } from 'react';
import { Button, Dropdown, Layout, Menu } from 'antd';
import { NavLink, useLocation } from 'umi';
import SiderAvatar from '@/components/SiderAvatar';
import { ROUTES_CONFIG } from './index.conf';
import styles from './index.module.less';
import { MenuOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { changeLocale } from '@/locales';

/**
 * 是否是待匹配路由的子路由
 * @param currentPath 当前路由
 * @param to 匹配用的路由
 * @returns 结果
 */
function isSubRoute(currentPath: string, to: string): boolean {
  return (
    currentPath === to ||
    (currentPath.length >= to.length &&
      currentPath.substring(0, to.length) === to)
  );
}

/**
 * 获取默认选中键
 */
function useSelectedKeys(): string[] {
  const [menuKey, setMenuKey] = useState(ROUTES_CONFIG[0].to);
  const location = useLocation();

  useMemo(() => {
    const { pathname } = location;
    for (let i = 0; i < ROUTES_CONFIG.length; ++i) {
      const { to } = ROUTES_CONFIG[i];
      if (isSubRoute(pathname, to)) {
        setMenuKey(to);
        break;
      }
    }
  }, [location]);

  return [menuKey];
}

function useUnreadCount() {
  // TODO 添加未读指示徽标
  // const [unreadCount, setUnreadCount] = useState(0);
  // const recentChats = useSelector(selectAllChats);
  // // 更新未读数量
  // useEffect(() => {
  //   if (Array.isArray(recentChats)) {
  //     let unread = 0;
  //     for (let i = 0; i < recentChats.length; ++i) {
  //       unread += recentChats[i].unread_count;
  //     }
  //     setUnreadCount(unread);
  //   }
  // }, [recentChats]);
  return {
    chats: 0,
  };
}

export default function AppLayout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [collapsed] = useState(true);
  const selectedKeys = useSelectedKeys();
  const unreadCount = useUnreadCount();
  const intl = useIntl();

  const onChangeLocale = (e: { key: React.Key }) => {
    if (e.key && typeof e.key === 'string' && e.key !== '') changeLocale(e.key);
  };

  const menuNav = (
    <Menu>
      <Menu.SubMenu
        key="i18n"
        title={intl.formatMessage({
          id: 'menu.changeLocale',
          defaultMessage: 'Switch Language',
        })}
      >
        <Menu.Item key="zh_CN" onClick={onChangeLocale}>
          中文
        </Menu.Item>
        <Menu.Item key="en_US" onClick={onChangeLocale}>
          English
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="accountCenter">
        <a target="_blank" rel="noopener noreferrer" href="/accounts">
          <FormattedMessage
            id="menu.accountCenter"
            defaultMessage="Account Center"
          />
        </a>
      </Menu.Item>
      <Menu.Item key="logout" danger>
        <NavLink to="/logout">
          <FormattedMessage id="menu.logout" defaultMessage="Quit" />
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Layout.Sider collapsed={collapsed} collapsedWidth={64} width={128}>
        <div className={styles.sider}>
          <div>
            <SiderAvatar collapsed={collapsed} />
            <Menu defaultSelectedKeys={selectedKeys}>
              {ROUTES_CONFIG.map((value) => {
                return (
                  <Menu.Item key={value.to} icon={value.icon}>
                    <NavLink to={value.to}>{value.text}</NavLink>
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
          <Dropdown
            overlay={menuNav}
            placement="topLeft"
            visible={true}
            overlayStyle={{
              width: '250px',
            }}
          >
            <Button
              icon={<MenuOutlined />}
              type="text"
              className={styles.moreOptionBen}
            ></Button>
          </Dropdown>
        </div>
      </Layout.Sider>
      <Layout.Content className={styles.content}>{children}</Layout.Content>
    </Layout>
  );
}
