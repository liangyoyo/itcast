import axios from '@/unitl/myaxios.js'
export const getAllRoleList = () => {
  return axios({
    url: 'roles'
  })
}
export const delRightByRoleId = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
