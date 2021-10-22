import type { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/',
    name: 'fullpage',
    wrappers: ['@/'],
    component: '@/layouts/BlankLayout',
    routes: [
      {
        path: '/login',
        name: 'login',
        component: '@/pages/Login',
        exact: true,
      },
      {
        name: 'logout',
        path: '/logout',
        component: '@/pages/Logout',
        exact: true,
      },
      {
        name: '/',
        path: '/',
        component: '@/pages/Home',
        exact: true,
      },
      {
        path: '/',
        name: 'homepage',
        component: '@/layouts/AppLayout',
        authority: ['admin'],
        routes: [
          {
            name: 'chats',
            path: '/chats',
            component: '@/pages/Chats',
          },
          {
            name: 'friends',
            path: '/friends',
            component: '@/pages/Friends',
          },
          {
            name: 'groups',
            path: '/groups',
            component: '@/pages/Groups',
          },
          {
            name: 'accounts',
            path: '/accounts',
            component: '@/pages/Profile',
            exact: true,
          },
          {
            name: 'account',
            path: '/accounts/:id',
            component: '@/pages/Profile',
            exact: true,
          },
          {
            name: 'accountSettingsProfile',
            path: '/accounts/settings/profile',
            component: '@/pages/Settings',
            exact: true,
          },
          {
            name: 'accountsSettingsBind',
            path: '/accounts/settings/bind',
            component: '@/pages/Settings',
            exact: true,
          },
        ],
      },
      {
        name: 'topLayout',
      },
      {
        path: '*',
        name: '404',
        component: '@/pages/Error/Error404',
      },
    ],
  },
];

const privateRouteWrappers = ['@/components/PrivateRoute'];
const EMPTY_ARRAY: any[] = [];

function needAuth(auth: any) {
  return !!auth;
}

function transformToStandard(routes?: IRoute[]): IRoute[] {
  if (!routes || !Array.isArray(routes) || !routes.length) {
    return EMPTY_ARRAY;
  }
  return routes.map((route) => {
    route.routes = transformToStandard(route.routes);
    return needAuth(route.auth)
      ? {
          ...route,
          wrappers: privateRouteWrappers,
        }
      : route;
  });
}

export default transformToStandard(routes);
