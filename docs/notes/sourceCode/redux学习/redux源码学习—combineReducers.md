---
title: redux源码学习--combineReducers
date: 2018-05-11 14:16:47
tags: [Javascript, react, redux]
categories: 源码学习
---
<h1>combineReducers 理解</h1>

combineReducers.js文件对外暴露了一个函数combineReducers，combineReducer函数是redux的一个辅助性的函数，用于拆分createStore里面的第一个参数：reducer函数。combineReducer函数的返回值是一个函数，该函数是组合之后的一个标准的reducer函数。
combineReducers将多个值不同的reducer对象转换为单个reducer。它将调用每个子reducer，并将它们的结果收集到单个状态对象中，该对象的键对应于传递的reducer函数的键。

## 参数理解
`{reducers}`：一个对象，它的值对应于需要被组合成一个的不同的reducer函数。获得它的一种简便方法是使用ES6`import * as reducers`语法。对于任何的actions，reducer可能永远不会返回undefined。相反，如果传递给它们的state是undefined，则返回初始state，以及任何未识别action的当前state。
```javascript
let reducers = {
    usersId: function getUsersIdReducer(){}, 
    userName: function getUserNameReducer(){}
}
```
## 参数处理
* 从传入的参数里面提取出合法的reducers（reducers的每一个key对应的value值是函数，才是合法的子reducer），赋值给新的局部变量：finalReducers

```javascript
const reducerKeys = Object.keys(reducers)
//定义一个局部变量 finalReducers
const finalReducers = {}
for (let i = 0; i < reducerKeys.length; i++) {
  const key = reducerKeys[i]

  if (process.env.NODE_ENV !== 'production') {
    if (typeof reducers[key] === 'undefined') {
      warning(`No reducer provided for key "${key}"`)
    }
  }
  //过滤出reducers对应的value值是function的key，将其放入finalReducers对象
  if (typeof reducers[key] === 'function') {
    finalReducers[key] = reducers[key]
  }
}
```

* 校验finalReducers, 判断其每一个子reducer是否能返回正常的子state

```javascript
//取出过滤出来的有效的keys列表
const finalReducerKeys = Object.keys(finalReducers)

let unexpectedKeyCache
if (process.env.NODE_ENV !== 'production') {
  unexpectedKeyCache = {}
}

let shapeAssertionError
try {
  assertReducerShape(finalReducers)
} catch (e) {
  shapeAssertionError = e
}
```

* 调用assertReducerShape函数：

```javascript
//确认reducer是否是合法的reducer，即返回的state是不是undefined，如果是undefined，则是非法reducer
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(key => {
  const reducer = reducers[key]
  const initialState = reducer(undefined, {type: ActionTypes.INIT})

  //如果初始state是undefined，则抛出错误
  if (typeof initialState === 'undefined') {
    throw new Error(
      `Reducer "${key}" returned undefined during initialization. ` +
      `If the state passed to the reducer is undefined, you must ` +
      `explicitly return the initial state. The initial state may ` +
      `not be undefined. If you don't want to set a value for this reducer, ` +
      `you can use null instead of undefined.`
    )
  }
  
  //如果reducer是undefined，抛出错误
  if (
    typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined'
  ) {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. ` +
        `Don't try to handle ${
          ActionTypes.INIT
        } or other actions in "redux/*" ` +
        `namespace. They are considered private. Instead, you must return the ` +
        `current state for any unknown actions, unless it is undefined, ` +
        `in which case you must return the initial state, regardless of the ` +
        `action type. The initial state may not be undefined, but can be null.`
      )
    }
  })
}
```
## 返回值
combineReducers函数返回一个combination函数，combination是一个标准的reducer函数，有初始化的state参数，和一个携带了actionType和数据的action对象。
```javascript
return function combination(state = {}, action) {
  //如果有非法的reducer，就直接报错
  if (shapeAssertionError) {
    throw shapeAssertionError
  }

  if (process.env.NODE_ENV !== 'production') {
    const warningMessage = getUnexpectedStateShapeWarningMessage(
      state,
      finalReducers,
      action,
      unexpectedKeyCache
    )
    if (warningMessage) {
      warning(warningMessage)
    }
  }

  let hasChanged = false
  //定义新的nextState
  const nextState = {}
  // 1，遍历reducers对象中的有效key，
  // 2，执行该key对应的value函数，即子reducer函数，并得到对应的state对象，即子state
  // 3，将新的子state挂到新的nextState对象上，key不变
  for (let i = 0; i < finalReducerKeys.length; i++) {
    const key = finalReducerKeys[i]
    const reducer = finalReducers[key]
    const previousStateForKey = state[key]
    const nextStateForKey = reducer(previousStateForKey, action)
    if (typeof nextStateForKey === 'undefined') {
      const errorMessage = getUndefinedStateErrorMessage(key, action)
      throw new Error(errorMessage)
    }
    nextState[key] = nextStateForKey
    //如果hasChanged为true，那就是true了   后面的判断是，只要有一次nextStateForKey!== previousStateForKey不同，就说明整个state不同
    hasChanged = hasChanged || nextStateForKey !== previousStateForKey
  }
  //如果state发生变化了，直接返回新的nextState，否则，还是返回旧的state
  return hasChanged ? nextState : state
}
```

<h1>总结</h1>

* combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。

* 合并后的 reducer 可以调用各个子 reducer，并把它们的结果合并成一个 state 对象。state 对象的结构由传入的多个 reducer 的 key 决定。

* 每个传入 combineReducers 的 reducer 都需满足以下规则：

  所有未匹配到的 action，必须把它接收到的第一个参数也就是那个 state 原封不动返回。

  永远不能返回 undefined。当过早 return 时非常容易犯这个错误，为了避免错误扩散，遇到这种情况时 combineReducers 会抛异常。

  如果传入的 state 就是 undefined，一定要返回对应 reducer 的初始 state。根据上一条规则，初始 state 禁止使用 undefined。使用 ES6 的默认参数值语法来设置初始 state 很容易，但你也可以手动检查第一个参数是否为 undefined。
