---
title: for 循环作用域的探究
date: 2018-09-29 14:22:18
tags: Javascript
categories: Javascript
---

之前看到这么一个题，问最后输出什么？

```javascript
for (let i = (setTimeout(() => console.log(i), 2333), 0); i < 2; i++) {}
```

答案是在 2333ms 之后，输出了 0。

一直在想什么原因。今天闲着没事重新在看阮一峰 es6 入门，然后想起来这个问题。

es6 入门的 let 和 const 的那一章里，他说了一个问题：

<b>for 循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。</b>

```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

** 因为输出了 3 遍 abc，这表明函数内部的变量 i 与循环变量 i 不在同一个作用域，有各自单独的作用域。**

我 google 了一下，发现：

```javascript
for (let i = 0; i < 3; i++)
```

在声明的（）内存在一个变量 i，会存在 JavaScript 引擎内部。 每一次循环的时候， JavaScript 引擎内部会记住上一轮循环的值，然后将新的 i 的值赋值给 i。

```javascript
{
  let i = 'abc';
  console.log(i);
}
```

在循环体里面，这是一个新的作用域，重新声明一个 i；不会影响（）里 i 的值。

```javascript
for (let i = 0; i < 3; i++) {
  i = 'abc';
  console.log(i);
}
// abc
```

但是如果不声明 i，直接给 i 赋值，会影响（）里 i 的值，说明（）是循环体的上一级作用域，在循环体里直接改变 i 的值会影响上一级作用域里的 i 值。

回到最初的那道题里面：

for 循环有三个语句：

```javascript
for (语句 1; 语句 2; 语句 3)
  {
  被执行的代码块
  }
```

语句 1 在循环（代码块）开始前执行，就是 for()之前开始执行，只会执行一次。并且在 js 引擎里记住这个变量，他的值随着条件改变。

语句 2 定义运行循环（代码块）的条件。

语句 3 在循环（代码块）已被执行之后执行。

语句1如下：

```javascript
let i = (setTimeout(() => console.log(i), 2333), 0);
```

这个表达式，同步执行的时候，因为括号里是逗号表达式，所以返回了 0，i=0；同时把 setTimeout 放到了 macrotasks 中。并继续向下执行。


这个题目，就会变成这样了

```javascript
{
  let o = (setTimeout(() => console.log(o), 2333), 0);
  for (let i = o; i < 2; i++) {
    let j = i;
    console.log(j);
  }
}
```
就好理解了


