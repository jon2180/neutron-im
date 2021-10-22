/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const externals = require('externals-dependencies');
const ESLintPlugin = require('eslint-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// webpack.config.js
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const eslintBaseConfig = require('./.eslintrc');

module.exports = {
  entry: {
    index: './src/server.ts',
    http2: './src/http2-server.ts',
    multiprocess: './src/multi-process-server.ts',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        use: {
          loader: 'ts-loader',
          // loader: 'babel-loader',
          // 缓存
          // options: { cacheDirectory: true },
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: './',
    hot: true,
    open: true,
    before(app, devServer) {
      // console.log(app, devServer);
    },
    after(app) {
      console.log(app);
    },
  },
  watchOptions: {
    aggregateTimeout: 3000,
    // poll: 1000,
    ignored: ['node_modules/**/*', 'test/**/*'],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin({resourceRegExp: /cardinal/, contextRegExp: /mysql2/}),
    // mysql2 中用到了 cardinal 包，忽略掉打包 cardinal
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      // Plugin options
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      fix: true,
      // formatter: require.resolve('react-dev-utils/eslintFormatter'),
      eslintPath: require.resolve('eslint'),
      failOnError: false, // !(isEnvDevelopment && emitErrorsAsWarnings),
      context: path.join(__dirname, 'src'), // paths.appSrc,
      cache: true,
      cacheLocation: path.resolve(
        // paths.appNodeModules,
        path.join(__dirname, 'node_modules'),
        '.cache/.eslintcache',
      ),
      // ESLint class options
      cwd: path.join(__dirname, './'),
      resolvePluginsRelativeTo: __dirname,
      baseConfig: eslintBaseConfig,
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node', // 服务端打包
  mode: 'production',
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  },
  externals: [externals()], // node 打包可去除一些警告
  optimization: {
    minimize: true,
    splitChunks: { // 配置提取公共代码
      chunks: 'all',
      minSize: 30000, // 配置提取块的最小大小（即不同页面之间公用代码的大小）
      minChunks: 1, // 最小共享块数，即公共代码最少的重复次数一般设为3
      automaticNameDelimiter: '.', // 生成的名称指定要使用的分隔符
      cacheGroups: { // 设置缓存组
        koa: {
          name: 'koa',
          test(module) {
            const modulePath = module.resource;
            return (/[\\/]node_modules[\\/]koa[\\/]/.test(modulePath)
              || /[\\/]node_modules[\\/]@koa[\\/]/.test(modulePath));
          },
          priority: 30,
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
        },
      },
    },
    runtimeChunk: {
      name: 'manifest', // 打包运行文件
    },
  },
};
