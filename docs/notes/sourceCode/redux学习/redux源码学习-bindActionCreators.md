---
title: redux源码学习--bindActionCreators
date: 2018-05-11 15:24:40
tags: [Javascript, react, redux]
categories: 源码学习
---
<h1>bindActionCreators</h1>

以前这样触发一个action，即dispatch(actionCreator(args))，现在变成这样触发一个action: boundActionCreator(args)。目的很单纯，简化某个action的调用。

Redux中的bindActionCreators，是通过dispatch将action包裹起来，这样可以通过bindActionCreators创建的方法，直接调用dispatch(action)(隐式调用）。一般情况下，我们可以通过Provider将store通过React的connext属性向下传递，bindActionCreators的唯一用处就是需要传递action creater到子组件，并且改子组件并没有接收到父组件上传递的store和dispatch。

实现上面那个效果，仅需一行代码，也就是源码文件中的第一个函数：
```javascript
// 返回一个函数fn：函数目的是将actionCreator绑定到dispatch上，不用麻烦调用dispatch(actionCreator(args))了
// 返回一个函数fn，该函数fn用dispatch来调用，其参数是actionCreator执行结果，
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}
```

## 参数理解
actionCreators: actionCreators是一个对象，它的值是actions creator函数。也可以传递一个函数。
`dispatch`: 等同于store中的store.dispatch，用于组合action

## 返回值
boundActionCreators: 返回一个boundActionCreators对象

```javascript
export default function bindActionCreators(actionCreators, dispatch) {
  //如果actionCreators是一个函数，则说明只有一个actionCreator，那直接调用bindActionCreator就行了
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  //如果是actionCreator是对象，或者是null的话，报错喽
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators}. ` +
      `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }

  //保持actionCreators里面原来的key，只是把key对应的value都转成了boundActionCreator
  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const actionCreator = actionCreators[key]
    //只对value是函数的key进行转换，其他的都过滤掉了
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }

  //返回绑定之后的对象
  return boundActionCreators
}
```
<h1>总结</h1>

bindActionCreators函数把actionCreators这个对象里面包含的每一个actionCreator按照原来的key的方式全部都封装了一遍。