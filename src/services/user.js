import { http } from '@/utils/http';

// 登录接口
export function login(params) {
  return http.form('/web/easyaction/user/userLogin', params, 'data');
}

export function getInfo() {
  return http.form('/web/easyaction/user/getSimpleUserInfo');
}

// 登出
export function logout() {
  return http.form('/web/easyaction/user/signout');
}

// 微信小程序二维码登录
export function getWechatQrcode() {
  return http.form('/web/easyaction/projectMgr/xcx/login');
}

// 判断微信是否扫码
export function isScanQrcode(params) {
  return http.form('/web/easyaction/projectMgr/xcx/login/scan', params);
}
