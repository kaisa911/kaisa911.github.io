---
title: window.location的属性
date: 2018-06-10 11:23:35
tags: Javascript
categories: Javascript
---
关于http的相关的BOM的问题

获取当前url的协议
```javascript
const protocol = window.location.protocol;
```
获取当前的host和端口号
```javascript
const host = window.location.host;
```
获取当前完整的URL
```javascript
const host = window.location.href;
```
获取当前pathName
```javascript
const host = window.location.pathname;
```
获取当前url的查找内容
```javascript
const host = window.location.search;
```