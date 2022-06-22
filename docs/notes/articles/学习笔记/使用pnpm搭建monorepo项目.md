---
title: 使用pnpm搭建monorepo项目
date: 2022-06-22 23:46:32
tags: [monorepo, pnpm]
categories: 学习笔记
---

Monorepo 这个东西，感觉已经听说了好久了，也仅仅的停留在了解这是个啥，但是却从来没有体验过，趁着闲下来这一段时间，研究了一下，来感受一下新技术带来的快感。

## 什么是 pnpm

pnpm(performance npm) 就是一个高效率的 npm，一个包管理器。它是由 npm/yarn 衍生而来，但解决了 npm/yarn 内部潜在的一些问题，提升了速度，提高了安全性，扩展了使用场景。pnpm 支持 monorepo，可以使用 pnpm 来搭建 monorepo 项目

## 什么是 monorepo

Monorepo 是管理项目代码的一个方式，指在一个项目仓库 (repo) 中管理多个模块/包 (package)，不同于常见的每个模块建一个repo。

在整个项目里，会有项目整体的依赖，每个模块也会有自己的依赖，可以减轻整个项目的依赖关系。同时，也可以把某些模块整体的安装到另外的模块中，避免了多个 repo 的代码和版本差异等。

## 开始

### 安装 pnpm 和创建项目

首先要用 pnpm，就需要安装一下

```bash
npm i pnpm -g
```

简单的安装一下，就可以使用 pnpm 来安装依赖了

创建项目，在 root 目录下创建一个 pnpm-workspace.yaml 的文件

```bash
mkdir monorepo-demo
cd monorepo-demo
touch pnpm-workspace.yaml

```

在 pnpm-workspace.yaml 中添加配置，把所有相关的包放在 packages 里面，test 里一般放单测的内容，就不放在里面了

```yaml
packages:
  # 所有在 packages/  子目录下的 package
  - 'packages/**'
  # 不包括在 test 文件夹下的 package
  - '!**/test/**'
```

在root目录下，可以创建packages目录，用来存放每个模块，创建几个模块，比如（utils，user，login等），用来处理不同的模块，然后分别pnpm init他们，给他们的name改成@projectName/name（比如@monorepo/utils）一定要有name，方便在外层安装依赖等

```
mkdir packages
cd packages
mkdir utils user login
```

### 安装依赖

安装公用依赖，全局依赖可以安装在root目录下，可以使用

```bash
pnpm i vue@^3.0.0 -w # -w 是 workspace
# or
pnpm i vue@^3.0.0 -r # -r 是 root

```

如果想安装在某个模块的局部依赖，可以有两种方法：

1. 直接 cd 打开某个模块，或者vscode打开该模块文件夹，在该模块里面安装相应的依赖

```bash
pnpm i axios -S
```

2. 在根目录使用```--filter```来过滤name

```bash
pnpm i axios -S --filter @monorepo/login
```

### 模块引用

如果有一个模块，你想在其他模块中使用，比如你有一个公共的组件，或者公共的工具库，也可以直接在模块中安装使用

比如在@monorepo/utils模块里init，创建index.js

```bash
pnpm init
touch index.js
```

并在index.js里添加一些方法

```js
export const add = (a, b) => a + b;

export const subtract = (a, b) => a - b;

export default { add, subtract };
```

然后在根目录执行

```bash
pnpm i @monorepo/utils -r --filter @monorepo/login
```

就会在login的package.json里发现多了一个依赖，因为是workspace负责管理的，所以会现实由workspace安装而来

```json
{
  "name": "@monorepo/demo",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "start": "vite"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "less": "^4.1.3",
    "@monorepo/utils": "workspace:^1.0.0", // workspace 
    "view-ui-plus": "^1.3.0"
  }
}
```

然后就可以在项目里直接使用了

```js
import utils from '@monorepo/utils';
console.log(utils);
// { add: f, substract: f }
```

这样就几乎已经完成了这个monorepo的搭建了，在项目中，就可以把原来src中的一些模块，拆分出来，把公用的依赖放到root目录下，把公用模块按需安装到其他模块中，就可以正常开发了。

## 开发

在开发中，只需要打开某一个模块，单独开发，也可以，这样就可以暂时剥离了monorepo的概念。也可以在根目录下，cd到模块目录开发。效果都是一样的

[Github地址](https://github.com/kaisa911/monorepo-demo)