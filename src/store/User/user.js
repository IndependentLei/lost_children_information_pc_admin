// user的数据共享

export default {
  namespaced:true,
  actions:{

  },
  mutations:{
    SETUSERINFO(state,val){
      state.userInfo = val
    },
    CHANGEUSERAVATER(state,val){
      state.userInfo.avatarImg = val
    }
  },
  state:{
    userInfo:{},
  }
}
