---
title: BOM 学习
date: 2018-07-10 15:54:21
tags: Javascript
categories: JS高程填坑笔记
---
这是js高程的第8章，这是我第一次系统的学习bom，以前都是随便用，也没有成体系的东西，这次要好好学习一下。
主要内容：
 理解 window 对象——BOM 的核心 
 控制窗口、框架和弹出窗口
 利用 location 对象中的页面信息 
 使用 navigator 对象了解浏览器

## window对象
BOM的核心对象是window，它表示浏览器的一个实例。在浏览器中，window对象有双重角色，它既是通过JavaScript访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象

1、1全局作用域
由于 window 对象同时扮演着 ECMAScript 中 Global 对象的角色，因此所有在全局作用域中声明的变量、函数都会变成 window 对象的属性和方法