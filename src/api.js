import request from './request'

export function getList(page = '') {
  return request(`https://blog.lishengcn.cn/api/list/${page}`)
}

export function getDetail(id) {
  return request(`https://blog.lishengcn.cn/api/article/${id}`)
}