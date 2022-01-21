// 路由前置守卫
// import store from "../store";
// import router from "./index";
// import {Message} from "element-ui";
//
// router.beforeEach((to, from, next) => {
//   if (to.meta.isAuth){ // 鉴权
//     // console.log(store.state.user.Authentication)
//     if(store.state.user.Authentication!==''){
//       if(to.name === 'login'){
//         Message.success("登录成功")
//       }
//       next()
//     }else{
//       Message.error("没有权限")
//       next({name:'login'})
//     }
//   }else{
//     next()
//   }
// })
