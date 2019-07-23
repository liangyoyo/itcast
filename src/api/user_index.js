// 引入axios
import axios from '../unitl/myaxios'
// 登录
export const login = (data) => {
  /*   axios 返回一个promise对象 */
  return axios({
    // 设置路由路径
    url: 'login',
    // 设置请求方式，请求方式为post。默认为‘get’
    method: 'post',
    // post方式返回的数据
    data
  })
}
export const getAllUserList = (params) => {
  return axios({
    url: 'users',
    params
  })
}
export const addUser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}
export const editUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data: { email: data.email, mobile: data.mobile }
  })
}
export const delUserById = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}
export const updateUserState = (uid, type) => {
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}
export const grantUserRole = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data: { rid: data.rid }
  })
}
