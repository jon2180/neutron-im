# Neutron IM 桌面端和服务器端 Neutron IM Server & Desktop

## 一、概述

Neutron IM 是一个即时通讯应用，分别有[桌面端](//github.com/jon2180/neutron-im/tree/main/desktop)
，和[网页端](//github.com/jon2180/neutron-im-web)。此外，如图片等静态资源文件，因须占用大量的 IO
性能，因此使用了独立为一个仓库 [neutron-im-static-server](//github.com/jon2180/neutron-im-static-server)。

## 二、项目结构

本项目构建系统为 Gradle 7.x （不断更新）。

### 二·一 模块系统

- `core` 模块：其他项目都有可能会用到的依赖
- `desktop` 模块：桌面端实现，基于 Swing 实现。
- `server` 模块：桌面端对应的服务端实现，基于 NIO 与客户端实现通信，序列化方案采用 protobuf。
- `http` 模块：网页端对应后台服务，基于 Spring Boot 框架和 WebSocket 协议通信。

### 二·二 技术方案

- `MySQL 8.x` 持久化关系型数据库
- `Redis` 基于内存的键值对存储数据库

## 三、快速开始

1. 导入数据库 `doc/sql` 中最新版本的 SQL 脚本
2. 配置好 `http` 和 `server` 模块中的 SQL 配置和 Redis 配置
3. 构建项目
4. 如果是运行桌面端，则运行 `desktop` 和 `server` 中的入口文件；若是运行网页端的服务端，则运行 `http` 中的入口文件，并同时开启网页端和静态服务器端

## 功能实现情况

惨不忍睹，客观笑笑就行。

- [ ] 文字聊天
- [ ] 图片发送
- [ ] 群聊
- [ ] Socket 通信会出现的问题： 掉线检测，身份获知，异常处理与垃圾回收，粘包，丢包，断开重连
