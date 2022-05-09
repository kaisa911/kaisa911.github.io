---
title: redux 源码学习——createStore
date: 2018-05-11 10:07:29
tags: [Javascript, react, redux]
categories: 源码学习
---
<h1>createStore 理解</h1>

创建一个保存state树的Redux store，store，可以让你阅读state，发送actions，并订阅更改。改变store数据的唯一方法是调用`dispatch（）`方法。
应用中只能有一个store，指定state树的不同部分如何响应actions，可以通过使用`combineReducers`方法来组合多个reducer，将其转换为单个reducer。


## 返回值
createStore.js是redux的核心文件，对外暴露了一个createStore函数，函数执行后返回一个对象，这个对象包括四个方法，分别是dispatch, subscribe, getState, replaceReducer。这些方法都redux中store的关键方法，后面将慢慢的展开理解。
```javascript
export default function createStore(reducer, preloadedState, enhancer) {
    //other codes
    return {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
        [$$observable]: observable
      }
}
```
## createStore 的参数理解
createStore有三个参数：reducer, preloadedState, enhancer。
* reducer：reducer是一个函数，通过给定当前state树和要处理的actions，返回下一个state树。
* preloadedState：初始state，初始状态。您可以选择指定它从应用程序的服务器中来融合state，或者还原先前序列化的用户会话。如果使用`combineReducers`来生成根reducer函数，则必须是一个与“combineReducers”键相同的对象。
* enhancer：store增强器。您可以选择指定它通过第三方功能增强store，如中间件，时间旅行，持久化等。Redux附带的唯一store增强器是`applyMiddleware（）`方法。
这个参数特别有意思，如果该enhancer参数存在的话，会将当前的createStore函数作为参数传入enhancer函数，并且，enhancer执行之后得到一个新函数，该新函数其实就是一个加强版的createStore函数，新的函数会把之前的reducer和preloadeState作为参数传入并执行。这个enhancer参数为redux中间件提供了入口。

## 参数检查及异常处理
```javascript
//如果没有传preloadedState参数，但是enhancer参数传了，把两者交换一下
if (typeof preloadedState === 'function' && typeof enhancer === 'undefined')          
  {
    enhancer = preloadedState
    preloadedState = undefined
  }
//如果enhancer传了，但是不是函数，就抛出错误，否则执行enhancer函数，
//并继续执行enhancer函数返回的加强版的createStore函数，
//参数reducer以及preloadeState和原createStore函数保持一致
if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    return enhancer(createStore)(reducer, preloadedState)
  }
//如果reducer不是函数，则抛出错误
if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
}
```
## 定义局部变量
```javascript
let currentReducer = reducer //保存了当前的reducer函数，该reducer函数可以被动态替换掉
let currentState = preloadedState //保存了当前的state数据
let currentListeners = [] //保存了当前注册的函数列表
let nextListeners = currentListeners
let isDispatching = false  //是否正在dispatch一个action
```
## 定义返回store的方法
```javascript
//确保nextListeners和currentListeners不是同一个引用
function ensureCanMutateNextListeners() {
  if (nextListeners === currentListeners) {
    //如果是同一个引用，则浅拷贝currentListeners到nextListeners
    nextListeners = currentListeners.slice()
  }
}
```
```javascript
//getState函数，返回局部变量currentState，以获取当前状态
function getState() {
  return currentState
}
```
```javascript
//注册一个函数，将注册函数放入局部变量nextListeners数组里面
//注册函数的返回值是一个注销函数，注销函数执行可以将刚刚添加进nextListeners的listener函数又删除掉。这里很有意思，外部必须在调用subscribe执行现场保存好unsubscribe函数，否则将无法注销一个函数
function subscribe(listener) {
  //如果listener不是函数，直接报错
  if (typeof listener !== 'function') {
    throw new Error('Expected listener to be a function.')
  }

  let isSubscribed = true
  //确保nextListeners不是currentListeners，以保证修改的是nextListeners，而不是currentListeners
  ensureCanMutateNextListeners()
  //将监听函数放入监听函数列表尾部
  nextListeners.push(listener)

  //返回一个函数，该函数可以从监听函数列表中删除刚刚注册的监听函数
  return function unsubscribe() {
    if (!isSubscribed) {
      return
    }

    isSubscribed = false

    ensureCanMutateNextListeners()
    const index = nextListeners.indexOf(listener)
    nextListeners.splice(index, 1)
  }
}
```
```javascript
//触发action的函数：每次触发一个action，currentListeners中的所有函数都要执行一遍
function dispatch(action) {
  //如果action不是普通的对象，直接报错
  if (!isPlainObject(action)) {
    throw new Error(
      'Actions must be plain objects. ' +
      'Use custom middleware for async actions.'
    )
  }
  //如果action没有type属性，直接报错：说明action对象必须要包含type字段
  if (typeof action.type === 'undefined') {
    throw new Error(
      'Actions may not have an undefined "type" property. ' +
      'Have you misspelled a constant?'
    )
  }
  //如果当前正在触发另外一个action，直接报错
  if (isDispatching) {
    throw new Error('Reducers may not dispatch actions.')
  }

  try {
    //先将标志位置为true
    isDispatching = true
    //执行传入的reducer函数，该函数返回一个新的state对象，并赋值给currentState变量
    currentState = currentReducer(currentState, action)
  } finally {
    //reducer函数执行完成后，将isDispatching恢复成false，方便下次action的触发
    isDispatching = false
  }

  //每一次触发一个action，所有的监听函数都要全部重新执行一遍，
  //并且把上次得到的新的监听函数列表赋值成为当前的监听函数列表。这是一个懒操作，并不是在subscribe的时候就操作了，而是在dispatch的时候才操作
  const listeners = currentListeners = nextListeners
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i]
    listener()
  }

  //该dispatch函数的返回值是原来的action
  return action
}
```
```javascript
//替换reducer函数：这个函数允许运行时动态替换最开始调用createStore函数时传入的reducer，并且替换掉reducer之后，重新dispatch一个action，得到全新的currentState对象
function replaceReducer(nextReducer) {
  //如果nextReducer不是函数，直接报错
  if (typeof nextReducer !== 'function') {
    throw new Error('Expected the nextReducer to be a function.')
  }
  //把新的reducer赋值给当前的currentReducer变量，得到一个全新的currentReducer
  currentReducer = nextReducer
  // 触发一个初始action：
  // 1.这样就可以完成一次监听函数列表的全部调用
  // 2.可以得到一个全新的currentState；
  dispatch({type: ActionTypes.INIT})
}
```
```javascript
function observable() {
  const outerSubscribe = subscribe
  return {
    /**
      * The minimal observable subscription method.
      * @param {Object} observer Any object that can be used as an observer.
      * The observer object should have a `next` method.
      * @returns {subscription} An object with an `unsubscribe` method that can
      * be used to unsubscribe the observable from the store, and prevent further
      * emission of values from the observable.
      */
    subscribe(observer) {
      if (typeof observer !== 'object') {
        throw new TypeError('Expected the observer to be an object.')
      }

      function observeState() {
        if (observer.next) {
          observer.next(getState())
        }
      }

      observeState()
      const unsubscribe = outerSubscribe(observeState)
      return {unsubscribe}
    },

    [$$observable]() {
      return this
    }
  }
}
```
## 初始化:
初始化很简单，一句代码，直接调用一次dispatch，就会执行所有的注册函数，并且执行reducer函数，生成初始化的state
```javascript
//马上内部调用一次初始化的操作，根据传入的reducer函数，preloadedState生成一个全新的currentState和全新的reducer
dispatch({type: ActionTypes.INIT})
```

<h1>总结</h1>

* createStore函数定义了几个局部变量用于记录状态，主要包括currentState记录数据状态，currentListeners记录注册函数列表，currentReducer记录当前的reducer函数。
* 定义了几个函数用于修改上面的几个局部变量：主要包括getState函数用于获取currentState；replaceReducer用于替换currentReducer；subscribe用于修改currentListeners列表；dispatch用于触发currentReducer执行，生成新的currentState，并且，执行currentListeners列表中的每一个函数。