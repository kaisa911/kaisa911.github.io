---
title: redux-devtools学习理解
date: 2018-05-11 16:52:11
tags: redux
categories: react
---
<h1>redux-devtools</h1>
A live-editing time travel environment for Redux.
redux-devtools是一个有趣而又高效的redux开发工具，通过redux-devtools，我们可以清晰的看到当前 store 仓库中的 state 是怎么样的，在可视化工具的左边，我们还可以看到触发的action的变化。这样，使得我们开发过程中很方便地进行调试。 

## 安装

```javascript
npm install --save-dev redux-devtools
npm install --save-dev redux-devtools-log-monitor
npm install --save-dev redux-devtools-dock-monitor
```
## 使用

* 通过createDevTools来创建`DevTools`组件

```javascript
import React from 'react'
//从redux-devtools中引入createDevTools
let DevTools;
if (process.env.NODE_ENV === 'development') {
  const {createDevTools} = require('redux-devtools');
  const LogMonitor = require('redux-devtools-log-monitor').default;
  const DockMonitor = require('redux-devtools-dock-monitor').default;

  DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h"
                 changePositionKey="ctrl-w"
                 defaultIsVisible={false}
                 defaultPosition="right">
      <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
    </DockMonitor>
  );
}
```
* 采用DevTools.instrument()通过redux的compose来扩展store

```javascript
export function configureStore(history, reducers, initialState) {
  // Installs hooks that always keep react-router and redux store in sync
  const middleware = [thunk, routerMiddleware(history)];
  if (process.env.NODE_ENV === 'development') { //开发环境
    const {createLogger} = require('redux-logger');
    middleware.push(createLogger());
  }

  let devTools = [];
  if (DevTools && typeof document !== 'undefined') {
    devTools = [DevTools.instrument()]
  }

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...devTools
    ));

  return store;
}
```
用createDevTools()创建的DevTools组件有个特殊的静态方法instrument(),它返回一个store的增强器,在开发中你需要在compose中使用。注意：DevTools.instrument()要放在applyMiddleware后，因为你的applyMiddleware可以存在异步行为，为了确保所有的actions显示在store中，所以要放在后面

* Render `<DevTools />`

```javascript
const store = configureStore();

render(
  <Provider store={store}>
    <div>
      <Router />
      <DevTools />
    </div>
  </Provider>
  document.getElementById('app')
);
```