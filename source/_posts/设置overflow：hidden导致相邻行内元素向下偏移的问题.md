---
title: 设置overflow：hidden导致相邻行内元素向下偏移的问题
date: 2018-05-14 15:18:34
tags: [html, CSS]
categories: bug汇总
---
```html
<!-- html -->
<div>
  <span></span>
  <span></span>
  <span></span>
</div>
```
```CSS
/* CSS */
div span{
  display:inline-block;
}
div span:nth(0){
  overflow:hidden;
}
```
这样设置之后，后面的两个span会向下偏移一定距离 
实际上就是inline-block元素的默认baseline和其下外边沿的距离。 
常用的解决方法是为上述inline-block元素添加vertical-align: bottom。