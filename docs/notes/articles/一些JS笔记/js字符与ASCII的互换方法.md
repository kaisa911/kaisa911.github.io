---
title: js字符与ASCII的互换方法
date: 2019-01-28 14:36:23
tags: [Javascript]
categories: Javascript
---

大写字母 A-Z 对应的 ASCII 码值是 65-90
小写字母 a-z 对应的 ASCII 码值是 97-122

将字母转为 ASCII 码的方法：

```js
var string = 'A';
string.charCodeAt(); // 65
```

将 ASCII 码转为对应字母的方法：

```js
var number = 97;
String.fromCharCode(number); // 'a'
```
