import React from 'react';
import { Menu } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectMenuTheme } from '@/store/themeSlice';

const AppNavMenu = withRouter(function PureAppNav(props) {
  const menuTheme = useSelector(selectMenuTheme);
  return (
    <Menu
      mode="horizontal"
      theme={menuTheme}
      defaultSelectedKeys={[props.match.path]}
    >
      <Menu.Item key={'/activities'}>
        <NavLink to="/activities">
          <FormattedMessage id="menu.activities" defaultMessage="Activities" />
        </NavLink>
      </Menu.Item>

      <Menu.Item key={'/codesnips'}>
        <NavLink to="/codesnips">
          <FormattedMessage
            id="menu.codesnips"
            defaultMessage="Code Snipates"
          />
        </NavLink>
      </Menu.Item>
    </Menu>
  );
});

export default AppNavMenu;
