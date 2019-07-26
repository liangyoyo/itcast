
import axios from '@/unitl/myaxios.js'

export const getAllGoodsList = (params) => {
  return axios({
    url: 'goods',
    params
  })
}
