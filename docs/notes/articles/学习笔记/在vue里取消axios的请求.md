---
title: 在vue里取消axios的请求
date: 2021-10-24 21:41:57
tags: [vue, axios]
categories: 学习笔记
---

一、搬砖遇到的问题在搬砖的时候，遇到了一个问题，公共组件 A 是需要传一个数组进去渲染，在 tab1 下面是需要从接口请求返回的数据渲染，在 tab2 下则是读取配置文件的内容。在网络比较慢的情况下，快速从 tab2 切换到 tab1 再切换回 tab2 的时候，会先渲染tab2 从配置文件中读取数组，然后再渲染成 tab1 请求回来的数据列表，然后就不再变化了。

二、如此就需要在切换到 tab2 之前，把 tab1 的请求给取消了。

三、具体的方法：

取消单个请求的方法，可以像下面的方法，把 CancelToken 的 source 放在 data 里，初始化组件的时候，可以赋值，要取消请求的时候，就直接 source.cancel 就可以了。

```js
import axios from 'axios';

export default {
  data: () => ({
    source: null,
  }),
  mounted() {
    this.source = axios.CancelToken.source();
  },
  methods: {
    async getList() {
      const { data, code } = await axios.get('/XXXX/XXXX/', {
        cancelToken: this.source.token,
      });
    },
    changeTab() {
      this.source.cancel('change tab');
    },
  },
};
```

取消多个请求，可以把 CancelToken 取出来，每个请求都重新 new 一个 cancelToken，并把每个 cancelToken 放到 一个公共数组里，在需要所有的请求都中断时，就遍历数组，每个都执行一遍。在请求完成的时候，要在数组中去掉对应的 cancelToken，在页面或者数组卸载的时候，记得清空数组。
