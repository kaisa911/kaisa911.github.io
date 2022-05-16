---
title: Event Loop 问题理解
date: 2018-05-09 10:08:43
tags: [Javascript]
categories: Javascript
---
Q1:事件循环机制是什么？
A1:JavaScript 是典型的单线程单并发语言，即表示在同一时间内其只能执行单个任务，同域浏览器中 JavaScript 主线程拥有一个函数调用栈(主线程)以及多个任务队列。

Q2:什么是任务？
A2:任务分为两种，一种是同步任务，一种是异步任务。
      同步任务，就是主线程中排队执行的任务；
      异步任务，不先进入主线程，而是先进入“任务队列”的任务，只有任务队列通知了主线程，某个异步任务可以执行了，该任务才会进入主线程执行

Q3:事件循环（Event Loop）的原理是什么？
A3:首先，主线程会依次执行代码。
    当主线栈的函数调用栈为空时，即会根据事件循环（Event Loop）机制来从任务队列中提取出待执行的回调并执行。
    执行的过程同样会进行函数帧的入栈出栈操作。这样不断的循环往复，这就是事件循环（Event Loop）。
    只要主线程空了，就会去读取”任务队列”，这就是JavaScript的运行机制

Q4:任务队列中的任务有几种？
A4:任务队列中的任务分为两种：MacroTask (task) 和 MicroTask 。Event Loop 处理这两种任务。

Q5:MacroTask (task) 和 MicroTask各包含什么任务？
A5: 
## microtasks:
    process.nextTick
    promise
    Object.observe
    MutationObserver
## macrotasks:
    setTimeout
    setInterval
    setImmediate
    I/O
    UI渲染

Q6:MacroTask和MicroTask的运行机制是什么？
A6:事件循环的顺序，决定了JavaScript代码的执行顺序。它从script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的microtask。当所有可执行的micro-task执行完毕之后。循环再次从macro-task开始，找到其中一个任务队列执行完毕，然后再执行所有的micro-task，这样一直循环下去。
一句话说，microtask将会被添加到任务队列末尾进行处理。

MacroTask运行机制
![MacroTask运行机制](https://github.com/kaisa911/studyNotes/blob/master/public/image/macroTask.png?raw=true)
MicroTask运行机制
![MicroTask运行机制](https://github.com/kaisa911/studyNotes/blob/master/public/image/microTask.png?raw=true)
Q7:来尝试一道面试题
```javascript
console.log('start')

const interval = setInterval(() => {  
  console.log('setInterval')
}, 0)

setTimeout(() => {  
  console.log('setTimeout 1')
  Promise.resolve()
      .then(() => {
        console.log('promise 3')
      })
      .then(() => {
        console.log('promise 4')
      })
      .then(() => {
        setTimeout(() => {
          console.log('setTimeout 2')
          Promise.resolve()
              .then(() => {
                console.log('promise 5')
              })
              .then(() => {
                console.log('promise 6')
              })
              .then(() => {
                clearInterval(interval)
              })
        }, 0)
      })
}, 0)

Promise.resolve()
    .then(() => {  
        console.log('promise 1')
    })
    .then(() => {
        console.log('promise 2')
    })
```
A7:start 
promise 1 
promise 2 
setInterval 
setTimeout 1 
promise 3 
promise 4 
setInterval 
setTimeout 2 
promise 5 
promise 6