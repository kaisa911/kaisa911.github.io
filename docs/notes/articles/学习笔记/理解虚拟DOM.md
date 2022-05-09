---
title: 理解虚拟DOM
date: 2018-08-23 14:23:07
tags: [Javascript, react]
categories: 学习笔记
---

- 什么是虚拟 DOM

Virtual DOM 就是一个模拟 DOM 树的 Javascript 的对象。

- 虚拟的 DOM 的核心思想

对复杂的文档 DOM 结构，提供一种方便的工具，进行最小化地 DOM 操作。

- React 工作原理

React 使用了虚拟 DOM，每次状态更新，React 比较虚拟 DOM 的差异之后，再更改变化的内容，最后统一由 React 去修改真实 DOM、完成页面的更新、渲染。

- Virtrual DOM 和真实 DOM 的区别

真实 DOM 的的工作流程：
大致分 5 步：创建 DOM tree –> 创建 Style Rules -> 构建 Render tree -> 布局 Layout –> 绘制 Painting

第一步，用 HTML 分析器，分析 HTML 的各种元素，构建一颗 DOM 树。

第二步：用 CSS 分析器，分析 CSS 文件和元素上的 inline 样式，生成页面的样式表。

第三步：将上面的 DOM 树和样式表，关联起来，构建一颗 Render 树。这一过程又称为 Attachment。每个 DOM 节点都有 attach 方法，接受样式信息，返回一个 render 对象（又名 renderer）。这些 render 对象最终会被构建成一颗 Render 树。

第四步：有了 Render 树后，浏览器开始布局，会为每个 Render 树上的节点确定一个在显示屏上出现的精确坐标值。

第五步：Render 数有了，节点显示的位置坐标也有了，最后就是调用每个节点的 paint 方法，让它们显示出来。

然而操作 DOM，浏览器会从构建 DOM 树开始从头到尾执行一遍流程。然而 DOM 的批量操作不会被合并，只会第一个 DOM 操作处理完之后再重新从构建 DOM 树开始第二个操作，一直到最后一个操作结束。

Virtrual DOM 的工作流程：
Virtrual DOM 会对批量的操作合并到 Virtrual DOM 树上，然后根据 diff 算法，查看哪一部分发生了变化，然后将 diff 的内容保存到本地的一个 js 对象里，然后这个对象再 attach 到 DOM 树上，通知浏览器重新绘制。

- 实现一个 Virtrual DOM

```javascript
//虚拟dom，参数分别为标签名、属性对象、子DOM列表
const VElement = (tagName, props, children) => {
  //保证只能通过如下方式调用：new VElement
  if (!(this instanceof VElement)) {
    return new VElement(tagName, props, children);
  }

  //可以通过只传递tagName和children参数
  if (util.isArray(props)) {
    children = props;
    props = {};
  }

  //设置虚拟dom的相关属性
  this.tagName = tagName;
  this.props = props || {};
  this.children = children || [];
  this.key = props ? props.key : void 666;
  let count = 0;
  util.each(this.children, (child, i) => {
    if (child instanceof VElement) {
      count += child.count;
    } else {
      children[i] = "" + child;
    }
    count++;
  });
  this.count = count;
};

VElement.prototype.render = () => {
  //创建标签
  const el = document.createElement(this.tagName);
  //设置标签的属性
  const props = this.props;
  for (let propName in props) {
    const propValue = props[propName];
    util.setAttr(el, propName, propValue);
  }

  //依次创建子节点的标签
  util.each(this.children, child => {
    //如果子节点仍然为velement，则递归的创建子节点，否则直接创建文本类型节点
    const childEl = child instanceof VElement ? child.render() : document.createTextNode(child);
    el.appendChild(childEl);
  });

  return el;
};
```

对一个虚拟的 DOM 对象 VElement，调用其原型的 render 方法，就可以产生一颗真实的 DOM 树
