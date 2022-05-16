---
title: PWA 之Q&A
date: 2018-05-08 16:11:07
tags: [PWA]
categories: 学习笔记
---
——吉吉《PWA初窥》学习笔记

Q1：什么是PWA？
A1: PWA全称Progressive Web App，即渐进式WEB应用。一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用. 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能

Q2: PWA解决了什么问题？
A2:  1)  可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
       2）实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能
       3）实现了消息推送

Q3:  App Manifest 是什么，有什么用？
A3:  Web应用程序清单在一个JSON文本文件中提供有关应用程序的信息（如名称，作者，图标和描述）。manifest 的目的是将Web应用程序安装到设备的主屏幕，为用户提供更快的访问和更丰富的体验。

Q4:  什么是service worker，有什么作用？
A4:  Service Worker 是 Chrome 团队提出和力推的一个 WEB API，用于给 web 应用提供高级的可持续的后台处理能力。
        Service Workers 就像介于服务器和网页之间的拦截器，能够拦截进出的HTTP 请求，从而完全控制你的网站。

Q5:  service worker 有什么特点？
A5：1）resource caching and push notifications
        2）client-side programmable proxy between web app and the outside world
        3）service workers run independent of the application they are associated with
        4）the primary uses for a service workers are to act as a caching agent to handle network requests 
        5）and to store content for offline use and secondly to handle push messaging the
        6）information that you need to persist and reuse across restartswork with IndexedDB databases
        7）promise-based
        8）only available on secure origins(https)

Q6: HTTP缓存与service worker缓存有什么区别
A6: HTTP缓存
       Web 服务器可以使用 Expires 首部来通知 Web 客户端，它可以使用资源的当前副本，直到指定的“过期 
       时间”。反过来，浏览器可以缓存此资源，并且只有在有效期满后才会再次检查新版本。
       使用 HTTP 缓存意味着你要依赖服务器来告诉你何时缓存资源和何时过期。
       service worker缓存
       Service Workers 的强大在于它们拦截 HTTP 请求的能力
       进入任何传入的 HTTP 请求，并决定想要如何响应。在你的 Service Worker 中，可以编写逻辑来决定 
       想要缓存的资源，以及需要满足什么条件和资源需要缓存多久。一切尽归你掌控！
       ![service worker缓存](https://github.com/kaisa911/studyNotes/blob/master/public/image/hc.png?raw=true)

Q7: service worker的生命周期是怎样的？
A7: ![生命周期](https://github.com/kaisa911/studyNotes/blob/master/public/image/lifecycle.png?raw=true)

Q8: 怎么配置一个PWA
A8: 1）准备一个html文件，以及相应的css等：
```html
<head>
  <title>Minimal PWA</title>
  <meta name="viewport" content="width=device-width, user-scalable=no" />
  <link rel="stylesheet" type="text/css" href="main.css">
  <link rel="manifest" href="manifest.json" />
</head>
<body>
  <h3>Revision 1</h3>
  <div class="main-text">Minimal PWA, open Console for more~~~</div>
</body>
```

2）添加manifest.json文件

```json
{
  "name": "Minimal app to try PWA",
  "short_name": "Minimal PWA",
  "display": "standalone",
  "start_url": "/",
  "theme_color": "#8888ff",
  "background_color": "#aaaaff",
  "icons": [
    {
      "src": "e.png",
      "sizes": "256x256",
      "type": "image/png"
    }
  ]
}
```
3)添加Service Worker<br/>
Service Worker 在网页已经关闭的情况下还可以运行, 用来实现页面的缓存和离线, 后台通知等等功能。sw.js 文件需要在 HTML 当中引入:
```html
<script>
  if (navigator.serviceWorker != null) {
    navigator.serviceWorker.register('sw.js')
    .then(function(registration) {
      console.log('Registered events at scope: ', registration.scope);
    });
  }
</script>
```
4)处理静态缓存
```javascript
var cacheStorageKey = 'minimal-pwa-1'

var cacheList = [
  '/',
  "index.html",
  "main.css",
  "e.png"
]
```
借助 Service Worker, 可以在注册完成安装 Service Worker 时, 抓取资源写入缓存:
```javascript
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheStorageKey)
    .then(cache => cache.addAll(cacheList))
    .then(() => self.skipWaiting())
  )
})
```
调用 self.skipWaiting() 方法是为了在页面更新的过程当中, 新的 Service Worker 脚本能立即激活和生效。
5）处理动态缓存
网页抓取资源的过程中, 在 Service Worker 可以捕获到 fetch 事件, 可以编写代码决定如何响应资源的请求:
```javascript
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response != null) {
        return response
      }
      return fetch(e.request.url)
    })
  )
})
```
真实的项目当中, 可以根据资源的类型, 站点的特点, 可以专门设计复杂的策略。fetch 事件当中甚至可以手动生成 Response 返回给页面。
6)更新静态资源
缓存的资源随着版本的更新会过期, 所以会根据缓存的字符串名称(这里变量为 cacheStorageKey, 值用了 "minimal-pwa-1")清除旧缓存, 可以遍历所有的缓存名称逐一判断决决定是否清除(备注: 简化的写法, Promise.all 中 return undefined 可能出错, 见评论):

```javascript
self.addEventListener('activate', function(e) {
  e.waitUntil(
   Promise.all(
        cacheNames.filter(name => {
          return name !== cacheStorageKey
        }).map(name => {
          return caches.delete(name)
        })
      ).then(() => self.clients.claim())
     })
  )
})
```
在新安装的 Service Worker 中通过调用 self.clients.claim() 取得页面的控制权, 这样之后打开页面都会使用版本更新的缓存。旧的 Service Worker 脚本不再控制着页面之后会被停止。


相关文章：
* [PWA 入门: 写个非常简单的 PWA 页面](https://zhuanlan.zhihu.com/p/25459319)
* [讲讲PWA](https://segmentfault.com/a/1190000012353473)
* [您的第一个 Progressive Web App](https://developers.google.cn/web/fundamentals/codelabs/your-first-pwapp/)



