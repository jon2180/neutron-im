import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";
import ChatPanel from "./Chats/ChatPanel";
import FriendProfile from "./Friends/FriendProfile";

export default function RightSider() {
  return (
    <>
      <Switch>
        <PrivateRoute path="/im/chats/:id" exact>
          <ChatPanel />
        </PrivateRoute>
        <PrivateRoute path="/im/friends/:id" exact>
          <FriendProfile />
        </PrivateRoute>
        <PrivateRoute path="/im/groups/:id" exact>
          <FriendProfile />
        </PrivateRoute>
      </Switch>
    </>
  );
}
