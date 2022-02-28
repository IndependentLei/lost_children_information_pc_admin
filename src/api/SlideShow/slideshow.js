// 轮播图管理请求

import axios from "../axios";

/**
 * 分页查找
 * @param query
 * @returns {AxiosPromise}
 */
export const getSlideShowList = (query)=>{
  return axios.request({
    url: '/lostchildinfo/slideshow/list',
    method:'Post',
    data:query
  })
}

/**
 * 添加
 * @param query
 * @returns {AxiosPromise}
 */
export const addSlideShow = (query)=>{
  return axios.request({
    url: '/lostchildinfo/slideshow/add',
    method:'Post',
    data:query
  })
}

/**
 * 删除
 * @param query
 * @returns {AxiosPromise}
 */
export const delSlideShow = (query)=>{
  return axios.request({
    url: '/lostchildinfo/slideshow/del/'+query,
    method:'Delete',
  })
}

/**
 * 获取详情
 * @param query
 * @returns {AxiosPromise}
 */
export const getSlideShowById = (query)=>{
  return axios.request({
    url: '/lostchildinfo/slideshow/'+query,
    method:'Get',
  })
}

/**
 * 修改
 * @param query
 * @returns {AxiosPromise}
 */
export const exitSlideShow = (query)=>{
  return axios.request({
    url: '/lostchildinfo/slideshow/update',
    method:'Post',
    data:query
  })
}

/**
 * 导入
 * @param query
 * @returns {AxiosPromise}
 */
export const importSlideShow = ()=>{
  return axios.request({
    url: '/lostchildinfo/slideshow/import',
    method:'Post',
  })
}

/**
 * 导出
 * @param query
 * @returns {AxiosPromise}
 */
export const exportSlideShow = ()=>{
  return axios.request({
    url: '/lostchildinfo/slideshow/export',
    method:'Get',
    header:{
      'Content-Type':'application/json;charset=UTF-8'
    },
    responseType:'blob'
  })
}
