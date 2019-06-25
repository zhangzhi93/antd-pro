import axios from '@/utils/axios';

// 获取表格行
export function getQueryTableHead(params) {
  return axios.post('/web/easyaction/LineProducer/scene/queryTableHead', params);
}

// 获取表格数据
export function getQueryTable(params) {
  return axios.post('/web/easyaction/scene/queryTable', params);
}
