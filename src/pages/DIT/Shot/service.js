import { http } from '@/utils/http';

// 获取通告列表
export function getDitShotQueryAll(params) {
  return http.post('/web/easyaction/dit/shot/queryAll', params);
}
