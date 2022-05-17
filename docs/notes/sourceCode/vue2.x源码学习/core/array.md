---
title: 【core/observer】之array处理方法
date: 2020-07-14 21:54:11
tags: [vue]
categories: 源码学习
---

```js
/*
 * 因为flow不能很好的处理动态获取Array原型上的方法，
 * 所以该文件不进行类型检查
 */

import { def } from '../util/index';

const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

/**
 * 拦截变更的方法，并emit事件
 */
methodsToPatch.forEach(function (method) {
  // 缓存原始的方法
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args);
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    // 触发更新
    ob.dep.notify();
    return result;
  });
});
```

### 数组拦截器

因为在 Object 时，可以采用 getter/setter 的方法来监控数据，但是 Array 可以通过原型上的方法来处理数据，这样就监听不到了。
所以要将原型上的方法拦截，并返回拦截的方法。

```js
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);
```

拦截器其实就是一个和 Array.prototype 一样的对象，只不过这个对象的一些可以改变数组自身内容的方法，是经过处理的。
`Object.create()`方法会创建一个新对象，并使用先用对象来提供新创建对象的`__proto__`属性。

```js
const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
```

这是 Array 原型中可以改变数组自身内容的 7 个方法

```js
def(arrayMethods, method, function mutator(...args) {
  const result = original.apply(this, args);
  const ob = this.__ob__;
  let inserted;
  switch (method) {
    case 'push':
    case 'unshift':
      inserted = args;
      break;
    case 'splice':
      inserted = args.slice(2);
      break;
  }
  if (inserted) ob.observeArray(inserted);
  // 触发更新
  ob.dep.notify();
  return result;
});
```

引入的 def 方法，def 方法在 Observer 类的时候讲过，它是用来处理数据的，给数据添加一个属性，因为拦截器是原型方法，所以可
以直接通过`this.__ob__`来访问 observer 实例。

mutator 方法返回了需要返回一个值，赋值给 arrayMethods[method]，在 mutator 中，执行了原来 Array.prototype 上的方法，并且
触发了当前 observer 实例的依赖变更，同时把值返回出去。

```js
let inserted;
switch (method) {
  case 'push':
  case 'unshift':
    inserted = args;
    break;
  case 'splice':
    inserted = args.slice(2);
    break;
}
if (inserted) ob.observeArray(inserted);
```

所以在执行上面 7 个方法的时候，实际执行的就是 mutator 里的方法，在侦测数据变化的时候，用 inserted 来暂存新增的数据，然后
如果有新数据，使用 Observer 来侦测他们。
