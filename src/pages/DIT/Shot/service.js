import axios from '@/utils/axios';

// 获取通告列表
export function getDitShotQueryAll(params) {
  return axios.post('/web/easyaction/dit/shot/queryAll', params);
}
