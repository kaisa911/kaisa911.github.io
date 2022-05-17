---
title: 【core/observer】之delete方法
date: 2020-07-12 21:26:25
tags: [vue]
categories: 源码学习
---

```js
/* @flow */

import type Watcher from './watcher';
import { remove } from '../util/index';
import config from '../config';

let uid = 0;

/**
 * dep是一个可观察的，可以有多个订阅它的指令
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  addSub(sub: Watcher) {
    this.subs.push(sub);
  }

  removeSub(sub: Watcher) {
    remove(this.subs, sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    // 首先确定订阅列表
    const subs = this.subs.slice();
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs如果不是异步执行的就不是按顺序的
      // 我们需要对他们排序，以确保它们以正确的顺序触发
      subs.sort((a, b) => a.id - b.id);
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

// 当前正在评估的观察目标
// 这是全局唯一的target，因为一个时刻内，
// 就只会有一个观察者函数在执行
Dep.target = null;
const targetStack = [];

export function pushTarget(target: ?Watcher) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
```

## Dep 类

先来聊聊观察者模式：观察者模式是一种实现一对多关系解耦的行为设计模式。它主要涉及两个角色：`观察目标`、`观察者`。观察者要
直接订阅观察目标，观察目标一做出通知，观察者就要进行处理

Vue 源码中实现依赖收集，实现了三个类：

- Dep：扮演观察目标的角色，每一个数据都会有 Dep 类实例，它内部有个 subs 队列，subs 就是 subscribers 的意思，收集依赖数据
  的观察者，当数据变更时，调用 dep.notify()通知观察者 。
- Watcher：扮演观察者的角色，进行观察者函数的包装处理。
- Observer：辅助的可观测类，数组/对象通过它的转化，可成为可观测数据。

Dep 类就是用来收集和触发依赖的地方，所有的依赖都放在 subs 队列里。

### 收集依赖

```js
addSub (sub: Watcher) {
  this.subs.push(sub)
}
depend () {
  if (Dep.target) {
    Dep.target.addDep(this)
  }
}
```

之前，在之前的 defineReactive 方法的在 getter 里的时候，会触发 dep.depend()方
法![在这里插入图片描述](https://img-blog.csdnimg.cn/20200712210718834.png) 这就是把 target 的依赖放进 subs 队列里，存储
起来调用 depend()的时候，不直接把 Dep.target 加入 dep.subs，而是调用了 Dep.target.addDep ，为了保证 dep.subs 里的每个
watcher 都是唯一，所以才不直接把当前 watcher 塞入 dep.subs 里。所以 depend 方法其实就是调用了 watcher 里的 addDep 方法。

### 触发依赖

```js
notify () {
  // 首先确定订阅列表
  const subs = this.subs.slice()
  if (process.env.NODE_ENV !== 'production' && !config.async) {
    // subs如果不是异步执行的就不是按顺序的
    // 我们需要对他们排序，以确保它们以正确的顺序触发
    subs.sort((a, b) => a.id - b.id)
  }
  for (let i = 0, l = subs.length; i < l; i++) {
    subs[i].update()
  }
}
```

setter 里执行完成值变更后，通知 watcher 进行更新。setter 能在父级里访问到 dep，所以就能获得 dep.subs，就知道有哪些
watcher 依赖于当前数据，值更新后，通过调用 dep.notify()，来遍历 dep.subs 里的 watcher，执行每个 watcher 的 update()方法
，让每个 watcher 进行更新。

### Dep.target

JavaScript 是单线程，在 vue 中，虽然有多个观察者函数（watcher），但是一个时刻内，就只会有一个观察者函数在执行，那么此刻
正在执行的那个观察者函数，所对应的 Watcher 实例，便会被赋给 Dep.target 这一类变量，从而只要访问 Dep.target 就能知道当前
的观察者是谁。

```js
// 当前正在评估的观察目标
// 这是全局唯一的target，因为一个时刻内，
// 就只会有一个观察者函数在执行
Dep.target = null;
const targetStack = [];

export function pushTarget(target: ?Watcher) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
```
