---
title: react生命周期理解
date: 2018-05-22 14:13:57
tags: [Javascript, react]
categories: react
---
<h1>react组建的生命周期</h1>

React组件的生命周期有两种情况，初次渲染和状态更新导致再次渲染。
React 生命周期分为三种状态 1. 挂载 2.更新 3.销毁

## 组件加载

组件的初次挂载，有以下几个步骤，分别是
1、构造函数，指定This，初始状态，绑定函数（constructor）
2、组件安装（componentWillMount）
3、将组建或者虚拟DOM元素渲染到真实的DOM上（render）
4、组件生成，DOM查找等(componentDidMount)


## 组件更新

组件的更新，有三种情况：
1.父组件的props发生更新
2.调用this.forceUpdate更新（重复componentWillUpdate方法之后的操作）
3.调用this.setState方法更新组件state,触发组件更新

### 状态更新

步骤：
1、构造函数，指定This，初始状态，绑定函数（constructor）
2、组件安装（componentWillMount）
3、将组建或者虚拟DOM元素渲染到真实的DOM上（render）
4、组件生成，DOM查找等(componentDidMount)
5、组建更新状态(componentWillUpdate)
6、将组建或者虚拟DOM元素渲染到真实的DOM上（render）
7、组建更新完成(componentDidUpdate)

### 调用this.forceUpdate更新

当组件调用forceUpdata方法更新时，会进入componentWillUpdate方法。
直接跳过shouldComponentUpdtavoid
之后执行render函数更新DOMReactElement 
执行完render函数之后执行componentDidUpdata,
除了首次render之后调用componentDidMount，其它render结束之后都是调用componentDidUpdate。


### 父组建更新props

步骤：
1、父组件构造函数，指定This，初始状态，绑定函数（constructor）
2、父组件安装（componentWillMount）
3、父组件或者虚拟DOM元素渲染到真实的DOM上（render）
4、子组件或者虚拟DOM元素渲染到真实的DOM上（render）
5、父组件生成，DOM查找等(componentDidMount)
6、父组建更新状态(componentWillUpdate)
7、父组件或者虚拟DOM元素渲染到真实的DOM上（render）
8、子组件接收父组件props(componentWillReceiveProps)
9、子组件判断是否更新(shouldComponentUpdate)
10、子组建更新状态(componentWillUpdate)
11、子组件或者虚拟DOM元素渲染到真实的DOM上（render）
12、子组件更新完成(componentDidUpdate)
12、父组件更新完成(componentDidUpdate)

## 组件销毁

单页应用中，切换页面原组件需要销毁释放资源，如果原组件中有定时器等不能销毁时，需要在componentWillUnmount中清理资源占用，手动销毁定时器。

<h1>总结</h1>

![react生命周期](https://github.com/kaisa911/studyNotes/blob/master/public/image/reactLifeCycle.png?raw=true)