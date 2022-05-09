---
title: link和@import之争
date: 2018-06-13 10:52:26
tags: CSS
categories: HTML+CSS
---
看到知乎大神说，先问是不是，再问为什么

我页不知道为什么要写这句话，反正就是很奇怪的想法，就先记下来。
今天研究的link和@import，是外部引入外部引入 CSS 的两种方式。
两者是有区别的（是不是）。
我们来研究一下有哪些区别（为什么）


* link是XHTML(HTML)标签，除了加载CSS外，还可以定义RSS,rel等其他事务； @import是 CSS 提供的语法规则, 只有导入样式表的作用。
* link引用CSS时，在页面载入时同时加载； @import需要页面网页完全载入以后加载。
* link是XHTML(HTML)标签，无兼容问题； @import是在CSS2.1提出的，低版本的浏览器不支持(IE5+)。
* link支持使用Javascript控制DOM去改变样式；而@import不支持。

```html
<link href="style.css" rel="stylesheet" type="text/css"> 
<style>
  @import url(style.css);
</style>
```