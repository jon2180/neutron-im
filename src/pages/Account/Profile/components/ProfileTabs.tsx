import React from "react";

import ActivityList from "@/components/ActivityList";
import CodeSnipList from "@/components/CodeSnipList";

export function ExtraTab() {
  return <p>project content</p>;
}

export type TabKeyType = "activities" | "codesnips" | "extra";

export interface TabType {
  /** 绑定 tab 的键 */
  key: TabKeyType;
  /** Tab 的显示的标签值 */
  tab: string;
  component: JSX.Element;
}

/**
 * 配置 Tab 页相关参数
 */
export const tabList: TabType[] = [
  {
    key: "activities",
    tab: "Activities",
    component: <ActivityList />,
  },
  {
    key: "codesnips",
    tab: "Code Snips",
    component: <CodeSnipList />,
  },
  {
    key: "extra",
    tab: "Extra",
    component: <ExtraTab />,
  },
];

export const contentList: Record<TabKeyType, JSX.Element> =
  (function transTabListToContentList() {
    const obj = {} as Record<TabKeyType, JSX.Element>;
    for (let tab of tabList) {
      obj[tab.key] = tab.component;
    }
    return obj;
  })();
