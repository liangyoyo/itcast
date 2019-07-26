import axios from '@/unitl/myaxios.js'
// 获取所有角色分类
export const getAllRoleList = () => {
  return axios({
    url: 'roles'
  })
}
// 根据角色ID删除用户权限
export const delRightByRoleId = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
// 添加角色
export const addRole = (data) => {
  return axios({
    url: `roles`,
    method: 'post',
    data: data
  })
}
// 获取右侧菜单项
export const getLeftMenus = () => {
  return axios({
    url: `menus`
  })
}
