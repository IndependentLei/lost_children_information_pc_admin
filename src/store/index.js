// 该文件用于创建Vuex中最为核心的store
// 引入 Vue
import Vue from "vue";
// 引入Vuex
import Vuex from 'vuex'


// 使用vuex
Vue.use(Vuex)

import tags from "./Tags/tags";
import user from "./User/user";
import header from "./Header/header";

// 创建并 导出store
export default new Vuex.Store({
  modules:{
    tags,
    user,
    header
  }
})
