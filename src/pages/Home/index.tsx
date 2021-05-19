import React from "react";
import { Redirect } from "react-router";

export default function Home() {
  return <Redirect to="/im/chats" push />;
}
