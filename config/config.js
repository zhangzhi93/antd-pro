// https://umijs.org/config/
import os from 'os';
import slash from 'slash2';
import defaultSettings from './defaultSettings';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, TEST, NODE_ENV } = process.env;
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false,
      ...(!TEST && os.platform() === 'darwin'
        ? {
          dll: {
            include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
            exclude: ['@babel/runtime', 'netlify-lambda'],
          },
          hardSource: false,
        }
        : {}),
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码
// preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
}

const uglifyJSOptions =
  NODE_ENV === 'production'
    ? {
      uglifyOptions: {
        // remove console.* except console.error
        compress: {
          drop_console: true,
          pure_funcs: ['console.error'],
        },
      },
    }
    : {};
export default {
  // add for transfer to umi
  plugins,
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  treeShaking: true,
  targets: {
    ie: 11,
  },
  devtool: ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION ? 'source-map' : false,
  // 路由配置
  routes: [{
    path: '/login',
    component: '../layouts/LoginLayout',
  }, {
    path: '/project/:id',
    hideInMenu: true,
    // Routes: ['src/pages/Authorized'],
    component: '../layouts/$BasicLayout',
    routes: [
      { path: '/project/:id', redirect: '/project/:id/dit/notice' },
      {
        path: '/project/:id/dit',
        name: 'DIT',
        routes: [
          {
            path: '/project/:id/dit/notice',
            name: '通告',
            component: './DIT/Notice/index',
          },
          {
            path: '/project/:id/dit/shot',
            name: '镜次表',
            component: './DIT/Shot/index',
          },
          {
            path: '/project/:id/dit/xml',
            name: 'XML匹配',
            component: './DIT/Shot/index',
          },
        ],
      },
      {
        path: '/project/:id/overall',
        name: '统筹',
        routes: [
          {
            path: '/project/:id/overall/list',
            name: '场次',
            component: './Overall/List/index',
          },
          {
            path: '/project/:id/overall/character',
            name: '角色',
            component: './Overall/List/index',
          },
          {
            path: '/project/:id/overall/location',
            name: '场景',
            component: './Overall/List/index',
          },
        ],
      },
      {
        path: '/project/:id/actor-overall',
        name: '演员统筹',
        routes: [
          {
            path: '/project/:id/actor-overall/list',
            name: '场次',
            component: './Overall/List/index',
          },
          {
            path: '/project/:id/actor-overall/character',
            name: '角色',
            component: './Overall/List/index',
          },
          {
            path: '/project/:id/actor-overall/location',
            name: '场景',
            component: './Overall/List/index',
          },
        ],
      },
    ],
  }, {
    path: '/',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/',
        name: 'dashboard',
        icon: 'smile',
        component: './Dashboard/index',
      },],
  },],
  // proxy: {
  //   "/api": {
  //     "target": "http://www.easyaction.cn",
  //     "changeOrigin": true,
  //     "pathRewrite": { "^/api": "" }
  //   }
  // },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  uglifyJSOptions,
  chainWebpack: webpackPlugin,
};
