// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/login',
      component: '../layouts/LoginLayout',
    },
    {
      path: '/project/:id',
      routeLocal: false,
      hidePageHeader: true,
      component: '../layouts/$BasicLayout',
      routes: [
        {
          path: '/project/:id',
          redirect: '/project/:id/dashboard',
        },
        {
          path: '/project/:id/dashboard',
          name: 'dashboard',
          component: './Base/BaseLayout',
        },
        {
          path: '/project/:id/overall',
          name: '统筹',
          routes: [
            {
              path: '/project/:id/overall/script',
              name: '剧本',
              component: './Overall/Script',
            },
            {
              path: '/project/:id/overall/scene',
              name: '顺场表',
              component: './Overall/Scene',
            },
          ],
        }
      ]
    },
    {
      path: '/',
      component: '../layouts/HomeLayout',
      routes: [
        {
          path: '/',
          component: './All/List',
        },
        {
          path: '/create',
          component: './All/Create',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
