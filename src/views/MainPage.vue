<template>
  <el-container>
    <!-- 侧边栏 -->

    <CommonAside></CommonAside>

    <el-container style="width: auto">
      <!-- header -->
      <el-header style="background-color: black">
        <CommonHeader ></CommonHeader>
      </el-header>
      <!--Tags-->
      <CommonTags/>
      <!-- body -->
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside";
import CommonHeader from "../components/CommonHeader";
import CommonTags from "../components/CommonTags";
export default {
  name: 'MainPage',
  components:{
    CommonAside,
    CommonHeader,
    CommonTags
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
.el-container{
  ;
}
</style>
