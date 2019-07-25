import axios from '@/unitl/myaxios.js'
export const getAllRightList = (type) => {
  return axios({
    url: `rights/${type}`

  })
}
export const grantRightById = (data) => {
  console.log(data)
  return axios({
    url: `roles/${data.roleId}/rights`,
    method: 'post',
    data: { rids: data.rids }
  })
}
