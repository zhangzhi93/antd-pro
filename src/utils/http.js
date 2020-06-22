import axios from 'axios';
import Qs from 'qs';
import { message } from 'antd';

const base = '/api';

const ignoreCode = [15, 45, 46, 47, 48, 53, 60, 83, 120, 150, 151, 1931];

// 设置超时时间
axios.defaults.timeout = 50000;
// 请求前拦截
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

// 返回后拦截
axios.interceptors.response.use(
  response => {
    // 响应拦截
    // 不是系统接口直接返回response
    if (response.data.code === undefined) return response;
    if (response.data.code !== 0) {
      if (!ignoreCode.includes(response.data.code)) message.error(response.data.msg);
    }
    if (response.data.code === 18) {
      window.location.replace('/login');
    }
    return response;
  },
  err => {
    message.error(err.message);
    return Promise.reject(err);
  },
);

const post = (url, params, options = {}) => {
  const { baseUrl } = options;
  return axios({
    method: 'post',
    url: `${baseUrl || base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json',
      charset: 'utf-8',
      token: window.localStorage.getItem('token'),
    },
  });
};

const form = (url, params, options = {}) => {
  const { baseUrl } = options;
  const formData = new FormData();
  for (const k in params) {
    if (params.hasOwnProperty(k)) {
      formData.append(k, params[k]);
    }
  }
  return axios({
    method: 'post',
    url: `${baseUrl || base}${url}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      token: window.localStorage.getItem('token'),
    },
  });
};

const get = (url, params, options = {}) => {
  const { baseUrl } = options;
  return axios({
    method: 'get',
    headers: {
      token: window.localStorage.getItem('token'),
    },
    url: `${baseUrl || base}${url}`,
    params,
  });
};

const upload = (url, data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const multiple = (requsetArray, callback) => {
  axios.all(requsetArray).then(axios.spread(callback));
};

export const http = {
  get,
  upload,
  post,
  form,
  multiple
};
