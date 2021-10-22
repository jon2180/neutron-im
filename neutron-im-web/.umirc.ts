import { defineConfig } from 'umi';
import routes from './config/routes';
import themes from './src/themes';

export default defineConfig({
  theme: themes,
  antd: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  dynamicImport: {
    loading: '@/components/Empty',
  },
  // mfsu: {},
  fastRefresh: {},
  forkTSChecker: {},
  externals: {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  webpack5: {
    // lazyCompilation: {},
  },
  // 引入被 external 库的 scripts
  // 区分 development 和 production，使用不同的产物
  scripts: process.env.NODE_ENV === 'development' ? [
    'https://gw.alipayobjects.com/os/lib/react/17.0.2/umd/react.development.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/17.0.2/umd/react-dom.development.js',
  ] : [
    'https://gw.alipayobjects.com/os/lib/react/17.0.2/umd/react.production.min.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/17.0.2/umd/react-dom.production.min.js',
  ],
  esbuild: {},
  // chunks: [
  //   'bundle-vendors',
  //   'bundle-refractor',
  //   'bundle-moment',
  //   'bundle-mockjs',
  //   'bundle-emoji',
  //   'bundle-ant-design',
  //   'bundle-at',
  //   'bundle-antd',
  //   'bundle-react',
  //   'umi',
  // ].filter((value, index, routes) => {
  //   return (routes.indexOf(value) !== -1);
  // }),
  // chainWebpack: function(config, { webpack }) {
  //   config.merge({
  //     optimization: {
  //       splitChunks: {
  //         chunks: 'all',
  //         minSize: 30000,
  //         minChunks: 1,
  //         automaticNameDelimiter: '~',
  //         cacheGroups: {
  //           refactor: {
  //             name: 'bundle-refractor',
  //             test({ resource }: { resource: string }) {
  //               return /[\\/]node_modules[\\/]refractor[\\/]/.test(resource);
  //             },
  //             priority: 140,
  //           },
  //           moment: {
  //             name: 'bundle-moment',
  //             test({ resource }: { resource: string }) {
  //               return /[\\/]node_modules[\\/]moment[\\/]/.test(resource);
  //             },
  //             priority: 130,
  //           },
  //           mockjs: {
  //             name: 'bundle-mockjs',
  //             test({ resource }: { resource: string }) {
  //               return /[\\/]node_modules[\\/]mockjs[\\/]/.test(resource);
  //             },
  //             priority: 120,
  //           },
  //           emoji: {
  //             name: 'bundle-emoji',
  //             test({ resource }: { resource: string }) {
  //               return /[\\/]node_modules[\\/]emoji-mart[\\/]/.test(resource);
  //             },
  //             priority: 110,
  //           },
  //           antdIcons: {
  //             name: 'bundle-ant-design',
  //             test({ resource }: { resource: string }) {
  //               return /[\\/]node_modules[\\/]@ant-design/.test(resource);
  //             },
  //             priority: 100,
  //           },
  //           at: {
  //             name: 'bundle-at',
  //             test({ resource }: { resource: string }) {
  //               return /[\\/]node_modules[\\/]@/.test(resource);
  //             },
  //             priority: 90,
  //           },
  //           antd: {
  //             name: 'bundle-antd',
  //             test({ resource }: { resource: string }) {
  //               return /[\\/]node_modules[\\/]antd/.test(resource) ||
  //                 /[\\/]node_modules[\\/]rc/.test(resource);
  //             },
  //             priority: 10,
  //           },
  //           is: {
  //             name: 'bundle-is',
  //             test({ resource }: { resource: string }) {
  //               return /[\\/]node_modules[\\/]is/.test(resource);
  //             },
  //             priority: 8,
  //           },
  //           react: {
  //             name: 'bundle-react',
  //             test({ resource }: { resource: string }) {
  //               return /[\\/]node_modules[\\/]react/.test(resource);
  //             },
  //             priority: 9,
  //           },
  //           vendors: {
  //             name: 'bundle-vendors',
  //             test({ resource }: { resource: string }) {
  //               return /[\\/]node_modules[\\/]/.test(resource);
  //             },
  //             priority: 5,
  //           },
  //         },
  //       },
  //     },
  //   });
  // },
});
