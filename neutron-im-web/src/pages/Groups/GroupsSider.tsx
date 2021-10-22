import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import { group } from '@/services';
import { SearchHeader } from '@/components/Search';

export default function GroupsSider(): JSX.Element {
  // const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(fetch);
    group.postGroups().then(console.log).catch(console.error);
  }, []);

  return (
    <div>
      <SearchHeader />
      <List
        itemLayout="horizontal"
        dataSource={[]}
        renderItem={(item, index) => (
          <List.Item>
            <Link
              to={`groups/`}
              style={{
                display: 'block',
                width: '100%',
              }}
            >
              <div>Friend {index}</div>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}
