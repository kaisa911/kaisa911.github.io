---
title: CSS 实用片段
date: 2018-05-29 18:15:44
tags: CSS
categories: 学习笔记
---

1、垂直对齐：垂直对齐容器中的元素.

```CSS
verticalcenter{
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
}
```

2、垂直居中:
不知道父元素高度的情况

```CSS
parentElement {
  position:relative;
}

childElement {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

若父容器下只有一个元素，且父元素设置了高度，则只需要使用相对定位即可

```css
parentElement {
  height: xxx;
}

childElement {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
```

flex 布局

```css
parentElement {
  display: flex; /*Flex布局*/
  display: -webkit-flex; /* Safari */
  align-items: center; /*指定垂直居中*/
}
```

line-height 设置了行间的距离（行高），将要居中的元素的 line-heigth 值设置为和其块级父元素的 height 值一样时，其内部内容会垂直居中。

```css
element {
  height: 100px;
  line-height: 100px;
}
```

3、水平居中:
行级元素水平居中对齐:`text-align:center;`
块级元素水平居中对齐:`margin: 0 auto`
对于浮动的元素居中

- 宽度不固定的浮动元素

```html
<div class="outerbox">
  <div class="innerbox">我是浮动的</div>
 </div>
```

```css
.outerbox {
  float: left;
  position: relative;
  left: 50%;
}
.innerbox {
  float: left;
  position: relative;
  right: 50%;
}
```
。。。未完待续