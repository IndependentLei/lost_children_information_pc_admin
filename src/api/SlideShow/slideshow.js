// 轮播图管理请求

import axios from "../axios";

export const getSlideShowList = (query)=>{
  return axios.request({
    url: '/lostchildinfo/slideshow/list',
    method:'Post',
    data:query
  })
}
