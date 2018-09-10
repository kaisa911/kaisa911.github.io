---
title: 一些JS小技巧
date: 2018-08-23 17:08:51
tags: Javascript
categories: 学习笔记
---

整理一些自己遇到的 js 小技巧，希望以后能变成一个炫技派，哈哈哈～

0、对象深拷贝的小方法

```javascript
JSON.parse(JSON.stringify(obj));
```

1、数组去重

```javascript
const deleteSame = array => [...new Set(array)];
```
去重只能基本数据类型的，String，Number，Boolean, undefined, null, Symbol。
如果是对象，都不会去重。

2、用`Object.is(a, b)` 代替 `===`

```javascript
if (Object.is(a, b)) {
  //TODO
}
```

3、用`+ a`操作符去代替`Number(a)`

```javascript
const a = "123";
typeof a; // "string"
typeof Number(a); // "number"
typeof +a; // "number"
```

4、短路操作

```javascript
if (!foo) {
  foo = bar;
}

foo = foo || bar;
```

5、通过!!确认 bool 值

```javascript
const foo = false;
if (!!foo) {
  // TODO
}
```

6、判断变量的类型

```javascript
Object.prototype.toString.call(data);
// "[object String]"
// "[object Array]"
// "[object Number]"
// "[object Object]"
// "[object Function]"
// "[object Undefined]"
// "[object RegExp]"
```

7、`str.trim()`来清除前后空格

8、遍历对象的方法

```javascript
const obj = { "0": "a", "1": "b", "2": "c" };
Object.keys(obj).forEach(function(key) {
  console.log(key, obj[key]);
});
```
