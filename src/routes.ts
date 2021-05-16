import ReactIntroduction from "@/components/ReactIntroduction";
import IMFrame from "@/pages/IM";
import BasicLayout from "@/components/layout/BasicLayout";
import BlankLayout from "@/components/layout/BlankLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Account/Login";
import Activities from "@/pages/Activities";
import Activity from "@/pages/Activities/Activity";
import type { RouterConfig } from "./components/RouterWrapper";
import CodeSnips from "./pages/CodeSnips";
import Management from "./pages/Mangement";
import AccountProfile from "./pages/Account/Profile";
import ProfileSetting from "./pages/Account/Settings";
import Editor from "./pages/Editor";
import Error404 from "./pages/Error/Error404";
import Search from "./pages/Search";
import Logout from "./pages/Account/Logout";

const routes: RouterConfig[] = [
  {
    path: "/",
    name: "fullpage",
    component: BlankLayout,
    children: [
      {
        path: "/",
        name: "homepage",
        component: Home,
        exact: true,
      },
      {
        path: "/login",
        name: "login",
        component: Login,
        exact: true,
      },
      {
        path: "/register",
        name: "register",
        component: Login,
        exact: true,
      },
      {
        path: "/im",
        name: "im",
        component: IMFrame,
        authority: ["admin"],
      },
      {
        name: "editor",
        path: "/editor",
        component: Editor,
        exact: true,
      },
      {
        name: "react",
        path: "/react",
        component: ReactIntroduction,
      },
      {
        name: "logout",
        path: "/logout",
        component: Logout,
        exact: true,
      },
      {
        name: "topLayout",
        component: BasicLayout,
        authority: ["admin"],
        children: [
          {
            path: "/activities",
            name: "activities",
            component: Activities,
            exact: true,
            children: [],
          },
          {
            name: "activity",
            path: "/activities/:id",
            component: Activity,
            exact: true,
          },
          {
            name: "codesnips",
            path: "/codesnips",
            component: CodeSnips,
            exact: true,
          },
          {
            name: "codesnip",
            path: "/codesnips/:id",
            component: CodeSnips,
            exact: true,
          },
          {
            name: "management",
            path: "/management",
            component: Management,
            exact: true,
          },
          {
            name: "accounts",
            path: "/accounts",
            component: AccountProfile,
            exact: true,
          },
          {
            name: "account",
            path: "/accounts/:id",
            component: AccountProfile,
            exact: true,
          },
          {
            name: "accountSettingsProfile",
            path: "/accounts/settings/profile",
            component: ProfileSetting,
            exact: true,
          },
          {
            name: "accountsSettingsBind",
            path: "/accounts/settings/bind",
            component: ProfileSetting,
            exact: true,
          },
          {
            name: "search",
            path: "/search",
            component: Search,
            exact: true,
          },
        ],
      },
      {
        path: "*",
        name: "404",
        component: Error404,
      },
    ],
  },
];

export default routes;
