import React from 'react';
import { useSelector } from 'react-redux';
import type { RouteProps } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';
import { selectHasLogin } from '@/store/userInfoSlice';

/**
 * 私有页面专用路由封装，如果页面需要在为登录状态下跳转至登录界面，则使用该路由封装器
 * @param param0 路由参数
 */
const PrivateRoute = ({ children, render, component, ...rest }: RouteProps) => {
  const hasLogin = useSelector(selectHasLogin);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
