// 用户请求

import axios from "../axios";

export const getUser = (query)=>{
  return axios.request({
    url: '/lostchildinfo/user/list',
    method:'post',
    data:query
  })
}
