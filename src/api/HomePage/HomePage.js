import axios from "../axios";

/**
 * 后台首页的数据获取
 * @param query
 * @returns {*}
 */
export const pageHomeInfo = (query)=>{
  return axios.request({
    url: '/lostchildinfo/homePage/backInfo',
    method:'post',
    data:query
  })
}
