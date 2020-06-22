import { http } from '@/utils/http';

// 登录接口
export function UserLogin(params) {
  return http.post('/web/easyaction/user/userLogin', params);
}
