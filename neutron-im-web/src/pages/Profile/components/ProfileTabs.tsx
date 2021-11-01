import React from 'react';

export function ExtraTab() {
  return <p>project content</p>;
}

export type TabKeyType = 'activities' | 'codesnips' | 'extra';

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
    key: 'extra',
    tab: 'Extra',
    component: <ExtraTab />,
  },
];

export const contentList: Record<TabKeyType, JSX.Element> =
  (function transTabListToContentList() {
    const obj = {} as Record<TabKeyType, JSX.Element>;
    for (const tab of tabList) {
      obj[tab.key] = tab.component;
    }
    return obj;
  })();
