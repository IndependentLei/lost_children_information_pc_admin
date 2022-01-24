// 登录请求

import axios from "../axios";

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
