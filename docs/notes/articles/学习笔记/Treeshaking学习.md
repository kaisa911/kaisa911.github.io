---
title: Tree shaking学习
date: 2020-09-02 10:59:53
tags: [Tree Shaking]
categories: 学习笔记
---

## 一、Tree shaking 是什么

> Tree shaking 是一个通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code) 行为的术语。它依赖于 ES2015 中的 import
> 和 export 语句，用来检测代码模块是否被导出、导入，且被 JavaScript 文件使用。

## 二、Tree shaking 的原理

### 2.1 原理

Tree shaking 的本质是移除掉无用的 js 代码。无用代码移除存在于各种 compiler 中，compiler 会根据代码的 export 和 import 的关系，判断出一些代码没有用到，或者注释掉了等，删除不会影响逻辑，然后把他们移除掉，这个过程就是 DCE（dead codeelimination）。

在 ES6 里引入了 ES Module 这样的静态的模块，ES Module 依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是 tree-shaking 的基础。能够把依赖树静态地推导出解析语法树。

### 2.2 在 webpack 中配置

在 webpack2 中就支持了 Tree shaking，在 webpack4 中，需要将 mode 设置为 production 即可开启 Tree shaking 同时，也可以通过 package.json 的 sideEffects 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 “pure”，由此可以安全地删除文件中未使用的部分。

```json
{
  "name": "tree-shaking",
  "sideEffects": false
}
```

如果所有代码都不包含副作用，可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export 导出。

```json
{
  "name": "tree-shaking",
  "sideEffects": ["./src/common/polyfill.js"]
}
```

如果代码有一些副作用，那么可以改为提供如上数组

## 三、Tree shaking 为什么摇不动

### 3.1 Babel

Babel 可以把 ES6 及以上的代码转化成浏览器支持的代码。也正是因为 Babel 的出现，才让 FEr 不用去考虑各种浏览器的兼容的问题。

但是也正是因为 Babel 的编译，让很多代码可能有了 sideEffects。Babel 默认把所有的 module 编译成 require 的形式，但是这个是动态的模块，webpack 不能进行 Tree shaking，所以要在.babelrc 里处理一下，不要把 import 转换成 require。

```json
{
  "presets": [
    [
      "env",
      {
        "modules": false //关键点
      }
    ],
    "stage-2",
    "react"
  ]
}
```

### 3.2 代码的问题

在写代码的时候，不要写一些 IIFE 里引用外部变量的问题，多写一些 pure 的函数。
