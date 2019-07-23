import axios from '@/unitl/myaxios.js'
export const getAllRoleList = () => {
  return axios({
    url: 'roles'
  })
}
