import React from 'react';
import PrivateRoute from '@/components/PrivateRoute';
import TwoColLayout from '@/layouts/TwoColLayout';
import { Switch } from 'react-router-dom';
import ChatPanel from './ChatPanel';
import ChatsSider from './ChatsSider';

export default function ChatsPanel() {
  return (
    <TwoColLayout leftSider={<ChatsSider />}>
      <Switch>
        <PrivateRoute path="/chats/:id" exact>
          <ChatPanel />
        </PrivateRoute>
      </Switch>
    </TwoColLayout>
  );
}
