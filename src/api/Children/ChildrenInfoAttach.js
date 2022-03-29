import axios from "../axios";

/**
 * 根据childrenId查询附件
 * @param query
 * @returns {*}
 */
export const getAttachByChildrenId = (query)=>{
  return axios.request({
    url: '/lostchildinfo/childrenInfoAttach/'+query,
    method:'get',
  })
}
