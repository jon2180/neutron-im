import React from 'react';
import PrivateRoute from "@/components/PrivateRoute";
import TwoColLayout from "@/layouts/TwoColLayout";
import { Switch } from 'react-router-dom';
import ChatPanel from "../Chats/ChatPanel";
import GroupsSider from "./GroupsSider";

export default function GroupsPanel() {
    return (
      <TwoColLayout leftSider={<GroupsSider />}>
        <Switch>
          <PrivateRoute path="/groups/:id">
            <ChatPanel />
          </PrivateRoute>
        </Switch>
      </TwoColLayout>
    )
  }