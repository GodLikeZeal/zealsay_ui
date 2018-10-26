import axios from 'axios'
import cloneDeep from 'lodash.clonedeep'
import store from '@/store'
import { getToken } from '@/utils/auth'

const prifix = process.env.BASE_API

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url
  } = options

  url = prifix + url

  const cloneData = cloneDeep(data)
  let headers
  if (store.getters.token) {
    headers = { headers: { 'X-Token': getToken() }}
  }
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, headers, {
        params: cloneData
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData
      })
    case 'post':
      return axios.post(url, cloneData, headers)
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request(options) {
  return fetch(options).then((response) => {
    const { statusText, status } = response
    const data = response.data
    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      data: data
    })
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    return Promise.reject({ success: false, statusCode, message: msg })
  })
}
