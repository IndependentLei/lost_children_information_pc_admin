// 用户请求

import axios from "../axios";

/**
 * 分页查找
 * @param query
 * @returns {*}
 */
export const getUser = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/list',
    method:'post',
    data:query
  })
}

/**
 * 添加用户
 * @param query
 * @returns {*}
 */
export const addUser = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/add',
    method:'post',
    data:query
  })
}

/**
 * 根据id获取用户信息
 * @param query
 * @returns {*}
 */
export const getUserById = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/'+query,
    method:'get',
  })
}

/**
 * 编辑用户信息
 * @param query
 * @returns {*}
 */
export const exitUserInfo = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/update',
    method:'post',
    data:query
  })
}

/**
 * 删除用户
 * @param query
 * @returns {*}
 */
export const delUserByIds = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/'+query,
    method:'delete',
  })
}

/**
 * 修改密码、重置密码
 * @param query
 * @returns {*}
 */
export const changePwd = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/changePwd',
    method:'post',
    data:query
  })
}

