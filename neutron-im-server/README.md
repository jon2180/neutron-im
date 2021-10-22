# Neutron IM 服务器端 Neutron IM Server

## 一、概述

## 二、项目结构

本项目构建系统为 Gradle 7.x （不断更新）。

### 二·一 模块系统

- `http` 模块：网页端对应后台服务，基于 Spring Boot 框架和 WebSocket 协议通信。

### 二·二 技术方案

- `MySQL 8.x` 持久化关系型数据库
- `Redis` 基于内存的键值对存储数据库

## 三、快速开始

1. 导入数据库 `doc/sql` 中最新版本的 SQL 脚本
2. 配置好 `http` 模块中的 SQL 配置和 Redis 配置
3. 构建项目
4. 运行服务端：位于 `http` 中的入口文件，并同时开启网页端和静态服务器端
