---
title: 关于xss和csrf
date: 2018-09-06 16:10:57
tags: [前端安全]
categories: Javascript
---

## XSS

xss 是跨网站指令码，是代码注入的一种，它允许恶意使用者将程式码注入到网页上，其他使用者在观看网页时就会受到影响。这类攻击通常包含了 HTML 以及使用者端脚本语言。

攻击方式: XSS 通过修改 HTML 节点或者执行 JS 代码来攻击网站。比如通过 url 来在页面上添加 html 后者 js 文件。

防止: 最普遍的方法，是将输出的内容进行转义，比如对于引号，尖括号，斜杠进行转义等，再就是设置白名单或者黑名单等。比如只允许加载本站资源等。。

## CSRF

csrf 跨站请求伪造，是一种挟制用户在当前已登录的 Web 应用程序上执行非本意的操作的攻击方法。简单点说，CSRF 就是利用用户的登录态发起恶意请求。

防止：防范 CSRF 可以遵循以下几种规则：

- Get 请求不对数据进行修改
- 不让第三方网站访问到用户 Cookie
- 阻止第三方网站请求接口
- 请求时附带验证信息，比如验证码或者 token
