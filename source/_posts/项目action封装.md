---
title: 项目action封装
date: 2018-06-25 10:37:11
tags: Javascript redux
categories: Demo练习
---

```javascript
import callApi from '../../utils/callApi';
import api from '../../api';

//对dispatch的函数进行封装。
const commonCallApi = (dispatch, formData, url, type) => {
  return callApi.post(url, formData).then(res => {
    if (res.code === 200) {
      const data = type
        ? dispatch({
            type,
            data: res.data
          })
        : res;
      return Promise.resolve(data);
    }
    return Promise.reject(res);
  });
};

/**
 * 公共action
 * @param requestUrl
 * @param data
 * @param type  设置action的type
 * @returns {function(*)}
 */
const commonAction = (requestUrl, data, type) => {
  return dispatch => {
    return commonCallApi(dispatch, requestUrl, data, type);
  };
};

/**
 * 获取列表
 * @form:
 * @param formData
 * @returns {function(*)}
 */
const getList = formData => {
  return commonAction(api.getList, formData, 'get_list');
};

export default {
  getList
};
```
