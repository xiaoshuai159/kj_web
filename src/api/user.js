import request from '@/utils/request'
// 3.设置请求体数据，调用底层api接口
export function login(data) {
  // console.log('走到request的login');
  // console.log(data);
  return request({
    // url: '/dev-api/admin/acl/index/login',
    url:'api/v1/auth/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'get_info/',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: 'log_out/',
    method: 'get',
    params: { token }
  })
}
