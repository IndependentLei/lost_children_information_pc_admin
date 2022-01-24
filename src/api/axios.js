// 封装axiosS
import axios from "axios";
import config from '../config/index'
import store from "../store/index"

axios.defaults.headers.post["Content-Type"] = "application/json;";
// axios请求头放入token

// 如果本地有token，就放在vuex中
if (localStorage.getItem("Authentication")){
  store.commit("user/set_token",localStorage.getItem("Authentication"))
}
// 设置配置，根据开发和生产环境一样
const  baseUrl = process.env.BABEL_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev :config.baseUrl.pro;

class HttpRequest{
  constructor(baseUrl){
    this.baseUrL= baseUrl
  }
  getInsideConfig(){
    const config = {
      baseUrl:this.baseUrL,
      header:{
      }
    }
    return config
  }
  interceptors(instance){
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      // 请求头加入token
      config.headers.Authentication = store.state.user.Authentication
      // 在发送请求之前做些什么
      console.log("拦截处理请求")
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

// 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      console.log("处理响应")
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }

  request(options){
    // 请求
    const instance = axios.create()
    options = {...(this.getInsideConfig), ...options }
    this.interceptors(instance)
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)
