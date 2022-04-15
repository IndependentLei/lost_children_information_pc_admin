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

/**
 * 删除儿童信息
 * @param query
 * @returns {*}
 */
export const delChildInfo = (query)=>{
  return axios.request({
    url: '/lostchildinfo/childrenInfo/'+query,
    method:'delete'
  })
}

/**
 * 更新儿童信息
 * @param query
 * @returns {*}
 */
export const updateChildInfo = (query)=>{
  return axios.request({
    url: '/lostchildinfo/childrenInfo/update',
    method:'post',
    data:query
  })
}

