# Neutron IM

**此分支是一个暂存版本，最终目的是过度 JavaScript/Java 版本的后台到 C++**

Neutron IM 是一款社区向的即时通讯应用。

## 一、概述

| 目录                     | 描述               |                                                              |
| ------------------------ | ------------------ | ------------------------------------------------------------ |
| neutron-im-server        | 为网页定制的服务端 | 服务端，基于 Spring Boot 与 Redis                            |
| neutron-im-static-server | 静态资源文件       | 如图片等静态资源文件，因须占用大量的 IO性能，因此使用了独立为一个仓库 |
| neutron-im-web           | 网页前端           | 网页端，基于 Umi 构建的 React 应用。为主要应用               |
| neutron-im-desktop       | 桌面端             | 桌面端，服务端采用 NIO，MySQL，前端使用 Swing                |

## 二、快速开始

1. 导入数据库 `doc/sql` 中最新版本的 SQL 脚本
2. 配置好 `http` 和 `server` 模块中的 SQL 配置和 Redis 配置
3. 构建项目
4. 如果是运行桌面端，则运行 `desktop` 和 `server` 中的入口文件；若是运行网页端的服务端，则运行 `http` 中的入口文件，并同时开启网页端和静态服务器端
