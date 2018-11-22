import request from '@/utils/request'

export function getRoleList() {
  return request({
    url: '/api/v1/role/page',
    method: 'get'
  })
}
