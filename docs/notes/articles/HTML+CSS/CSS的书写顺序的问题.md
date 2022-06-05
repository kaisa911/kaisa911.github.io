---
title: CSS的书写顺序的问题
date: 2021-03-19 09:55:54
tags: [CSS]
categories: CSS
---

之前写 CSS 的时候都是想到什么属性就写什么属性，随意的很。特别是在调试样式的时候，还会把在浏览器调试的样式直接复制到随机的位置。

虽然知道浏览器的回流和重绘都会影响渲染的性能，但是仅仅停留在了操作样式的时候，也没怎么考虑在初始写 CSS 的时候顺序。

于是好好的学习了一下。

## CSS 的书写顺序

- 定位属性：position，z-index，display，float， left， right， top， bottom，clear，clip，overflow…
- 尺寸属性：width，height，margin，padding，border，flex…
- 文字样式：font，color…
- 背景属性：background…
- 文本属性：text-align，vertical-align，text-indent，text-decoration，letter-spacing，text-overflow，word-break…
- CSS3 属性：animation，transition，box-shadow，border-radius…

## why？

正常我们都知道浏览器的渲染过程，就像下图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210319094134969.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70)
浏览器的渲染总共分为 4 步：

1. 解析 HTML 生成 DOM 树,解析 CSS 生成 CSSOM 规则树。
2. 将 DOM 树与 CSSOM 规则树合并在一起生成渲染树。
3. 遍历渲染树开始布局，计算每个节点的位置大小信息。
4. 将渲染树每个节点绘制到屏幕。

合理的书写 CSS 的顺序，主要作用在生成渲染树布局和计算大小的时候，让 renderTree 提前知道这个 dom 是在文档流里的还是脱离了文档流等，避免了渲染了前面各种属性之后，又发现需要脱离文档流，就又需要重新渲染 renderTree 等。
