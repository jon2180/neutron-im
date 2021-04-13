import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// imported components
import PrivateRoute from "../components/PrivateRoute";
import Home from "./Home";
import ReactIntroduction from "@/components/ReactIntroduction/ReactIntroduction";
import Login from "./Account/Login/Login";
import Activities from "./Activities/Activities";
import Search from "./Search/Search";
import Management from "./Mangement/Management";
import CodeSnips from "./CodeSnips/CodeSnips";
import { Empty } from "antd";
import IMFrame from "@/pages/IM/IMFrame";
import { Editor } from "./Editor/Editor";
import AccountProfile from "./Account/Profile/AccountProfile";
import DefaultFrame from "@/components/layout/AppFrame";
import Activity from "./Activities/Activity";
import ProfileSetting from "./Account/Settings/ProfileSetting";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Login />
        </Route>

        <PrivateRoute path="/im">
          <IMFrame />
        </PrivateRoute>

        <PrivateRoute
          path={[
            "/activities",
            "/codesnips",
            "/mine",
            "/management",
            "/search",
            "/accounts",
          ]}
        >
          <DefaultFrame>
            <Switch>
              <PrivateRoute path={["/activities"]} exact>
                <Activities />
              </PrivateRoute>
              <PrivateRoute path={["/activities/:id"]} exact>
                <Activity />
              </PrivateRoute>

              <PrivateRoute path={["/codesnips"]} exact>
                <CodeSnips detailPath="/codesnips/:id" detailExact />
              </PrivateRoute>

              <PrivateRoute path={["/codesnips/:id"]} exact>
                <CodeSnips detailPath="/codesnips/:id" detailExact />
              </PrivateRoute>

              <PrivateRoute path="/management">
                <Management>
                  <Switch></Switch>
                </Management>
              </PrivateRoute>

              <PrivateRoute path="/search" exact>
                <Search />
              </PrivateRoute>

              {/* <PrivateRoute path={["/accounts"]}>
                <Switch> */}
              <PrivateRoute path={["/accounts/"]} exact>
                <AccountProfile />
              </PrivateRoute>

              <PrivateRoute path={["/accounts/:id"]} exact>
                <AccountProfile />
              </PrivateRoute>

              <PrivateRoute path="/accounts/settings/profile" exact>
                <ProfileSetting />
              </PrivateRoute>

              <PrivateRoute path="/accounts/settings/bind" exact>
                <ProfileSetting />
              </PrivateRoute>
              {/* </Switch>
              </PrivateRoute> */}
            </Switch>
          </DefaultFrame>
        </PrivateRoute>

        <PrivateRoute path="/editor" exact>
          <Editor />
        </PrivateRoute>

        <Route path="react">
          <ReactIntroduction />
        </Route>

        <Route path="*">
          <div
            style={{
              position: "absolute",
              left: "0",
              right: "0",
              top: "0",
              bottom: "0",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Empty
              description={"404 NOT FOUNT 您要找的页面丢失了"}
              style={{
                margin: "0 auto",
              }}
            ></Empty>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}
