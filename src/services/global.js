import axios from '@/utils/axios';

// 查询项目详情
export function queryProjectDetail(params) {
  return axios.post('/web/easyaction/project/queryDetail', params);
}
