---
title: Javascript基本概念（四）
date: 2018-06-19 14:32:32
tags: Javascript
categories: JS高程填坑笔记
---

这是 JS 高程第三章的第四部分。
本节的主要内容是

- 语句
- 函数

## 语句

### if 语句

`if (condition) statement1 else statement2`
eg:

```javascript
if (i > 25) {
  alert('Greater than 25.');
} else if (i < 0) {
  alert('Less than 0.');
} else {
  alert('Between 0 and 25, inclusive.');
}
```

### do-while 语句

后测试循环语句

```javascript
do {
  statement;
} while (expression);
```

### while 语句

前测试循环语句
`while(expression) statement`

```javascript
var i = 0;
while (i < 10) {
  i += 2;
}
```

### for 语句

前测试循环语句
`for (initialization; expression; post-loop-expression) statement`

```javascript
var count = 10;
for (var i = 0; i < count; i++) {
  alert(i);
}
```

### for-in 语句

精准迭代语句，可以用来枚举对象属性
`for (property in expression) statement`

```javascript
for (var propName in window) {
  document.write(propName);
}
```

### label 语句

`label: statement`

```javascript
start: for (var i = 0; i < count; i++) {
  alert(i);
}
```

这个例子中的 start 标签，可以在将来由 break 和 continue 语句引用，加标签的语句一般都要与 for 语句等循环语句配合使用。

### break 和 continue 语句

break 语句会立即跳出循环，然后执行循环后的代码
continue 语句会跳出循环，然后从循环顶部开始执行循环。

### switch 语句

```javascript
switch (expression) {
  case value:
    statement;
    break;
  case value:
    statement;
    break;
  case value:
    statement;
    break;
  default:
    statement;
}
```

## 函数

ES 中采用 function 来声明一个函数，后面跟一组参数和函数体，函数会在执行完 return 语句之后停止并立即退出。

```javascript
function functionName(arg0, arg1,...,argN) {
    statements
}
```

### 参数理解
函数内部通过一个数组arguments来接收参数。arguments对象只是与数组很像，但是并不是Array的实例。
可以用arguments[0]来获取内部的元素。
ECMAScript 中的所有的参数传递的都是值，不可能通过引用传递参数

### 没有重载
ES中的函数没有重载
