// tags组件的数据共享

export default {
  namespaced:true, // 开启命名空间
  actions:{
    inTagsList(context,value){
      let flag = false;
      context.state.tagsList.some((item)=>{
        if (item.name === value.name){
          flag = true
        }
      })

      if (!flag){
        context.commit('INTAGSLIST',value)
      }
    },
    delTag(context,value){
      let index = undefined
      context.state.tagsList.some((item,i)=>{
        if (item.name === value.name){
          console.log(item.name)
          console.log(value.name)
          index = i
        }
      })

      context.commit('DELTAG',index) //索引
    }
  },
  mutations:{
    ACTIVEMENU(state,value){
      state.menuActive = value.id // 激活首页
      state.menuLabel = value.label
    },
    ISOPEN(state,value){

      state.isCollapse = !state.isCollapse
      if (state.isCollapse)
        state.title = '管理'
      else
        state.title = '管理系统'
    },
    INTAGSLIST(state,value){
      state.tagsList.push(value)
    },
    DELTAG(state,value){
      state.tagsList.splice(value,1) // 删除之后
      let tagsList = state.tagsList[state.tagsList.length-1]
      state.menuActive = tagsList.id // 默认激活的菜单为当前删除的菜单的下一个
      state.menuLabel = tagsList.label // 标题为删除的菜单的下一个
    }
  },
  state:{
    title:'管理系统',
    isCollapse:false,
    menuActive:1,  //菜单默认激活
    menuLabel:'首页',
    tagsList:[
      {
        id:'1',
        path:'/',
        name:'home',
        label:'首页',
        icon:'s-home',
        url:'Home/Home'
      }
    ]
  }
}
