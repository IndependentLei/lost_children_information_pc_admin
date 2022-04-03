<template>
  <div class="fatherComment">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="listSelect.userCode" placeholder="评论人" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="listSelect.replayCode" placeholder="被回复人" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="listSelect.replayContext" placeholder="回复内容" style="width: 300px" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="timeSelect"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom: 10px">
      <el-button type="success" :disabled="!multipleSelection.length" @click="batchDel">批量删除</el-button>
      <el-button type="warning" @click="exportFatherComment">导出</el-button>
    </el-row>
    <el-table
      v-loading="loading"
      :align="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      :key="1"
      ref="multipleTable"
      :data="tableData"
      :default-sort = "{prop: 'createTime', order: 'descending'}"
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
        label="评论人"
        width="200">
      </el-table-column>
      <el-table-column
        sortable
        prop="createTime"
        label="评论时间">
        <template #default="{row}">
          <span v-if="row.createTime">
            {{row.createTime | dateFormat}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="replayContext"
        label="回复内容"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        sortable
        prop="replayCode"
        label="被回复人"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger" @click="delSonComment(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page= page.currentPage
      :page-sizes="[5, 10, 15, 20]"
      :page-size = page.size
      layout="total, sizes, prev, pager, next, jumper"
      :total= page.total
      style="margin-top: 33px">
    </el-pagination>
  </div>
</template>

<script>
import {delSonComment, exportSonComment, listByPage} from "../../api/Comment/SonComment";
import {Message} from "element-ui";

export default {
  name: "SonComment",
  data(){
    return{
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      timeSelect:[],
      listSelect:{
        userCode:'',
        replayContext:'',
        replayCode:''
      },
      multipleSelection:[],
      tableData:[],
      page:{
        currentPage:null,
        size:null,
        total:null
      },
      loading:true
    }
  },
  methods:{
    handleSizeChange(val){
      this.loading = true
      this.pageUtil(this.page.currentPage,val)
    },
    handleCurrentChange(val){
      this.loading = true
      this.pageUtil(val,this.page.size)
    },
    onSubmit(){
      this.loading = true
      this.pageUtil(1,this.page.size)
    },
    batchDel(){
      if(!confirm("确定要删除该评论吗?"))
        return
      delSonComment(this.multipleSelection).then(res=>{
        if(res.data.code === 200){
          Message.success(res.data.msg)
          this.loading = true
          this.pageUtil(this.page.currentPage,this.page.size)
        }else {
          Message.error(res.data.msg)
        }
      })
    },
    exportFatherComment(){
      exportSonComment().then(res=> {
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
    handleSelectionChange(val){
      this.multipleSelection = val.map(item =>{
        return item.id
      })
    },
    delSonComment(index,row){
      if(!confirm("确定要删除该评论吗?"))
        return
      delSonComment(row.id).then(res=>{
        if(res.data.code === 200){
          Message.success(res.data.msg)
          this.loading = true
          this.pageUtil(this.page.currentPage,this.page.size)
        }else {
          Message.error(res.data.msg)
        }
      })
    },
    pageUtil(startPage,pageSize){
      let query = {
        startPage : startPage,
        pageSize : pageSize,
        userCode : this.listSelect.userCode,
        replyContent: this.listSelect.replayContext,
        replyCode : this.listSelect.replyCode,
        startTime : this.timeSelect === null ? '' : this.timeSelect[0],
        endTime : this.timeSelect === null ? '' : this.timeSelect[1]
      }
      listByPage(query).then(res=>{

        if(res.data.code === 200){
          console.log(res.data)
          this.tableData = res.data.data.list
          this.page.currentPage = res.data.data.current
          this.page.size = res.data.data.size
          this.page.total = res.data.data.total
        }
      }).finally(()=>{
        this.loading = false
      })
    }
  },
  mounted() {
    this.pageUtil(1,5)
  }
}
</script>

<style scoped>

</style>
