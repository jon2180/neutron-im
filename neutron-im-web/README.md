# NIM 即时通讯网页版

> 此项目基于 umi 构建.

## 项目概要

Neutron IM 是一个即时通讯软件，分别实现有桌面端和网页端。在系统交互上，模仿 QQ / 微信 的界面。

## 快速开始

Step 1：克隆此项目并安装依赖

```shell
git clone git@github.com:jon2180/neutron-im-web.git
cd neutron-im-web
npm install # or `yarn`
```

Step 2：启动服务端和静态文件端

- [静态服务器](https://github.com/jon2180/neutron-im-static-server)
- [服务端](https://github.com/jon2180/neutron-im-server-and-desktop)

Step 3：启动服务

```shell
npm run start # or `yarn start`
```

Step 4：访问站点

```shell
start http://localhost:3000 # 也可以手动访问
```

## 开发概要

项目 Web 端通过 **umi** 脚手架构建，基于 React 17，和 Antd 4 组件库实现了 UI/UX。在消息和后台通信，采用了 WebSocket 连接，通信内容格式为 WebSocket。
