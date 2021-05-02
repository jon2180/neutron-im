// import Home from "./Home";
import ReactIntroduction from "@/components/ReactIntroduction/ReactIntroduction";
// import Login from "./Account/Login/Login";
// import Activities from "./Activities/Activities";
// import Search from "./Search/Search";
// import Management from "./Mangement/Management";
// import CodeSnips from "./CodeSnips/CodeSnips";
// import { Empty, Switch } from "antd";
import IMFrame from "@/pages/IM/IMFrame";
// import { Editor } from "./Editor/Editor";
// import AccountProfile from "./Account/Profile/AccountProfile";
import DefaultFrame from "@/components/layout/AppFrame";
import BlankLayout from "@/components/layout/BlankLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Account/Login/Login";
import Activities from "@/pages/Activities/Activities";
import Activity from "@/pages/Activities/Activity";
import type { RouterConfig } from "./components/RouterWrapper";
import CodeSnips from "./pages/CodeSnips/CodeSnips";
import Management from "./pages/Mangement/Management";
import AccountProfile from "./pages/Account/Profile/AccountProfile";
import ProfileSetting from "./pages/Account/Settings/ProfileSetting";
import Editor from "./pages/Editor/Editor";
import Error404 from "./pages/Error/Error404";
import Search from "./pages/Search/Search";
import Logout from "./pages/Account/Logout";
// import Activity from "./Activities/Activity";
// import ProfileSetting from "./Account/Settings/ProfileSetting";

// type RouterConfig = RouteProps & {
//   authority?: string[] | string;
//   children?: RouterConfig[];
// };

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
        component: DefaultFrame,
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
