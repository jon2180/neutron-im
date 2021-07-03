import type { IRoute } from 'umi';

const routes: IRoute[] = [{
  path: '/',
  name: 'fullpage',
  wrappers: ['@/pages'],
  component: '@/layouts/BlankLayout',
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: '@/pages/Home',
      exact: true,
    },
    {
      path: '/login',
      name: 'login',
      component: '@/pages/Account/Login',
      exact: true,
    },
    {
      path: '/register',
      name: 'register',
      component: '@/pages/Account/Login',
      exact: true,
    },
    {
      path: '/im',
      name: 'im',
      component: '@/pages/IM',
      wrappers: ['@/components/PrivateRoute'],
      authority: ['admin'],
    },
    {
      name: 'editor',
      path: '/editor',
      component: '@/pages/Editor',
      exact: true,
    },
    {
      name: 'react',
      path: '/react',
      component: '@/components/ReactIntroduction',
    },
    {
      name: 'logout',
      path: '/logout',
      component: '@/pages/Account/Logout',
      exact: true,
    },
    {
      name: 'topLayout',
      component: '@/layouts/BasicLayout',
      authority: ['admin'],
      routes: [
        {
          path: '/activities',
          name: 'activities',
          component: '@/pages/Activities',
          exact: true,
          routes: [],
        },
        {
          name: 'activity',
          path: '/activities/:id',
          component: '@/pages/Activity',
          exact: true,
        },
        {
          name: 'codesnips',
          path: '/codesnips',
          component: '@/pages/CodeSnips',
          exact: true,
        },
        {
          name: 'codesnip',
          path: '/codesnips/:id',
          component: '@/pages/CodeSnips',
          exact: true,
        },
        {
          name: 'management',
          path: '/management',
          component: '@/pages/Mangement',
          exact: true,
        },
        {
          name: 'accounts',
          path: '/accounts',
          component: '@/pages/Account/Profile',
          exact: true,
        },
        {
          name: 'account',
          path: '/accounts/:id',
          component: '@/pages/Account/Profile',
          exact: true,
        },
        {
          name: 'accountSettingsProfile',
          path: '/accounts/settings/profile',
          component: '@/pages/Account/Settings',
          exact: true,
        },
        {
          name: 'accountsSettingsBind',
          path: '/accounts/settings/bind',
          component: '@/pages/Account/Settings',
          exact: true,
        },
        {
          name: 'search',
          path: '/search',
          component: '@/pages/Search',
          exact: true,
        },
      ],
    },
    {
      path: '*',
      name: '404',
      component: '@/pages/Error/Error404',
    },
  ],
}];

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
    return needAuth(route.auth) ? {
        ...route,
        wrappers: privateRouteWrappers,
      } :
      route;
  });
}

export default transformToStandard(routes);
