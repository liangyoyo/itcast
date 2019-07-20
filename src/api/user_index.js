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
