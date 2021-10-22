import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '@/components/PrivateRoute';
import TwoColLayout from '@/layouts/TwoColLayout';
import FriendsSider from './FriendsSider';
import FriendProfile from './FriendProfile';

export default function FriendsPanel() {
  return (
    <TwoColLayout leftSider={<FriendsSider />}>
      <Switch>
        <PrivateRoute path="/friends/:id">
          <FriendProfile />
        </PrivateRoute>
      </Switch>
    </TwoColLayout>
  );
}
