import request from '@/utils/request'

export function login(data) {
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
