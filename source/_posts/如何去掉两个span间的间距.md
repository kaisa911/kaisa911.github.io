---
title: 如何去掉两个span间的间距
date: 2018-05-14 15:13:21
tags: [html, CSS]
categories: bug汇总
---
```html
<!-- html -->
<div>
    <span></span>
    <span><span>
</div>
```
```CSS
/* CSS */
div{
    font-size：10px；
}
span{
    display:inline-block;
}
```
设置成块级元素的span，会因为父元素设置字体的大小，导致两个span外的空格会占有空隙。 
所以将父元素的font-size：0； 
然后再单独设置span的字体大小就可以解决这个问题。

