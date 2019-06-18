import axios from '@/utils/axios';
import qs from 'qs';

// 登录接口
export function UserLogin(params) {
  const payload = qs.stringify(params);
  return axios.post('/web/easyaction/user/userLogin', payload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
}
