---
title: window.location的属性
date: 2018-06-10 11:23:35
tags: [Javascript]
categories: Javascript
---

关于 http 的相关的 BOM 的问题

获取当前 url 的协议

```javascript
const protocol = window.location.protocol;
```

获取当前的 host 和端口号

```javascript
const host = window.location.host;
```

获取当前完整的 URL

```javascript
const host = window.location.href;
```

获取当前 pathName

```javascript
const host = window.location.pathname;
```

获取当前 url 的查找内容

```javascript
const host = window.location.search;
```
