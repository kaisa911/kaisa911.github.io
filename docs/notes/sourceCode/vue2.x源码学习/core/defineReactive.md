---
title: 【core/observer】之defineReactive方法
date: 2020-07-07 13:38:37
tags: [vue]
categories: 源码学习
---

```js
/**
 * 在object上定义一个响应式的属性
 */
export function defineReactive(obj: Object, key: string, val: any, customSetter?: ?Function, shallow?: boolean) {
  const dep = new Dep();

  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // 满足预定义的 getter/setters
  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  let childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return;
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    },
  });
}
```

### 概述

这个方法，就是把对象`obj`里的属性`key`变成一个 getter/setter 形式的响应式的属性。同时在 getter 的时候收集依赖，并在
setter 的时候触发依赖。

### 相关内容

1. `const dep = new Dep()` 这条语句，是初始化了一个依赖的实例，用来把用到该属性的依赖都放在这里面。
2.

```js
const property = Object.getOwnPropertyDescriptor(obj, key);
if (property && property.configurable === false) {
  return;
}
```

这部分代码，是通过`getOwnPropertyDescriptor()`方法来判断该属性`key`是否是自有属性，`getOwnPropertyDescriptor()`方法返回
该属性的属性描述`property descriptor`，通过 configurable 判断该属性能否修改，不能修改就返回

3.

```js
// 满足预定义的 getter/setters
const getter = property && property.get;
const setter = property && property.set;
if ((!getter || setter) && arguments.length === 2) {
  val = obj[key];
}
```

这部分代码，承接上面的，如果该属性是自有属性，getter/setter，如果没有 getter 有 setter，而且只传了 2 个参数，那就给 val
赋值一下。

4.

```js
let childOb = !shallow && observe(val);
```

这部分的代码，是函数中的 val 很有可能会是一个数组，通过上一篇的`observe`方法，就可以拿到数组的 Observer 实例（childOb）
，最后可以通过 childOb 的 dep 执行 depend 方法来收集依赖。

5. 下面的`Object.defineProperty()`方法，是 Vue2.x 里响应式的核心，把属性变成了 getter 和 setter 的形式，
6. get 方法

```js
get: function reactiveGetter () {
  const value = getter ? getter.call(obj) : val
  if (Dep.target) {
    dep.depend()
    if (childOb) {
      childOb.dep.depend()
      if (Array.isArray(value)) {
        dependArray(value)
      }
    }
  }
  return value
},
```

get 方法就是把该属性的值返回去，同时收集依赖，记录哪些地方用到了该属性。因为该属性的值有可能是数组，所以判断，如果
childOb 存在，那就把通过 childOb.dep.depend()来收集依赖。同时使用 dependArray，来递归的收集数组子元素的依赖

```js
/**
 * 因为我们不能像拦截器那样获取属性的getter，
 * 所以通过该方法，在数组被访问的时候收集依赖
 */
function dependArray(value: Array<any>) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
```

7. set 方法

```js
set: function reactiveSetter(newVal) {
  const value = getter ? getter.call(obj) : val;
  /* eslint-disable no-self-compare */
  if (newVal === value || (newVal !== newVal && value !== value)) {
    return;
  }
  /* eslint-enable no-self-compare */
  if (process.env.NODE_ENV !== 'production' && customSetter) {
    customSetter();
  }
  // #7981: for accessor properties without setter
  if (getter && !setter) return;
  if (setter) {
    setter.call(obj, newVal);
  } else {
    val = newVal;
  }
  childOb = !shallow && observe(newVal);
  dep.notify();
}
```

set 方法，就是把新的值 newVal，赋值给旧的 val，如果有以前的 setter，就用以前的 setter，如果没有 setter，就返回。最后新的
值添加`__ob__`属性，然后触发该属性的依赖，通知他们去变更
