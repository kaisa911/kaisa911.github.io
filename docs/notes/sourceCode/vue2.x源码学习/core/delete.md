---
title: 【core/observer】之delete方法
date: 2020-07-10 13:17:38
tags: [vue]
categories: 源码学习
---

```js
/**
 * 删除一个属性，并在需要的时候触发依赖变更.
 */
export function del(target: Array<any> | Object, key: any) {
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn(`Cannot delete reactive property on undefined, null, or primitive value: ${(target: any)}`);
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }
  const ob = (target: any).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' &&
      warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }
  if (!hasOwn(target, key)) {
    return;
  }
  delete target[key];
  if (!ob) {
    return;
  }
  ob.dep.notify();
}
```

## vm.$delete

`vm.$delete( target, key)`

参数

- { Object | Array } target
- { string | number } key

用法：删除对象的属性，如果对象是响应式的，就触发更新视图。目的是为了避开 delete Objeect 属性不能被检测到的限制。

delete 方法和 set 方法差不多，首先不能在原始数据，undefined，null 上删除属性

### target 是数组

```js
if (Array.isArray(target) && isValidArrayIndex(key)) {
  target.splice(key, 1);
  return;
}
```

就只需要判断，key 是 valid 的就删除掉这个 key

### target 是对象

delete 方法，也不可以在 vue 的实例上或者 vue 的根数据对象上操作

#### key 是自身属性

```js
const ob = (target: any).__ob__;
delete target[key];
if (!ob) {
  return;
}
ob.dep.notify();
```

就和 set 方法一样，先获取 observer 的实例，然后删除 target 的 key 属性，然后判断是否是响应式的数据来触发更新视图

#### key 不是自身属性

```js
if (!hasOwn(target, key)) {
  return;
}
```

就直接返回
