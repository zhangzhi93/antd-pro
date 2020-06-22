import { http } from '@/utils/http';

// 获取左侧菜单
export function getMenu(params) {
  return http.form('/web/easyaction/user/queryMenu', params);
}

export function applayToUpload(params) {
  return http.form('/web/easyaction/alioss/applyToUpload', params);
}

export function uploadFile(url, params) {
  return http.upload(url, params);
}
