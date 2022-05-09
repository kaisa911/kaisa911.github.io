---
title: 项目action封装
date: 2018-06-25 10:37:11
tags: Javascript redux
categories: react
---

```javascript
import callApi from '../../utils/callApi';
import api from '../../api';

/**
 * callApi
 * @param dispatch
 * @param formData 
 * @param requestUrl
 * @param type  设置action的type
 * @returns {function(*)}
 */
const commonCallApi = (dispatch, formData, requestUrl, type) => {
  return callApi.post(requestUrl, formData).then(res => {
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
 * @param formData
 * @param type  设置action的type
 * @returns {function(*)}
 */
const commonAction = (requestUrl, formData, type) => {
  return dispatch => {
    return commonCallApi(dispatch, requestUrl, formData, type);
  };
};

/**
 * 获取列表
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
