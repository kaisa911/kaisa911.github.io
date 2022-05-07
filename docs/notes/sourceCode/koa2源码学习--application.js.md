---
title: koa2源码学习--application.js
date: 2018-05-24 14:00:14
tags: [Koa, Node]
categories: koa2源码学习
---
一直很想研究下koa2，虽然还是小白一枚，但终于决定入坑koa2。之前只知道koa2采用了ES2015和ES2016的一些东西，还知道洋葱头的中间件的运行机制。还是先研究一下源码，学习一下大神写代码的畅快感。

把代码拉下来之后，发现lib里只有四个源码文件：application.js, context.js, request.js, response.js。

application.js 是koa的入口文件,是一个构造函数，它暴露整个应用的class, 这个class继承自node自带的events，并且把 context、request 和 response 属性指向了原型链指向其他三个文件导出对象的实例。

application暴露了一些公用的api, 比如listen，use, callback等。

下面来研究一些application.js的源码

```javascript

'use strict';

/**
 * 依赖的模块
 */

const isGeneratorFunction = require('is-generator-function'); //判断函数是否为generator函数
const debug = require('debug')('koa:application'); //调试模式
const onFinished = require('on-finished'); //HTTP请求关闭，完成或错误时执行回调。
const response = require('./response'); //reponse.js
const compose = require('koa-compose'); //koa中间件组合工具
const isJSON = require('koa-is-json'); //检查body应该是一个json格式
const context = require('./context'); //上下文context.js
const request = require('./request'); //request.js
const statuses = require('statuses'); ////http状态工具status(403) // => 'Forbidden'，可以通过code转换成msg，也可以通过msg转换成code
const Cookies = require('cookies'); //提供一个读写cookie的API
const accepts = require('accepts'); //一个比较高级的API用来http处理请求中的接受类型，
const Emitter = require('events'); //node的events模块？
const assert = require('assert'); //通过状态码进行断言？
const Stream = require('stream'); //流文件？
const http = require('http'); // node的http模块？
const only = require('only'); //返回白名单中的值。其实就是根据一个列表获取一个对象中的部分属性返回一个obj
const convert = require('koa-convert'); //提供function *的语法的转换器
const deprecate = require('depd')('koa'); //提示？

/**
 * 暴露一个application的类
 * 继承自 `Emitter.prototype`.
 */

module.exports = class Application extends Emitter {
  /**
   * 初始化一个新的 `Application`.
   *
   * @api public
   */

  constructor() {
    super();

    //定义下面的属性
    this.proxy = false; //代理
    this.middleware = []; //中间件的队列
    this.subdomainOffset = 2; //对于要忽略的 .subdomains 偏移[2]
    this.env = process.env.NODE_ENV || 'development'; //env默认是 NODE_ENV 或 "development"
    this.context = Object.create(context); //创建一个新context对象，使用context对象来提供新创建的对象的__proto__。 
    this.request = Object.create(request);//创建一个新request对象
    this.response = Object.create(response);//创建一个新response对象
  }

  /**
   * Shorthand for:
   *
   *    http.createServer(app.callback()).listen(...)
   *
   * @param {Mixed} ...
   * @return {Server}
   * @api public
   */

  //listen(),调用node的createServer方法，返回一个服务器。参数为端口号，
  listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());//
    return server.listen(...args);
  }

  /**
   * Return JSON representation.
   * We only bother showing settings.
   *
   * @return {Object}
   * @api public
   */

  //toJSON 方法，通过only方法，把key放到obj里 返回一个object对象
  toJSON() {
    return only(this, [
      'subdomainOffset',
      'proxy',
      'env'
    ]);
  }

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */
  //检查,返回一个object对象
  inspect() {
    return this.toJSON();
  }

  /**
   * 把给定的中间件函数fn，推入到middleware队列中
   *
   * 以前写法的中间件将会被转换
   *
   * @param {Function} fn
   * @return {Application} self
   * @api public
   */


  use(fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    if (isGeneratorFunction(fn)) {
      deprecate('Support for generators will be removed in v3. ' +
                'See the documentation for examples of how to convert old middleware ' +
                'https://github.com/koajs/koa/blob/master/docs/migration.md');
      fn = convert(fn);
    }
    debug('use %s', fn._name || fn.name || '-');
    this.middleware.push(fn);
    return this;
  }

  /**
   * Return a request handler callback
   * for node's native http server.
   *
   * @return {Function}
   * @api public
   */

  //返回适用于 http.createServer() 方法的回调函数来处理请求。
  //启动server和接收请求
  callback() {
    const fn = compose(this.middleware);//启动server时执行，初始化中间件

    if (!this.listenerCount('error')) this.on('error', this.onerror);

    //接收请求时执行处理请求的函数
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);//创建一个最终可用的context
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }

  /**
   * callback里的一个处理请求的方法，
   *
   * @api private
   */

  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }

  /**
   * Initialize a new context.
   *
   * @api private
   */

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.cookies = new Cookies(req, res, {
      keys: this.keys,
      secure: request.secure
    });
    request.ip = request.ips[0] || req.socket.remoteAddress || '';
    context.accept = request.accept = accepts(req);
    context.state = {};
    return context;
  }

  /**
   * Default error handler.
   *
   * @param {Error} err
   * @api private
   */

  onerror(err) {
    assert(err instanceof Error, `non-error thrown: ${err}`);

    if (404 == err.status || err.expose) return;
    if (this.silent) return;

    const msg = err.stack || err.toString();
    console.error();
    console.error(msg.replace(/^/gm, '  '));
    console.error();
  }
};

/**
 * Response helper.
 */

function respond(ctx) {
  // allow bypassing koa
  if (false === ctx.respond) return;

  const res = ctx.res;
  if (!ctx.writable) return;

  let body = ctx.body;
  const code = ctx.status;

  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  if ('HEAD' == ctx.method) {
    if (!res.headersSent && isJSON(body)) {
      ctx.length = Buffer.byteLength(JSON.stringify(body));
    }
    return res.end();
  }

  // status body
  if (null == body) {
    body = ctx.message || String(code);
    if (!res.headersSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' == typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}


```
