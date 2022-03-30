import axios from "../axios";

/**
 * 分页查找
 * @param query
 * @returns {*}
 */
export const listByPage = (query)=>{
  return axios.request({
    url: '/lostchildinfo/fatherComment/list',
    method:'post',
    data:query
  })
}

/**
 * 根据id删除父评论
 * @param query
 * @returns {*}
 */
export const delFatherComment = (query)=>{
  return axios.request({
    url: '/lostchildinfo/fatherComment/'+query,
    method:'delete',
  })
}

/**
 * 导出父评论
 * @returns {*}
 */
export const exportFatherComment = ()=>{
  return axios.request({
    url: '/lostchildinfo/fatherComment/export',
    method:'get',
    header:{
      'Content-Type':'application/json;charset=UTF-8'
    },
    responseType:'blob'
  })
}
