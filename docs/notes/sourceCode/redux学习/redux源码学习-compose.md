---
title: redux源码学习--compose
date: 2018-05-11 13:48:56
tags: [Javascript, react, redux]
categories: redux源码学习
---
<h1>compose</h1>
compose 是一个从右向左编写单参数组成的函数。最右边的函数可以接受多个参数，因为它提供了签名由此产生的复合函数。

## 参数理解
`{...funcs}`需要合成的多个函数。每个函数都接收一个函数作为参数，然后返回一个函数。

## 返回值
`(Function)` 从右到左把接收到的函数合成后的最终函数。

## 代码理解
```javascript
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  //对参数进行一个累加，就是依次以右边的参数作为左边方法的参数累加到最左边
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```
<h1>总结</h1>
compose 主要用于 applyMiddleware / createStore enhancer.
compose 做的只是让你不使用深度右括号的情况下来写深度嵌套的函数
compose的运行结果是一个函数，调用这个函数所传递的参数将会作为compose最后一个参数的参数，从而由内向外，逐步调用。


