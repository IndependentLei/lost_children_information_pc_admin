import axios from "../../axios";

/**
 * 分页查找
 * @param query
 * @returns {*}
 */
export const menuList = (query)=>{
  return axios.request({
    url: '/lostchildinfo/menu/list',
    method:'post',
    data:query
  })
}
