# 📚 图书信息平台 - 前端

## 概述

该项目是一个综合性图书管理系统，针对三种不同用户角色（系统管理员、工作人员和读者）进行了细致的功能设计。系统管理员具备全面的用户管理能力，包括创建、查询、修改及删除工作人员和单位信息，以及对图书信息进行维护管理。其特点在于，在图书和单位管理中，均设有详尽的操作列，如查看详情、修改和删除，并确保图书在删除前必须处于归还状态。

工作人员则专注于图书管理、图书借阅、借入借出管理和统计分析管理四大模块，能够进行图书信息的入库、修改、维护、查询，以及图书的借出、流入流出管理。工作人员仅能管理本单位图书，且在图书流通环节，可查阅并发起与其他单位的图书流通申请。

读者用户需注册账户后方可查看系统内的图书信息，拥有账户注册与管理、图书信息查看以及图书借阅与归还等功能。读者借阅图书的过程需经过工作人员审核，归还图书后会更新借阅状态。

整体系统设计强调了用户友好性和安全性，统一支持登录、密码重置以及个人信息修改，并在登录验证、资源操作权限控制等方面做了充分考虑。此外，系统还提供了便捷的数据统计分析工具，助力图书馆运营决策。

## 项目基本信息

项目体验地址：http://book.jarvlis.top, 目前体验服务器配置：1 核 2G

前端：

- HTML + CSS + JavaScript 三件套
- React 开发框架
- Ant Design Pro 项目模板
- Ant Design 端组件库
- Umi 开发框架
- Umi Request 请求库

后端：https://github.com/Jarvlis/bookSystem-backend

- Java8 编程语言
- Spring + SpringMVC + SpringBoot2.7 框架
- MyBatis 数据访问框架
- MySQL 数据库
- jUnit 单元测试库

## 项目内容目录

- [开始上手](##开始上手)

- [系统功能架构](##系统功能架构)

- [运行展示](##运行展示)

- [API 设计](##API设计)

- [License](##License)

## 开始上手

```bash
// clone源代码或者下载代码包
$ git clone https://github.com/Jarvlis/bookSystem-frontend.git
```

## 环境准备

下载依赖包 `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## 提供命令

### 启动项目

```bash
npm start
```

### 构建项目

```bash
npm run build
```

### 查验代码风格

```bash
npm run lint
```

接着就可以运行啦，记得同时要启动后端哦！！

项目运行在: http://localhost:8000

## 系统功能架构

![系统架构图](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/f4a3b622-5894-4ea4-b28e-eb84894f8ddc)

功能架构图

![功能模块图](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/1bd4ebbc-a9da-4f36-89a4-e6a1646f20f8)

功能模块图

## 运行展示

(求求各位，为了其他人能够正常浏览，不要随意删除和修改数据，欢迎注册使用) 管理员登录，默认账户：admin，密码：123；

工作人员 staff1, 账户：staff1, 密码：123456789

工作人员 staff2, 账户：staff1, 密码：123456789

读者 reader, 账户：reader，密码：123456789

🏔️ 登录界面：

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/dcc5c1b4-739b-41f5-8763-5d4b958857f3)

🏔️ 成功登录界面：

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/1adcc8d1-1b35-4864-a860-5f6a442293af)

🏔️ 用户管理界面：

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/4ae3e392-e474-4faf-a44e-b49a61f7325a)

🏔️ 用户添加界面：此处的下拉列表是发送请求，请求所有的注册部门所获得的：

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/e8f5ad8b-9179-4908-8d0b-973cfbaef3b9)

🏔️ 图书管理界面：

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/a7629466-9c8c-46b2-bb7b-6f2b54d8d4bf)

🏔️ 单位管理界面：

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/96e52b75-8fb9-415c-83bf-b21008e745ff)

🏔️ 个人中心：

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/e42c439b-c637-48b7-818d-fdd3b01e82d9)

🏔️ 图书流通界面(部分)：

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/5e2332c1-c24d-4daa-ba7b-cbd09263c168)

在单位 1 的工作人员中流通管理中，可以看到发起申请的流通信息：

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/690f3e5a-32bc-4f6e-a56d-15518edf53a7)

单位 2 的工作人员的图书流出界面显示：

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/73272e22-9443-41da-93c4-87c10c85f6ca)

🏔️ 图书借阅管理界面(部分)：

🏔️ 读者发起申请界面：

借阅申请成功发起界面：

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/ce8175fe-3e2a-481f-8fad-356c20845854)

工作人员图书借出界面：

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/8c392f80-604b-4337-9633-0e274c383c70)

🏔️ 统计分析管理界面：

均为动态数据，会根据数据库表自动生成

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/700d7a1c-c544-45b0-aaa7-ad305e84e72f)

## API 设计

模块接口设计：

![image](https://github.com/Jarvlis/bookSystem-backend/assets/96105888/98134a03-162b-495d-b4cf-8e27af22e7a5)

本系统采用 knife4j 生成接口文档，部署系统后可通过 http://localhost:8080/api/doc.html 进行访问，也可见附录文件夹，提供了 doc 文档和 html 文档进行查看。定义各个模块之间的接口，包括输入参数、输出结果和调用方式。

## License

MIT License
