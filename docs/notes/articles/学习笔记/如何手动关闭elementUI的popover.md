---
title: 如何手动关闭elementUI的popover
date: 2021-03-22 13:46:32
tags: [JavaScript, ElementUI]
categories: 学习笔记
---

在开发的过程中，有需要点击 popover 中的按钮，然后触发 click 事件，走完流程之后要关闭 popover。

查询了 element 的文档里，也没有相关的事
件![在这里插入图片描述](https://img-blog.csdnimg.cn/20210322134039492.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70#pic_center)
于是搜了一下，可以用以下的方法来解决

我在 popover 上添加了一个 ref，拿到了这个节点，看到这个节点上其实是有控制打开和关闭的方法的 doShow()和 doClose()的方法。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210322134437262.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ2Mjc4MDc=,size_16,color_FFFFFF,t_70#pic_center)
所以可以使用

```javascript
this.$refs.popoverRef.doClose();
```

来关闭这个 popover 了
