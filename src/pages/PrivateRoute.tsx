import React from "react";
import { useSelector } from "react-redux";
import {
  Redirect,
  Route,
  RouteProps,
} from "react-router-dom";
import { RootState } from "@/@types/state";

/**
 * 私有页面专用路由封装，如果页面需要在为登录状态下跳转至登录界面，则使用该路由封装器
 * @param param0 路由参数
 */
const PrivateRoute = ({ children, render, component, ...rest }: RouteProps) => {
  const selectUserInfo = useSelector((state: RootState) => state.userInfo);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        selectUserInfo.hasLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
