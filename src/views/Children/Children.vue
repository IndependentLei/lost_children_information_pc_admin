<template>
  <div class="childrenInfo">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="listSelect.createName" placeholder="发布者" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="listSelect.childrenName" placeholder="儿童姓名" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="listSelect.idCard" placeholder="身份证" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="listSelect.lostLocation" placeholder="丢失地点" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="listSelect.childrenFeature" placeholder="儿童特征" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="listSelect.age" placeholder="年龄" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="listSelect.sex" placeholder="性别" clearable>
          <el-option
            v-for="item in sexOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="listSelect.find" placeholder="儿童现状" clearable>
          <el-option
            v-for="item in findOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom: 10px">
      <el-button type="success" :disabled="!multipleSelection.length" @click="batchDel">批量删除</el-button>
      <el-button type="warning" @click="exportChildrenInfo">导出</el-button>
    </el-row>
    <el-table
      v-loading="loading"
      :align="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
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
        prop="createName"
        label="发布者"
        width="200">
      </el-table-column>
      <el-table-column
        sortable
        prop="idCard"
        label="身份证号"
        width="200">
      </el-table-column>
      <el-table-column
        sortable
        prop="childrenName"
        label="儿童名"
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="sex"
        label="性别"
        show-overflow-tooltip
        width="120">
        <template #default="{row}">
          <span v-if="row.sex">
            <el-tag  v-if="row.sex === '0'">女</el-tag>
            <el-tag type="success" v-if="row.sex === '1'">男</el-tag>
            <el-tag type="warning" v-if="row.sex === '2'">未知</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="age"
        label="年纪"
        show-overflow-tooltip
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="lostLocation"
        label="丢失地点"
        show-overflow-tooltip
        width="200">
      </el-table-column>
      <el-table-column
        sortable
        prop="lostTime"
        label="丢失时间"
        show-overflow-tooltip
        width="200">
        <template #default="{row}">
          <span v-if="row.lostTime">
            {{row.lostTime | dateFormat}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="childrenFeature"
        label="儿童特征"
        show-overflow-tooltip
        width="200">
      </el-table-column>
      <el-table-column
        sortable
        prop="contactPhone"
        label="联系电话"
        show-overflow-tooltip
        width="200">
      </el-table-column>
      <el-table-column
        sortable
        prop="createTime"
        label="创建时间"
        show-overflow-tooltip
        width="200">
        <template #default="{row}">
          <span v-if="row.createTime">
            {{row.createTime | dateFormat}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="find"
        label="儿童现状"
        show-overflow-tooltip
        width="200">
        <template #default="{row}">
          <span v-if="row.find">
            <el-button size="mini" type="danger" @click="findChild(row)"  v-if="row.find === '0'">未找到</el-button>
            <el-button size="mini" type="success" @click="findChild(row)"  v-else >已找到</el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        label="附件"
        show-overflow-tooltip>
        <template #default="{row}">
          <router-link :to="{
          name:'childrenAttach',
          query:{
            childrenId:row.childrenId,
          }
        }">附件</router-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger" @click="delChildrenInfo(scope.$index, scope.row)">删除</el-button>
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
      style="margin-top: 15px">
    </el-pagination>
  </div>
</template>

<script>
import {listByPage,delChildInfo,updateChildInfo} from "../../api/Children/ChildrenInfo"
export default {
  name: "Children",
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
      findOptions:[
        {label:'未找到',value:'0'},
        {label:'已找到',value:'1'}
      ],
      sexOptions:[
        {label:'女',value:'0'},
        {label:'男',value:'1'},
        {label:'未知',value:'2'}
      ],
      tableData:[],
      listSelect:{
        childrenName:'',
        createName:'',
        idCard:'',
        sex:'',
        age:'',
        lostLocation:'',
        childrenFeature:'',
        startTime:'',
        endTime:'',
        find:''
      },
      multipleSelection:[],
      timeSelect:[],
      page:{
        size:5,
        currentPage:1,
        total:undefined
      },
      loading:true
    }
  },
  methods:{
    findChild(row){
      console.log(row)
      let query = {
        childrenId: row.childrenId,
        find : row.find === '0' ? '1' : '0'
      }
      updateChildInfo(query).then(res=>{
        if (res.data.code === 200){
          this.onSubmit()
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    handleSizeChange(val){
      this.pageUtil(this.page.currentPage,val)
    },
    handleCurrentChange(val){
      this.pageUtil(val,this.page.size)
    },
    editChildrenInfo(index,row){

    },
    delChildrenInfo(index,row){
      if (!confirm("确定删除?")){
        return 0
      }
      delChildInfo(row.childrenId).then(res=>{
        if (res.data.code === 200){
          this.$message.success(res.data.msg)
          this.pageUtil(this.page.currentPage,this.page.size)
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val.map(item=>{
        return item.childrenId
      })
    },
    onSubmit(){
      this.pageUtil(1,this.page.size)
    },
    batchDel(){
      if (!confirm("确定删除?")){
        return 0
      }
      delChildInfo(this.multipleSelection).then(res=>{
        if (res.data.code === 200){
          this.$message.success(res.data.msg)
          this.pageUtil(this.page.currentPage,this.page.size)
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    exportChildrenInfo(){

    },
    pageUtil(startPage,pageSize){
      this.loading = true
      let formData = this.listSelect
      let query = {
        startPage:startPage,
        pageSize:pageSize,
        childrenName:formData.childrenName,
        createName:formData.createName,
        idCard:formData.idCard,
        sex:formData.sex,
        age:formData.age,
        lostLocation:formData.lostLocation,
        childrenFeature:formData.childrenFeature,
        startTime:this.timeSelect[0]===null?'':this.timeSelect[0],
        endTime:this.timeSelect[1]===null?'':this.timeSelect[1],
        find:formData.find
      }

      listByPage(query).then(res=>{
        this.tableData = res.data.data.list
        this.page.currentPage = res.data.data.current
        this.page.size = res.data.data.size
        this.page.total = res.data.data.total
        this.loading = false
      })
    },
  },
  mounted(){
    this.pageUtil(1,5)
  }
}
</script>

<style scoped>

</style>
