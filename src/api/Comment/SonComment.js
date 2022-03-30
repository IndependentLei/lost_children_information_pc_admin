import axios from "../axios";

/**
 * 分页查找
 * @param query
 * @returns {*}
 */
export const listByPage = (query)=>{
  return axios.request({
    url: '/lostchildinfo/sonComment/list',
    method:'post',
    data:query
  })
}

/**
 * 根据id删除子评论
 * @param query
 * @returns {*}
 */
export const delSonComment = (query)=>{
  return axios.request({
    url: '/lostchildinfo/sonComment/'+query,
    method:'delete',
  })
}

/**
 * 导出父评论
 * @returns {*}
 */
export const exportSonComment = ()=>{
  return axios.request({
    url: '/lostchildinfo/sonComment/export',
    method:'get',
    header:{
      'Content-Type':'application/json;charset=UTF-8'
    },
    responseType:'blob'
  })
}
