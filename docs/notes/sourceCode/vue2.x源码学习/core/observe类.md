---
title: 【core/observer】之Observer类
date: 2020-07-06 13:55:57
tags: [vue]
categories: 源码学习
---

```js
/**
 * Observer 类会附加到每一个被侦测的Object上
 * 一旦被附加上，Observer会将Object的所有属性都转换
 * 为getter/setter的形式来手机属性的以来
 * 并且当属性变化时会通知这些依赖
 */
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // 具有该对象作为根$data的vm的数量

  constructor(value: any) {
    this.value = value;
    this.dep = new Dep(); // 用来存放array的依赖
    this.vmCount = 0;
    /**
     * 给每一个值的原型上新增一个‘__ob__‘属性
     * ‘__ob__‘属性的值就是当前Observer的实例
     * 通过这个属性就可以拿到数组的依赖了
     */
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  /**
   * walk方法会将每一个属性都转换成getter/setter
   * 的形式来侦测变化，这个方法只在数据类型时
   * Object的时候被调用
   */
  walk(obj: Object) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }

  /**
   * 侦测一个数组中的每一项
   */
  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}
```

### 概述：

对于 Observer 类，这个类，就是给每一个对象，添加一个 `__ob__` 属性，并且把这个对象，变成 getter/setter 形式。变成这样的
形式呢，会方便收集依赖，并且在数据发生变化的时候，通知各个依赖。

### 相关方法

1. `Dep` 类里面使用`this.dep = new Dep()`，是为了存放数组的依赖，因为数组在 getter 的时候收集依赖，在拦截器里触发依赖，
   将数组的依赖放在 Observer 的实例上，是为了让数组的 getter 和拦截器中都能访问到。

2. `def()` 这个方法，是用来处理 value，给它添加一个`__ob__`的属性，这个属性的值就是当前 Observer 的实例，因为数组的依赖
   保存在 Observer 的实例上，所以添加这个值，就可以在拦截器中访问 Observer 实例，并拿到相应的依赖。

```js
/**
 * 定义一个属性.
 */
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}

// Observer 类中
def(value, '__ob__', this);
```

3. 判断 value 是对象还是数组，如果是对象的话，就走 walk 方法，walk 方法就是把 object 自身有的属性遍历一边，然后
   用`defineReactive()`方法全部转换成 getter/setter 形式
4. 如果是数组对象，就需要先判断一下，浏览器能不能支持`__proto__`这个属性，为什么要判断这个属性？因为数组的某些原型中的方
   法，需要覆盖，通过判断`hasProto`来用两种方法来处理覆盖 value 原型的功能，支持`__proto__`，使用`protoAugment()`函数覆
   盖原型，如果不支持，则调用`copyAugment()`函数将拦截器中的方法挂载到 vulue 上。

```js
/**
 * 使用__proto__截取原型链来增强目标对象或数组
 */
function protoAugment(target, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
```

```js
/**
 * 通过定义一个隐藏属性来增强目标对象或数组
 */
/* istanbul ignore next */
function copyAugment(target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    def(target, key, src[key]);
  }
}
```

5. `observeArray()`方法循环 Array 中的每一项，执行 observe 函数来侦测变化，通过 observe 函数，将数组中的每一个元素都执行
   一遍`new Observer()`。
6. `observe()`

```js
/**
 * 尝试为value创建一个Observer的实例。
 * 如果创建成功，直接返回新创建的Observer实例
 * 如果value已经存在一个Observer实例，就直接返回它
 */
export function observe(value: any, asRootData: ?boolean): Observer | void {
  // 不是对象或者不是VNode的实例，就返回
  if (!isObject(value) || value instanceof VNode) {
    return;
  }
  let ob: Observer | void;
  // 有observer实例就返回该实例
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  // 否则返回新增的实例
  return ob;
}
```
