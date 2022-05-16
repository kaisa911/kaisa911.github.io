---
title: JS包装对象
date: 2018-06-19 15:35:19
tags: [Javascript]
categories: Javascript
---

Q1: 什么是包装对象？
A1: JS 的数值，布尔，字符串类型的变量，在一定条件下，也可以自动变成对象，这就是原始类型的包装对象。

```javascript
let a = new Number(-1);
let b = new Boolean(true);
let c = new String('hello world');
```

Q2: 包装对象和同样的原始类型的值相等么，这么做有什么目的？
A2: 不想等。包装对象的最大目的，首先是使得 JavaScript 的对象涵盖所有的值，其次使得原始类型的值可以方便地调用某些方法。

```javascript
typeof a; //'object'
typeof b; //'object'
typeof c; //'object'

a === -1; //false
b === true; //false;
c === 'hello world'; //false
```

Q3: 包装对象有什么实例方法？
A3: 包装对象可以使用 object 对象提供的原生的方法，其中主要的就是 valueOf()和 toString()方法

```javascript
a.valueOf(); //-1
b.valueOf(); //true
b.valueOf(); //'hello world'

a.toString(); //'-1'
b.toString(); //'true'
b.toString(); //'hello world'
```

Q4: 原始类型和实例对象怎么转换？
A4: 原始类型的值，可以自动当作包装对象调用，即调用各种包装对象的属性和方法。这时，JavaScript 引擎会自动将原始类型的值转为包装对象实例，在使用后立刻销毁实例。
自动转换生成的包装对象是只读的，无法修改。所以，字符串无法添加新属性。

```javascript
let s = 'Hello World';
s.x = 123;
s.x; // undefined
```
另一方面，调用结束后，包装对象实例会自动销毁。这意味着，下一次调用字符串的属性时，实际是调用一个新生成的对象，而不是上一次调用时生成的那个对象，所以取不到赋值在上一个对象的属性。
