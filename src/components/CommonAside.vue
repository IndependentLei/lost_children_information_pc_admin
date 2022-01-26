<template>
    <el-menu
      :default-active="menuActive+''"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#2f4050"
      text-color="#fff"
      active-text-color="#ffd04b"
    >

      <h3  v-if="!isCollapse">{{title}}</h3>
      <h3  v-if="isCollapse">{{title}}</h3>

      <el-menu-item
        :index="item.id"
        v-for="item in noChildren"
        :key="item.id"
        @click="clickMenu(item)">

        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>

      <el-submenu
        :index="item.id"
        v-for="item in hasChildren"
        :key="item.id">

        <template slot="title">
          <i :class="'el-icon-'+item.icon"></i>
          <span slot="title">{{item.label}}</span>
        </template>

        <el-menu-item-group>

          <el-menu-item
            :index="item.id"
            v-for="item in item.children"
            :key="item.id"
            @click="clickMenu(item)">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.label}}</span>
          </el-menu-item>

        </el-menu-item-group>

      </el-submenu>

    </el-menu>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "CommonAside",
  data() {
      return {
        menu:[
          {
            id:'1',
            path:'/',
            name:'home',
            label:'首页',
            icon:'s-home',
            url:'Home/Home'
          },
          {
            id:'2',
            path:'/slideshow',
            name:'slideshow',
            label:'轮播图管理',
            icon:'video-play',
            url:'SlideShow/SlideShow'
          },
          {
            id:'3',
            path:'/user',
            name:'user',
            label:'用户管理',
            icon:'user',
            url:'UserManage/UserManage'
          },
          {
            id:'4',
            label:'其他',
            icon:'location',
            url:'location',
            children: [
              {
                id:'5',
                path:'/page1',
                name:'page1',
                label:'页面1',
                icon:'setting',
                url:'Other/PageOne'
              },
              {
                id:'6',
                path:'/page2',
                name:'page2',
                label:'页面2',
                icon:'setting',
                url:'Other/PageTwo'
              }
            ]
          }
        ]
      };
    },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 跳转路由
    clickMenu(item){
      // 跳转路由
      this.$router.push({name:item.name})
      // 菜单激活
      this.$store.commit('tags/ACTIVEMENU',item)
      // 相等的存入tag中
      this.$store.dispatch('tags/inTagsList',item)
    }
  },
  computed:{
    // 由子页面的过滤
    hasChildren(){
      // 判断是否由子目录
      return this.menu.filter((item)=> item.hasOwnProperty("children"))
    },

    noChildren(){
      return this.menu.filter((item)=> !item.hasOwnProperty("children"))
    },
    ...mapState('tags',['isCollapse','title','menuActive'])
  },
  mounted() {
    this.$router.push({name:"home"})
  }

}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  border-right-width: 0;
  line-height: 100%;
}
h3{
  text-align: center;
  color: white;
}
.el-menu{
  border-right:  0;
}

</style>
