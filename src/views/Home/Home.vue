<template>
  <el-row class="home" :getter="20">
    <el-col :span="8">
      <!-- 卡片 -->
      <el-card shadow="hover" style="width: auto;">
        <div class="user">
          <img :src="userInfo.avatarImg">
          <div class="userinfo">
            <p class="name">{{userInfo.name}}</p>
            <p class="access">{{userInfo.role}}</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>{{userInfo.loginTime}}</span></p>
          <p>上次登录地点: <span>{{userInfo.loginLocation}}</span></p>
        </div>
      </el-card>

      <!-- 表格 -->
      <el-card shadow="hover" style="margin-top: 20px">
        <h3 style="text-align: center;color: lightslategray;margin-top: 0">光荣的志愿者</h3>
        <el-table
          :data="tableData"
          stripe
          border
          height="250"
          style="width: 100%">
          <el-table-column
            show-overflow-tooltip
            :prop="item.name"
            :label="item.label"
            v-for="item in tableLabel" :key="item.id">
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
             :style="{background: item.color}"
          >
          </i>
          <div class="detail">
            <p class="num">{{item.value}}</p>
            <p class="txt">{{item.name}}:</p>
          </div>

        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "home",
  data() {
    return {
      tableData: [
          {
            id: '1',
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            volunteerId: 123
          },
          {
            id: '2',
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            volunteerId: 123
          },
          {
            id: '3',
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            volunteerId: 123
          },
          {
            id: '4',
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            volunteerId: 123
          },
          {
            id: '4',
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            volunteerId: 123
          }
        ],
      tableLabel:[
        {
          id:13546457856,
          name:'name',
          label:'姓名'
        },
        {
          id:235445657856,
          name:'volunteerId',
          label:'志愿者号'
        },
        {
          id:2525456457856,
          name:'address',
          label:'地址'
        },
        {
          id:75352485,
          name:'date',
          label:'加入日期'
        }
      ],
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
