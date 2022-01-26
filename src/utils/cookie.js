import Cookie from 'js-cookie'

/**
 * 存入cookie
 * @param name
 * @param value
 * @param expires
 */
export const setCookie = (name,value,expires)=>{
  Cookie.set(name,value,{expires:expires})
}

/**
 * 获取cookie
 * @param name
 * @returns {*}
 */
export const getCookie = (name)=>{
  return Cookie.get(name)
}

/**
 * 移除cookie
 * @param name
 */
export const removeCookie = (name)=>{
  Cookie.remove(name)
}
