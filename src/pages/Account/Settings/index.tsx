import React, { useEffect, useRef, useState } from "react";
import { CalendarOutlined, MailOutlined } from "@ant-design/icons";
import { Card, Menu } from "antd";

import WideContentWrapper from "@/components/WideContentWrapper/WideContentWrapper";
import BasicSettings from "./BasicSettings";
import { FormattedMessage } from "react-intl";

import type { MenuMode } from "antd/lib/menu";

import styles from "./ProfileSetting.module.less";
import "./index.less";

function getMenuItem() {
  return (
    <>
      <Menu.Item key="basicSettings" icon={<MailOutlined />}>
        Basic Settings
      </Menu.Item>
      <Menu.Item key="accountBindings" icon={<CalendarOutlined />}>
        Account Binding
      </Menu.Item>
    </>
  );
}

type SelectedKeysType = "basicSettings" | "accountBindings";

function getRightTitle(key: SelectedKeysType) {
  switch (key) {
    case "basicSettings":
      return (
        <FormattedMessage
          id="accounts.settings.basicSettings"
          defaultMessage="Basic Settings"
        />
      );
    case "accountBindings":
      return (
        <FormattedMessage
          id="accounts.settings.basicSettings"
          defaultMessage="Account Settings"
        />
      );
    default:
      return <div>Default</div>;
  }
}

function renderChildren(key: SelectedKeysType) {
  switch (key) {
    case "basicSettings":
      return <BasicSettings />;
    case "accountBindings":
      return <BasicSettings />;
    default:
      return <div></div>;
  }
}

export default function ProfileSetting() {
  const [selectedKey, setSelectedKey] = useState<SelectedKeysType>(
    "basicSettings"
  );
  const main = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<MenuMode>("inline");

  const resize = () => {
    if (!main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!main || !main.current) {
        return;
      }
      let nextMode: "inline" | "horizontal" = "inline";
      const { offsetWidth } = main.current;
      if (main.current.offsetWidth < 641 && offsetWidth > 400) {
        nextMode = "horizontal";
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        nextMode = "horizontal";
      }

      setMode(nextMode);
    });
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    console.log("add listener");

    return () => {
      console.log("remove listener");
      window.removeEventListener("resize", resize);
    };
  });

  return (
    <WideContentWrapper>
      <Card className="setting-card">
        <div className={styles.main} ref={main}>
          <div className={styles.leftMenu}>
            <Menu
              style={{ width: 224 }}
              defaultSelectedKeys={[selectedKey]}
              onClick={({ key }) => {
                setSelectedKey(key as SelectedKeysType);
              }}
              mode={mode}
              theme="light"
            >
              {getMenuItem()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{getRightTitle(selectedKey)}</div>
            {renderChildren(selectedKey)}
          </div>
        </div>
      </Card>
    </WideContentWrapper>
  );
}