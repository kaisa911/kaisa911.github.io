---
title: jquery监控浏览器大小变化
date: 2018-05-14 18:10:06
tags: Jquery
categories: Jquery
---
```javascript
var screenWidth = window.screen.width;

$(window).resize(function () {//当浏览器大小变化时
  if($(window).width()!== screenWidth){
    //history.go(0)
  }
});
//监控浏览器旋转
function orientationChange() {
  switch (window.orientation) {
    case 0:
      //history.go(0)
      break;
    case -90:
      //history.go(0)
      break;
    case 90:
     // history.go(0)
      break;
    case 180:
      //history.go(0)
      break;
  }
}
window.addEventListener('orientationchange', orientationChange);
```