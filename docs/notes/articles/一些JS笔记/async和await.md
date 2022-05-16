---
title: async和await
date: 2019-01-11 16:29:52
tags: [Javascript]
categories: Javascript
---

## async 有什么作用

`async` 函数（包含函数语句、函数表达式、Lambda 表达式）会返回一个 Promise 对象，如果在函数中 return 一个直接量，`async` 会把这个直接量通过`Promise.resolve()`封装成 Promise 对象。

```js
async function test() {
  return '1';
}
console.log(test()); // -> Promise {<resolved>: "1"}
```

如果`async`函数没有返回值，它会返回 `Promise.resolve(undefined)`。

Promise 的特点——无等待，所以在没有`await`的情况下执行`async`函数，它会立即执行，返回一个 Promise 对象，并且，绝不会阻塞后面的语句。这和普通返回 Promise 对象的函数并无二致。

## await 有什么作用

`await`等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，就是没有特殊限定）。

因为`async`函数返回一个 Promise 对象，所以`await` 可以用于等待一个`async`函数的返回值——这也可以说是`await`在等`async`函数，但要清楚，它等的实际是一个返回值。注意到`await`不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，`await` 后面实际是可以接普通函数调用或者直接量的。

```js
var b = async () => {
  var a = 0;
  a = a + (await 10);
  console.log('1', a); // -> '1' 10
  a = (await 10) + a;
  console.log('2', a); // -> '2' 20
};
b();
```

await 表达式的运算结果取决于它等的东西。
如果`await`后的表达式不是一个 Promise 对象，那`await` 表达式的运算结果就是它的结果。

如果`await`后的表达式是一个 Promise 对象，`await` 会阻塞后面的代码，等着 Promise 对象`resolve`，然后得到`resolve`的值，作为`await`表达式的运算结果。

`await` 只能用在 async 里面

## async/await 做了什么事？

`async`会将其后的函数的返回值封装成一个 Promise 对象，而 `await`会等待这个 Promise 完成，并将其`resolve` 的结果返回出来。

```js
function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('finish');
      resolve('sleep');
    }, 2000);
  });
}
async function test() {
  let value = await sleep();
  console.log('object');
}
test();
```

在这个函数里，`await`会等待 sleep() 返回一个值，先打印`finish`，然后再打印`object`。

## 一段代码

```js
var a = 0;
var b = async () => {
  a = a + (await 10);
  console.log('2', a); // -> '2' 10
  a = (await 10) + a;
  console.log('3', a); // -> '3' 20
};
b();
a++;
console.log('1', a); // -> '1' 1
```

首先函数 b 先执行，在执行到 await 10 之前变量 a 还是 0，因为在 await 内部实现了 generators ，generators 会保留堆栈中东西，所以这时候 a = 0 被保存了下来<br />

因为 await 是异步操作，遇到 await 就会立即返回一个 pending 状态的 Promise 对象，暂时返回执行代码的控制权，使得函数外的代码得以继续执行，所以会先执行 console.log('1', a)<br />

这时候同步代码执行完毕，开始执行异步代码，将保存下来的值拿出来使用，这时候 a = 10<br />

然后后面就是常规执行代码了