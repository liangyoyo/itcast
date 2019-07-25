import axios from '@/unitl/myaxios.js'
export const getAllRightList = (type) => {
  return axios({
    url: `rights/${type}`

  })
}
