---
title: 【core/observer】之set方法
date: 2020-07-08 13:03:23
tags: [vue]
categories: 源码学习
---

```js
/**
 * 在object上设置一个属性，并且如果该属性不存在，触发视图更新
 */
export function set(target: Array<any> | Object, key: any, val: any): any {
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`);
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  const ob = (target: any).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' &&
      warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
          'at runtime - declare it upfront in the data option.',
      );
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}
```

## vm.$set

`vm.$set( target, key, value)`

- **参数：** { Object | Array } target { striing | numbe r} key { any } value
- **返回值：** { any } value
- **用法** 在 Object 上设置一个属性，或者修改 Array 某个下标的值，如果该属性没有，就添加上并修改它，同时触发视图更新

## 注意：

**target 不能是 Vue 的实例，也不能是 Vue 实例的根数据对象。** 通过 target.\_isVue 和 ob.vmCount 来判断 **也不能给
undefined，null 和原始数据添加属性** 两个 warn 就是提示了这一点

## 一、target 是 array

```js
if (Array.isArray(target) && isValidArrayIndex(key)) {
  target.length = Math.max(target.length, key);
  target.splice(key, 1, val);
  return val;
}
```

就让 target 的长度等于 key 和 length 中最大的一个，同时修改 key 这个下标的值，然后返回这个值。

## 二、target 是对象

### 2.1 如果 key 是已有属性

```js
if (key in target && !(key in Object.prototype)) {
  target[key] = val;
  return val;
}
```

就直接赋值，然后返回 value

### 2.2 如果是新增数据

```js
const ob = (target: any).__ob__;
if (target._isVue || (ob && ob.vmCount)) {
  process.env.NODE_ENV !== 'production' &&
    warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
        'at runtime - declare it upfront in the data option.',
    );
  return val;
}
if (!ob) {
  target[key] = val;
  return val;
}
defineReactive(ob.value, key, val);
ob.dep.notify();
return val;
```

先获取了 target 的`__ob__`属性，然后判断不能是 vue 的实例和根目录，然后判断，如果不是响应式的数据，设置 key 和 value 如
果是响应式的，就需要追踪这个新属性的变化，使用 defineReactive 之后，将新增的属性转换成 getter/setter 属性，并触发改变，
通知依赖，然后返回该 value
