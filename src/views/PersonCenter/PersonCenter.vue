<template>
  <el-card shadow="always" class="personalCenter">
    <img :src="userInfo.avatarImg" alt="错误了" style="width: 100px;height: 100px">
    <input type="file" ></input>
  </el-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "PersonCenter",
  computed:{
    ...mapState('user',['userInfo'])
  }
}
</script>

<style lang="css" scoped>
.personalCenter{
  width: 30%;
  height: 100%;
}
</style>
