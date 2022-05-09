---
title: jquery对追加事件的绑定
date: 2018-05-14 15:01:10
tags: [Javascript, Jquery]
categories: Jquery
---
写项目的时候又用到了jquery，突然发现，对于用jquery追加的元素，on方法绑定不能用。

发现：
on要原始存在才绑定上，否则要用delegate来动态绑定
```javascript
$(document).delegate('selecter','click', function () { alert(this.innerHTML) });
```