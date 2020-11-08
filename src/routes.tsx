import React from "react";
import {
  RouteProps,
} from "react-router-dom";

import Chat from "@/pages/chat/Chat";
import ReactIntroduction from "@/pages/react-introduction/ReactIntroduction";
import Login from "@/pages/user/login/Login";

export const routesFullScreen: (RouteProps & { auth?: boolean })[] = [
  {
    path: "/login",
    exact: true,
    auth: false,
    component: Login,
    children: Login,
  },
];

export const routes: (RouteProps & { auth?: boolean })[] = [
  {
    path: "/recent/:id",
    exact: true,
    auth: true,
    children: Chat,
  },
  {
    path: "/",
    exact: true,
    auth: true,
    children: <ReactIntroduction />,
  },
];
