import React from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Switch,
} from "react-router-dom";

// imported components
import PrivateRoute from "../components/PrivateRoute";

export interface RouterConfig {
  name: string;
  path?: RouteProps["path"];
  exact?: RouteProps["exact"];
  sensitive?: RouteProps["sensitive"];
  strict?: RouteProps["strict"];
  authority?: string[] | string;
  children?: RouterConfig[];
  location?: RouteProps["location"];
  component: React.ComponentType<any>;
}

function parseFlatRoutes(r?: RouterConfig[]) {
  if (!r || !r.length) {
    return <></>;
  }

  return (
    <Switch>
      {r.map((value) => {
        const {
          component: Component,
          authority,
          name,
          children,
          ...props
        } = value;

        const child = <Component>{parseFlatRoutes(children)}</Component>;
        if (authority) {
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
  return <Router>{parseFlatRoutes(routes)}</Router>;
}
