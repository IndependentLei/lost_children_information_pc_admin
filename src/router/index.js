import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../views/MainPage'
import Login from "../views/Login/Login";
import store from "../store/index"
import {Message} from 'element-ui'
import {getCookie} from "../utils/cookie";


Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: 'history', //hash模式
  routes: [
    // 登录路由
    {
      path:'/',
      name:'login',
      component: Login,
      meta:{ //是否需要鉴权
        isAuth:false
      }
    },
    // 主页面
    {
      path: '/mainPage',
      name: 'mainPage',
      component: MainPage,
      meta:{
        isAuth: true
      },
      children:[
        {   //主页
          path:'/home',
          name:'home',
          component: () => import('@/views/Home/Home'), //懒加载，用到在加载
          meta:{
            isAuth:true
          }
        },
        {
          //用户信息页
          path:'/user/info',
          name:'user',
          component: () => import('@/views/User/User'), //懒加载，用到在加载
          meta:{
            isAuth: true
          }
        },
        {
          // 轮播图管理页
          path:'/slideshow',
          name:'slideshow',
          component: () => import('@/views/SlideShow/SlideShow'), //懒加载，用到在加载
          meta:{
            isAuth: true
          }
        },
        // 个人信息组件
        {
          path:'/user/center',
          name:'personCenter',
          component: () => import('@/views/PersonCenter/PersonCenter'),
          meta:{
            isAuth: true
          }
        },
        // 日志组件
        {
          path:'/sys/log',
          name:"log",
          component: () => import('@/views/Sys/Log/Log'),
          meta:{
            isAuth: true
          }
        },
        // 菜单组件
        {
          path:'/sys/menu',
          name:"menu",
          component: () => import('@/views/Sys/Menu/Menu'),
          meta:{
            isAuth: true
          }
        },
        // 角色组件
        {
          path:'/sys/role',
          name:"role",
          component: () => import('@/views/Sys/Role/Role'),
          meta:{
            isAuth: true
          }
        },
        // 儿童信息组件
        {
          path:'/children/info',
          name:'childrenInfo',
          component: () => import('@/views/Children/Children'),
          meta:{
            isAuth: true
          }
        },
        // 儿童信息附件组件
        {
          path:'/children/attach',
          name:'childrenAttach',
          component: () => import('@/views/Children/ChildrenAttach'),
          meta:{
            isAuth: true
          }
        },
        // 父评论管理组件
        {
          path:'/father/comment',
          name:'fatherComment',
          component: () => import('@/views/Comment/FatherComment'),
          meta:{
            isAuth: true
          }
        },
        // 子评论管理组件
        {
          path:'/son/comment',
          name:'sonComment',
          component: () => import('@/views/Comment/SonComment'),
          meta:{
            isAuth: true
          }
        }

      ]
    },
  ]
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth){ // 鉴权
    console.log(to.name)
    console.log(from.name)
    if(getCookie('Authentication')){
      if(from.name === 'login'){
        Message.success("登录成功")
      }
      next()
    }else{
      Message.error("没有权限,请登录")
      next({name:'login'})
    }
  }else{
    next()
  }
})

export default router
