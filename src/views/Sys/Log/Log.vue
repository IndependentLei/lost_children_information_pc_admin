<template>
  <div class="user">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="listSelect.userCode" placeholder="用户名" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom: 10px">
      <el-button type="success" :disabled="!multipleSelection.length" @click="batchDel">批量删除</el-button>
      <el-button type="warning" @click="exportLog">导出</el-button>
    </el-row>
    <el-table
      v-loading="loading"
      :align="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      :key="1"
      ref="multipleTable"
      :data="tableData"
      :default-sort = "{prop: 'createTime'}"
      :header-cell-style="{'text-align':'center'}"
      border
      tooltip-effect="dark"
      style="width: 90%;"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        sortable
        width="55">
      </el-table-column>
      <el-table-column
        sortable
        prop="userCode"
        label="用户名"
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="methodName"
        label="请求方法"
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="executionTime"
        label="执行时间"
        show-overflow-tooltip
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="description"
        label="方法描述"
        show-overflow-tooltip
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="requestIp"
        label="ip"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        sortable
        prop="createTime"
        label="日期"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        sortable
        prop="requestUrl"
        label="路径"
        show-overflow-tooltip
        width="200">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger" @click="delLog(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 33px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
</template>
<script>
import {getLog,delLog,exportLog} from "../../../api/Sys/Log/Log"
import {Message} from "element-ui"
export default {
  name: "Log",
  data(){
    return{
      loading:true,
      listSelect:{
        userCode:'',
      },
      tableData:[],
      multipleSelection:[],
      page:{
        currentPage:1,
        pageSize:5,
        total:undefined
      }
    }
  },
  methods:{
    handleSizeChange(val) {
      this.page.pageSize = val
      this.pageUtils(1,val)
    },
    handleCurrentChange(val) {
      this.pageUtils(val,this.page.pageSize)
    },
    delLog(index,row){
      if (!confirm("确定删除吗?")){
        return
      }
      delLog(row.id).then(res=>{
        if (res.data.code === 200){
          this.pageUtils(this.page.currentPage,this.page.pageSize)
          Message.success("删除成功")
        }else {
          Message.success("删除失败")
        }
      })
    },
    exportLog(){
      exportLog().then(res=> {
          const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
          //IE10以上支持blob但是依然不支持download
          if ('download' in document.createElement('a')) {
            //支持a标签download的浏览器
            const link = document.createElement('a') //创建a标签link.download = '标注数据.xls' //a标签添加属性
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            document.body.appendChild(link)
            link.click() //执行下载
            URL.revokeObjectURL(link.href) //释放url
            document.body.removeChild(link) //释放标签
          }
        }).catch(reason => {
          Message.error(reason)
        })
    },
    batchDel(){
      if (!confirm("确定删除吗?")){
        return
      }
      delLog(this.multipleSelection).then(res=>{
        if (res.data.code === 200){
          this.pageUtils(this.page.currentPage,this.page.pageSize)
          Message.success("删除成功")
        }else {
          Message.success("删除失败")
        }
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val.map(item=>{
        return item.id
      })
    },
    onSubmit() {
      this.pageUtils(1,this.page.size)
    },
    pageUtils(startPage, pageSize) {
      let log = {
        userCode : this.listSelect.userCode,
        pageSize : this.page.pageSize,
        startPage : this.page.currentPage
      }
      getLog(log).then(res=>{
        console.log(res.data)
        this.loading = false
        this.tableData = res.data.data.list
        this.page.currentPage = res.data.data.current
        this.page.pageSize = res.data.data.size
        this.page.total = res.data.data.total
      })
    }
  },
  mounted() {
    this.pageUtils(1,this.page.pageSize)
  }
}
</script>

<style scoped>

</style>
