<template>
  <el-row class="home" :getter="20">
    <el-col :span="8">
      <!-- 卡片 -->
      <el-card shadow="hover" style="width: auto;">
        <div class="user">
          <img :src="userInfo.avatarImg">
          <div class="userinfo">
            <p class="name">{{userInfo.userCode}}</p>
            <p class="access">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>{{userInfo.createTime | dateFormat}}</span></p>
          <p>上次登录地点: <span>淮安</span></p>
        </div>
      </el-card>

      <!-- 表格 -->
      <el-card shadow="hover" style="margin-top: 20px">
        <h3 style="text-align: center;color: lightslategray;margin-top: 0">光荣的志愿者</h3>
        <el-table
          v-loading="loading"
          :align="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          :header-cell-style="{'text-align':'center'}"
          :default-sort = "{prop: 'createTime', order: 'descending'}"
          :data="tableData"
          stripe
          border
          height="250"
          style="width: 100%">
          <el-table-column
            sortable
            prop="userCode"
            label="用户名"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            sortable
            prop="createTime"
            label="加入时间"
            show-overflow-tooltip>
            <template #default="{row}">
          <span v-if="row.createTime">
            {{row.createTime | dateFormat}}
          </span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card shadow="hover"
                 v-for="item in cardInfo"
                 :key="item.id"
                 :body-style="{display: 'flex' ,padding : 0 }">
          <i class="icon"
             :class="`el-icon-${item.icon}`"
             :style="{background: item.color}">
          </i>
          <div style="margin: auto">
            <span style="font-size: xx-large">{{item.value}}</span>
          </div>

        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {mapState} from 'vuex'
import {getAllVolunteers} from '../../api/User/user'
export default {
  name: "home",
  data() {
    return {
      loading:true,
      tableData: [],
      cardInfo: [
        {
          id:1,
          icon:'user',
          value:123,
          color:'green',
          name:'total'
        },
        {
          id:2,
          icon:'success',
          value:13,
          color:'skyblue',
          name:'found'
        },
        {
          id:3,
          icon:'error',
          value:13,
          color:'red',
          name:'no-Information'
        }
      ]
    }
  },
  computed:{
    ...mapState('user',['userInfo'])
  },
  mounted() {
    this.$store.commit('user/SETUSERINFO',JSON.parse(localStorage.getItem("userCode")))
    getAllVolunteers().then(res=>{
      console.log(res)
      this.tableData = res.data.data
      this.loading = false
    })
  }
}
</script>

<style lang="css" scoped>
/*@import "../../assets/scss/home";*/
.home .user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.home img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 40px;
}
.userinfo .name {
  font-size: 32px;
  margin-bottom: 10px;
}
.userinfo .access {
  color: #999999;
}

.login-info p {
  line-height: 28px;
  font-size: 14px;
  color: #999999;
}
.login-info p span {
  color: #666666;
  margin-left: 60px;
}

.num {
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.num .el-card {
  width: 20%;
  margin-bottom: 20px;
}
.num .icon {
  font-size: 30px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}
.num .detail {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.num .detail .num {
  font-size: 30px;
  margin-bottom: 10px;
  text-align: center;
  color: #999999;
}
.num .detail .txt {
  font-size: 14px;
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.graph .el-card {
  width: 48%;
}
</style>
