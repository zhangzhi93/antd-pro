import { http } from '@/utils/http';

// 获取表格行
export function getQueryTableHead(params) {
  return http.post('/web/easyaction/LineProducer/scene/queryTableHead', params);
}

// 获取表格数据
export function getQueryTable(params) {
  return http.post('/web/easyaction/scene/queryTable', params);
}
