import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Row, Col } from "antd";

import ReactIntroduction from "@/pages/react-introduction/ReactIntroduction";
import SideBarArea from "@/pages/side-bar/SideBar";
import Chat from "@/pages/chat/Chat";
import Login from "./user/login/Login";

import styles from "./App.module.css";

function App() {
  const [isLogged /* setLoginState */] = useState(0);

  console.log(isLogged);

  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/">
          <Row className={styles.antRow}>
            <Col span={8}>
              <SideBarArea></SideBarArea>
            </Col>
            <Col span={16}>
              <Switch>
                <Route path="/recent/:id" component={Chat}></Route>
                <Route exact path="/">
                  <ReactIntroduction></ReactIntroduction>
                </Route>
              </Switch>
            </Col>
          </Row>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
