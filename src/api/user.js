import request from '@/utils/request'

export function getUserList() {
  return request({
    url: '/api/v1/user/page',
    method: 'get'
  })
}
