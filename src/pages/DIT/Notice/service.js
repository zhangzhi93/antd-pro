import { http } from '@/utils/http';
import qs from 'qs';

// 获取通告列表
export function getDitNotifyQueryAll(params) {
  return http.post('/web/easyaction/dit/notify/queryAll', params);
}

// 获取搜索条件
export function getDitNotifyOptions(params) {
  const payload = qs.stringify(params);
  return http.post('/web/easyaction/dit/notify/queryOptions', payload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
}
