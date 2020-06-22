import { cloneDeep } from 'lodash';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const fileHost = 'https://file.easyaction.cn';
const fileMiddleType = '?x-oss-process=style/middle';
const fileThumbnailType = '?x-oss-process=style/thumbnail';

const isUrl = path => reg.test(path);

const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};

const getMap = (list, key, map, cb) => {
  const isRewrite = [];
  list.forEach(item => {
    if (isRewrite.includes(item[key])) {
      item.rewrite = true
    } else {
      isRewrite.push(item[key]);
    }
    map[item[key]] = cb ? cb(item) : item;
  });
  return map;
};

const refreshData = (result, data, key) => {
  data = Array.isArray(data) ? data : [data];
  for (let j = 0; j < data.length; j++) {
    for (let i = 0; i < result.list.length; i += 1) {
      if (result.list[i][key] === data[j][key]) {
        result.list[i] = cloneDeep(data[j]);
        result.map[data[j][key]] = cloneDeep(data[j]);
        break;
      }
    }
  }
  return result;
}

function ApiError(data) {
  const error = new Error(data.msg);
  error.code = data.code;
  error.data = data.data;
  console.log(error);
  return error;
}

function isNumber(val) {
  return typeof val === 'number' && !Number.isNaN(val)
}

export { isAntDesignProOrDev, isAntDesignPro, isUrl, getMap, refreshData, ApiError, isNumber, fileHost, fileMiddleType, fileThumbnailType };
