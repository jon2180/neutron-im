import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Row, Col } from "antd";

import ReactIntroduction from "@/pages/react-introduction/ReactIntroduction";
import SideBarArea from "@/pages/side-bar/SideBar";
import Chat from "@/pages/chat/Chat";
import Login from "./user/login/Login";
import PrivateRoute from "./PrivateRoute";
import FriendProfile from "@/pages/friends/profile";

import styles from "./App.module.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div style={{ fontSize: "40px", textAlign: "center" }}>官网首页</div>
        </Route>

        <Route path="/login" exact>
          <Login />
        </Route>

        <Route path="/register" exact>
          <Login />
        </Route>

        <Route path="/app">
          <Row className={styles.antRow}>
            <Col span={8}>
              <SideBarArea></SideBarArea>
            </Col>
            <Col span={16}>
              <Switch>
                <PrivateRoute path="/app/recent/:id" exact={true}>
                  <Chat />
                </PrivateRoute>

                <PrivateRoute path="/app/friend/:id" exact={true}>
                  <FriendProfile />
                </PrivateRoute>

                <PrivateRoute path="/app/activities/:id" exact={true}>
                  <FriendProfile />
                </PrivateRoute>

                <PrivateRoute path="/app" exact={true}>
                  <ReactIntroduction />
                </PrivateRoute>

                <PrivateRoute path="/app/*">
                  <div>恭喜您进入了未知领域(404 - NOT FOUND)</div>
                </PrivateRoute>
              </Switch>
            </Col>
          </Row>
        </Route>
      </Switch>
    </Router>
  );
}
