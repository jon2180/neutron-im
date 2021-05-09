import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import type { RouteProps } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";

export interface RouterConfig {
  /**
   * 路由路径
   */
  path?: RouteProps["path"];
  /**
   * 是否精确匹配
   */
  exact?: RouteProps["exact"];
  /**
   * 路由匹配是否对大小写敏感
   */
  sensitive?: RouteProps["sensitive"];
  /**
   * 是否精确匹配后缀斜线
   */
  strict?: RouteProps["strict"];
  location?: RouteProps["location"];

  /**
   * 路由命名，主要用来指定 key
   */
  name: string;
  /**
   * 授权
   */
  authority?: string[] | string;
  /**
   * 子组件
   */
  children?: RouterConfig[];
  /**
   * 当前组件，只会使用 children 来渲染
   */
  component: React.ComponentType<any>;
}

const defaultOptions = {
  /**
   * <0 一直遍历 0 不往下遍历 1 往下遍历一层...
   */
  depth: -1,
};

/**
 * traverseChildrenPath 递归遍历得到所有子路由的 path
 *
 * @param routes route 配置数组
 * @param options 选项
 * @returns 路由 path 数组或 path
 */
export function traverseChildrenPath(
  routes: RouterConfig[],
  options?: {
    depth: number;
  }
): string[] {
  const mixedOptions = {
    ...defaultOptions,
    ...options,
  };
  return (
    routes
      .map((value) => {
        let arr: string[] = [];

        // 遍历子路由的 path 参数
        if (value.children && Number.isInteger(mixedOptions.depth)) {
          if (mixedOptions.depth < 0) {
            arr = arr.concat(
              traverseChildrenPath(value.children, {
                ...mixedOptions,
                depth: mixedOptions.depth,
              })
            );
          } else if (mixedOptions.depth > 0) {
            arr = arr.concat(
              traverseChildrenPath(value.children, {
                ...mixedOptions,
                depth: mixedOptions.depth - 1,
              })
            );
          }
        }

        if (
          !value.path ||
          !(typeof value.path === "string" || Array.isArray(value.path))
        ) {
          return "";
        }

        return arr.concat(value.path);
      })
      .flat()
      // 移除空参
      .filter((value) => {
        return (value && typeof value === "string" && value !== "") as boolean;
      })
      // 数组去重化
      .filter((value, index, thisArr) => {
        return thisArr.indexOf(value) === index;
      })
  );
}

function checkAuthority(authority?: string | string[]) {
  // TODO 检查授权机制待优化
  return !!authority;
}

/**
 * 遍历生成路由树
 * @param routes 路由配置文件
 * @returns 路由树
 */
function generateRoutesTree(routes?: RouterConfig[]) {
  if (!routes || !routes.length) {
    return <></>;
  }

  return (
    <Switch>
      {routes.map((value) => {
        const {
          component: Component,
          authority,
          name,
          children,
          ...props
        } = value;

        if (!props.path) {
          if (value.children && Array.isArray(value.children)) {
            props.path = traverseChildrenPath(value.children);
          }
        }

        const child = <Component>{generateRoutesTree(children)}</Component>;

        if (checkAuthority(authority)) {
          return (
            <PrivateRoute {...props} key={name}>
              {child}
            </PrivateRoute>
          );
        } else {
          return (
            <Route {...props} key={name}>
              {child}
            </Route>
          );
        }
      })}
    </Switch>
  );
}

interface RouterWrapperProps {
  routes: RouterConfig[];
}

export default function RouterWrapper({ routes }: RouterWrapperProps) {
  return <Router>{generateRoutesTree(routes)}</Router>;
}
