import React from "react";
import { Menu } from "antd";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";

const avatarNavMenu = (
  <Menu>
    <Menu.Item key="editor">
      <NavLink to={`/editor`}>
        <FormattedMessage id="menu.editor" defaultMessage="Editor" />
      </NavLink>
    </Menu.Item>

    <Menu.Item key="im">
      <NavLink to="/im">
        <FormattedMessage id="menu.im" defaultMessage="Instant Messaging" />
      </NavLink>
    </Menu.Item>

    <Menu.Item key="accounts">
      <NavLink to={`/accounts/`}>
        <FormattedMessage
          id="menu.accountCenter"
          defaultMessage="Account Center"
        />
      </NavLink>
    </Menu.Item>

    <Menu.Item key="management">
      <NavLink to={`/management`}>
        <FormattedMessage id="menu.management" defaultMessage="Management" />
      </NavLink>
    </Menu.Item>

    <Menu.Item key="profile">
      <NavLink to={`/accounts/settings/profile`}>
        <FormattedMessage
          id="menu.profileSettings"
          defaultMessage="Account Settings"
        />
      </NavLink>
    </Menu.Item>

    <Menu.Divider />

    <Menu.Item key="logout" danger>
      <NavLink to={`/logout`}>
        <FormattedMessage id="menu.logout" defaultMessage="Quit" />
      </NavLink>
    </Menu.Item>
  </Menu>
);
export default avatarNavMenu;
