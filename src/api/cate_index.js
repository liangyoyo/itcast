import axios from '@/unitl/myaxios.js'

export const getCateList = (type) => {
  return axios({
    url: 'categories',
    params: { type }
  })
}
