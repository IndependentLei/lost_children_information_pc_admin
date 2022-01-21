// 用户请求

import axios from "../axios";

export const getUser = ()=>{
  return axios.request({
    url: 'user/user',
    method:'Get'
  })
}
