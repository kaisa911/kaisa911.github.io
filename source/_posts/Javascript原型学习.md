---
title: Javascript原型学习
date: 2018-10-09 11:21:29
tags: Javascript
categories: 学习笔记
---

- `prototype`是函数才有的一个属性。

- 函数的 prototype 属性指向了一个对象，这个对象正是<b>调用该构造函数而创建的<i>实例</i></b>的原型。

- 原型可以理解成：每一个 JS 对象（null 除外），在创建的时候，就会与之关联另一个对象，这个对象就是我们说的原型。每个对象都会从原型继承属性。

- 每一个 JS 对象（null 除外）都有一个`_proto_`的属性，该属性指向该对象的原型。

- 每一个原型都会有一个`constructor`属性，指向关联的构造函数。

- 原型也是一个对象，是通过`Object()`构造函数生成的。

- `Object.prototype`没有原型

- 关系图
![关系图](https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype5.png)
