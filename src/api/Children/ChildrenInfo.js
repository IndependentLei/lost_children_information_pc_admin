import axios from "../axios";

/**
 * 分页查找
 * @param query
 * @returns {*}
 */
export const listByPage = (query)=>{
  return axios.request({
    url: '/lostchildinfo/childrenInfo/list',
    method:'post',
    data:query
  })
}


