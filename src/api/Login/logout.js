// 退出请求

import axios from "../axios";

export const logout = ()=>{
  return axios.request({
    url: '/logout',
    method:'post'
  })
}
