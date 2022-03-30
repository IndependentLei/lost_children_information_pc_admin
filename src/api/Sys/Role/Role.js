import axios from "../../axios";

/**
 * 分页查找
 * @param query
 * @returns {*}
 */
export const roleList = (query)=>{
  return axios.request({
    url: '/lostchildinfo/role/list',
    method:'post',
    data:query
  })
}

/**
 * 添加角色
 * @param query
 * @returns {*}
 */
export const addRole = (query)=>{
  return axios.request({
    url: '/lostchildinfo/role/add',
    method:'post',
    data:query
  })
}


/**
 * 删除角色
 * @param query
 * @returns {*}
 */
export const delRoles = (query)=>{
  return axios.request({
    url: '/lostchildinfo/role/'+query,
    method:'delete',
  })
}

/**
 * 更新角色
 * @param query
 * @returns {*}
 */
export const updateRole = (query)=>{
  return axios.request({
    url: '/lostchildinfo/role/update',
    method:'post',
    data:query
  })
}

/**
 * 根据id获取角色信息
 * @param query
 * @returns {*}
 */
export const getRoleById = (query)=>{
  return axios.request({
    url: '/lostchildinfo/role/'+query,
    method:'get',
  })
}

/**
 * 导出所有角色
 * @returns {*}
 */
export const exportRole = ()=>{
  return axios.request({
    url: '/lostchildinfo/role/export',
    method:'get',
    header:{
      'Content-Type':'application/json;charset=UTF-8'
    },
    responseType:'blob'
  })
}

/**
 * 未删除的角色
 * @returns {*}
 */
export const noDeleteRole = ()=>{
  return axios.request({
    url: '/lostchildinfo/role/noDeleteRole',
    method:'get',
  })
}
