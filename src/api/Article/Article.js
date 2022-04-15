
import axios from "../axios";

/**
 * 分页查找
 * @param query
 * @returns {*}
 */
export const getArticle = (query)=>{
  return axios.request({
    url: '/lostchildinfo/article/list',
    method:'post',
    data:query
  })
}

/**
 * 增加文章
 * @param query
 * @returns {*}
 */
export const addArticle = (query)=>{
  return axios.request({
    url: '/lostchildinfo/article/add',
    method:'post',
    data:query
  })
}

/**
 * 删除文章
 * @param query
 * @returns {*}
 */
export const delArticle = (query)=>{
  return axios.request({
    url: '/lostchildinfo/article/'+query,
    method:'delete',
  })
}

/**
 * 分页查找
 * @param query
 * @returns {*}
 */
export const updateArticle = (query)=>{
  return axios.request({
    url: '/lostchildinfo/article/update',
    method:'post',
    data:query
  })
}


/**
 * 导出
 * @param query
 * @returns {*}
 */
export const exportArticle = ()=>{
  return axios.request({
    url: '/lostchildinfo/article/export',
    method:'get'
  })
}

/**
 * 更具id获取文章信息
 * @param query
 * @returns {*}
 */
export const getArticleById = (query)=>{
  return axios.request({
    url: '/lostchildinfo/article/getArticleById/'+query,
    method:'get'
  })
}
