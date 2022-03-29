// 登录请求

import axios from "../axios";

/**
 * 登录
 * @param username
 * @param password
 * @returns {*}
 */
export const login = (username,password)=>{
  return axios.request({
    url: '/login',
    method:'Post',
    params:{
      username:username,
      password:password
    }
  })
}

/**
 * 登录之后获取个人所有信息
 * @param query
 * @returns {*}
 */
export const getUserByUserCode = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/getUserByUserCode/'+query,
    method:'get'
  })
}
