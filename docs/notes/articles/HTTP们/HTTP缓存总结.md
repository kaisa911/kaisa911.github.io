---
title: HTTP缓存总结
date: 2020-08-17 23:05:26
tags: http
categories: HTTP
---

http 缓存包含两种类型：

- 强制缓存
- 协商（对比）缓存
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816230132530.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70#pic_center)

## 一、强制缓存

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816230210852.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70#pic_center)

## 二、协商缓存

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816230235934.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70#pic_center)

## 三、相关的头部属性

### 3.1 Cache-Control

cache-control 可以作为请求头和响应头的字段，在 http 请求的过程中出现。

- 请求头：
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816230326293.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70#pic_center)

* 响应头
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200816230400380.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70#pic_center)

### 3.2 Expires(http 1.0 时期产物，在 http1.1 时期呗 cache-control 替代)

### 3.3 Last-Modified （响应头）/ If-Modified-Since（请求头）

- Last-Modified：服务器在响应请求时，告诉浏览器资源的最后修改时间。
- If-Modified-Since：再次请求服务器时，通过此字段通知服务器上次请求时，服务器返回的资源最后修改时间。服务器收到请求后发现有头 If-Modified-Since 则与被请求资源的最后修改时间进行比对。

### 3.4 Etag（响应头） / If-None-Match（请求头）

- 优先级高于 Last-Modified / If-Modified-Since
- 第一次客户端访问资源的时候，服务端返回资源内容的同时返回了 ETag 的值，
- 第二次客户端访问资源的时候，客户端带上了 If-None-Match，它的值等于 Etag，如果相同，返回 304，如果不同，返回新资源
