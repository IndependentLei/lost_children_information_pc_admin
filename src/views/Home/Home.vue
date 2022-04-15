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
          <div style="margin: auto;">
            <div style="text-align: center">
              <span style="font-size: xx-large;">{{item.value}}</span>
            </div>

            <br>
            <div style="text-align: center">
              <span style="font-size: small">{{item.describe}}</span>
            </div>

          </div>

        </el-card>
      </div>
      <div class="echarts" id="main"></div>
    </el-col>
  </el-row>
</template>

<script>
const echarts = require('echarts')
import {mapState} from 'vuex'
import {pageHomeInfo} from '../../api/HomePage/HomePage'
export default {
  name: "home",
  data() {
    return {
      echartsList:{
        threeDate:[],
        threeSum:[],
      },
      userData:{},
      loading:true,
      tableData: [],
      cardInfo: [
        {
          id:1,
          icon:'user',
          value:0,
          color:'green',
          name:'total'
        },
        {
          id:2,
          icon:'success',
          value:0,
          color:'skyblue',
          name:'found'
        },
        {
          id:3,
          icon:'error',
          value:0,
          color:'red',
          name:'no-Information'
        }
      ]
    }
  },
  methods:{

    init(){
      var myChart = echarts.init(document.getElementById('main'))

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '新增儿童信息'
        },
        tooltip: {},
        xAxis: {
          data: this.echartsList.threeDate,
          axisLabel: {
            color: '#000000',
            interval: 0, // 控制是否全部显示
            // rotate: 40// 控制字体倾斜
          }
        },
        yAxis:{
          axisLabel: {
            interval: 0, // 控制是否全部显示
          },
        },
        legend: {
          data: ['人数']
        },
        series: [
          {
            name: '人数',
            type: 'bar',
            data: this.echartsList.threeSum,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                fontSize: 10
              }
            }
          }
        ]
      }


      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  },
  computed:{
    ...mapState('user',['userInfo'])
  },
  mounted() {
    this.$store.commit("user/SETUSERINFO",JSON.parse(localStorage.getItem("adminUserInfo")))
    let query = {
      userId:this.userInfo.userId
    }
    pageHomeInfo(query).then(res=>{
      console.log(res.data)
      if (res.data.code === 200) {
        this.echartsList = res.data.data.echartsList
        this.userData = res.data.data.user
        this.$store.commit("user/SETUSERINFO",res.data.data.user)
        localStorage.removeItem("adminUserInfo")
        localStorage.setItem("adminUserInfo",JSON.stringify(this.userData))
        this.tableData = res.data.data.volunteers
        this.cardInfo[0].value = res.data.data.cards[0]
        this.cardInfo[1].value = res.data.data.cards[1]
        this.cardInfo[2].value = res.data.data.cards[2]
        this.cardInfo[0].describe = '丢失总数'
        this.cardInfo[1].describe = '已找到'
        this.cardInfo[2].describe = '未找到'
        this.loading = false
      }
    })
    const that = this
    console.log(this) // 当前About组件
    setTimeout(function () { // 这里定时器是因为，绘图太快，数据跟不上，等2s后在绘图！！
      that.init()
    }, 2000)
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
.echarts{
  display: inline-block;
  padding: 40px;
  margin-left: 40px;
  width: 80%;
  height: 520px;
}
</style>
