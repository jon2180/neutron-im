import React, { useState } from 'react';

import { Card } from 'antd';
import { contentList, tabList } from './components/ProfileTabs';
import type { TabKeyType } from './components/ProfileTabs';

interface ProfileCardProps {
  id: string;
  activeTabKey: string;
}

export default function ProfileCard({ activeTabKey }: ProfileCardProps) {
  const [tabKey, setTabKey] = useState<TabKeyType>(
    (activeTabKey && tabList.find((value) => value.key === activeTabKey)
      ? activeTabKey
      : tabList[0].key) as TabKeyType,
  );

  const onTabChange = (key: TabKeyType) => {
    setTabKey(key);
  };
  return (
    <>
      <Card
        tabList={tabList}
        activeTabKey={tabKey}
        onTabChange={(key) => {
          onTabChange(key as TabKeyType);
        }}
        className="without-padding-card"
      >
        {contentList[tabKey]}
      </Card>
    </>
  );
}
