import axios from "../../axios";

/**
 * 分页查找
 * @param query
 * @returns {*}
 */
export const getLog = (query)=>{
  return axios.request({
    url: '/lostchildinfo/log/list',
    method:'post',
    data:query
  })
}

/**
 * 删除日志
 * @param query
 * @returns {AxiosPromise}
 */
export const delLog = (query)=>{
  return axios.request({
    url: '/lostchildinfo/log/'+query,
    method:'delete',
  })
}

export const exportLog = ()=>{
  return axios.request({
    url: '/lostchildinfo/log/export',
    method:'get',
    header:{
      'Content-Type':'application/json;charset=UTF-8'
    },
    responseType:'blob'
  })
}

