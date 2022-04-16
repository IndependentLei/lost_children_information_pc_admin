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

/**
 * 根据身份证查询所有附件
 * @param query
 * @returns {*}
 */
export const getAttachByIdCard = (query)=>{
  return axios.request({
    url: '/lostchildinfo/childrenInfoAttach/getAttachByChildIdCard/'+query,
    method:'get',
  })
}


/**
 * 根据id删除附件
 * @param query
 * @returns {*}
 */
export const delAttach = (query)=>{
  return axios.request({
    url: '/lostchildinfo/childrenInfoAttach/'+query,
    method:'delete',
  })
}


