---
title: redux源码学习--applyMiddleware
date: 2018-05-11 16:03:07
tags: [Javascript, react, redux]
categories: redux源码学习
---
<h1>applyMiddleware理解</h1>

中间件的本质是作为enhancer而存在的。它是通过createStore方法传递到redux的内部中的,中间件模块是一个高阶函数
下面是redux中间件的基本格式：
```javascript
const reduxMiddleware = ({dispatch, getState}[简化的store]) => (next[上一个中间件的dispatch方法]) => (action[实际派发的action对象]) => {}
```

```javascript
export default function applyMiddleware(...middlewares) {
  // middlewares就是我们传递给applyMiddlewarez函数的一系列中间件函数
  return (createStore) => (...args) => {
    // createStore就是redux用于创建store的方法,args === [reducers, preloadedState]。下面这句话就是在中间件的内部，使用我们传递的参数创建一个store对象
    // 注：这一块没有传递enhancer,所以返回的就是我们经常使用的store对象
    const store = createStore(...args)
    // 获取store对象的dispatch方法
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }
    // 传递给中间件的第一层的函数的参数，
    const middlewareAPI = {
      getState: store.getState,
      // 重写了dispatch方法，其实就是store.dispatch(...args)
      dispatch: (...args) => dispatch(...args)
    }

    /** 
     * 着重给大家详细的解释一下这一块
     * 假设我们给applyMiddleware函数传递的中间件是
     * applyMiddleware(
     *      f1 => g1 => h1(...arg) => {},
     *      f2 => g2 => h2(...arg) => {}
     * )
     * 运行下面的这行代码之后，chain中保存的内容是
     * chain = [g1 => h1(...arg) => {}, g2 => h2(...arg) => {}]
     */
    
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    /**
     * 当我们把chain传入到 compose中后，根据我们对compose的分析，
     * compose(...chain)(store.dispatch)的结果就是:
     * g1(h2(...arg)) => h1(...arg)
     * 
     * 也就是说，按照上面的这个形式，下面的dispatch和h1函数是一样的，所以，h1的参数，就是我们需要派发的action，当我们调用dispatch的时候，其实就相当于调用h1(action)，而在h1的内部，这个action是由g1的参数
     * 也就是h2进行派发的，所以这个时候action就传递到了h2的内部，而h2的参数是由g2的参数，也就是实际传入的store.dispatch进行派发的，就这样层层传入，层层输出，就形成了我们强大的中间件机制。
     */
    dispatch = compose(...chain)(store.dispatch)

    // 返回的也是一个store对象
    return {
      ...store,
      // 这个dispatch其实就是，各个中间件的最底层(第三层)的哪个函数组成的圆环函数构成的
      dispatch
    }
  }
}
```