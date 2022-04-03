<template>
  <div class="user">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="listSelect.roleValue" placeholder="角色名" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="listSelect.createName" placeholder="创建人" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom: 10px">
      <el-button type="primary" @click="dialog.dialogFormVisible = true;dialog.title = '新增角色'" >添加</el-button>
      <el-button type="success" :disabled="!multipleSelection.length" @click="batchDel">批量删除</el-button>
      <el-button type="warning" @click="exportRoleExcel">导出</el-button>
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
        prop="roleValue"
        label="角色"
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="createTime"
        label="创建时间"
        width="250">
        <template #default="{row}">
          <span v-if="row.createTime">
            {{row.createTime | dateFormat}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="createName"
        label="创建人"
        show-overflow-tooltip
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="updateTime"
        label="更新时间"
        show-overflow-tooltip
        width="250">
        <template #default="{row}">
          <span v-if="row.updateTime">
            {{row.updateTime | dateFormat}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="updateName"
        label="更新人"
        show-overflow-tooltip
        width="120">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success" @click="exitRoleInfo(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger" @click="delRoleInfo(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.page.total">
    </el-pagination>
    <el-dialog :title="dialog.title" :visible.sync="dialog.dialogFormVisible" width="30%"
               style="text-align: center" @close="cancelDialog('ruleForm')" >
      <el-form :model="dialog.form"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleValue">
          <el-input  v-model="dialog.form.roleValue" autocomplete="off" clearable ></el-input>
        </el-form-item>
        <el-form-item label="权限的值" prop="roleName">
          <el-input v-model="dialog.form.roleName" autocomplete="off" clearable :disabled="dialog.title === '编辑角色'" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="cancelDialog('ruleForm')">取 消</el-button>
        <el-button type="primary" v-show="dialog.title === '新增角色'"  @click="submitForm('ruleForm')">添加</el-button>
        <el-button type="primary" v-show="dialog.title === '编辑角色'" @click="exitForm('ruleForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {roleList,addRole,delRoles,updateRole,getRoleById,exportRole} from "../../../api/Sys/Role/Role"
import {Message} from "element-ui";
export default {
  name: "Role",
  data(){
    return{
      dialog:{
        title:'',
        dialogFormVisible : false,
        form:{
          roleValue:'',
          roleName:''
        }
      },
      rules: {
        roleValue: [
          { required: true ,message: '请输入角色名' , trigger: 'blur'}
        ],
        roleName: [
          { required: true ,message: '请输入权限值' , trigger: 'blur'}
        ]
      },

      listSelect:{
        createName:'',
        roleValue:''
      },
      tableData:[],
      multipleSelection:[],
      page:{
        currentPage:1,
        pageSize:5,
        total:''
      },
      loading:true,
      roleId:null
    }
  },
  methods:{
    exitRoleInfo(index,row){
      getRoleById(row.roleId).then(res=>{
        this.roleId = row.roleId
        this.dialog.title = '编辑角色'
        this.dialog.form.roleValue = res.data.data.roleValue
        this.dialog.form.roleName = res.data.data.roleName
        this.dialog.dialogFormVisible = true
      })
    },
    exitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let query = {
            roleId:this.roleId,
            roleName : this.dialog.form.roleName,
            roleValue : this.dialog.form.roleValue
          }
          updateRole(query).then(res=>{
            if (res.data.code === 200){
              this.onSubmit()
              Message.success(res.data.msg)
            }else{
              Message.error(res.data.msg)
            }
            this.dialog.dialogFormVisible = false
          })
        } else {
          return false;
        }
      });
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addRole(this.dialog.form).then(res=>{
            if (res.data.code === 200){
              this.onSubmit()
              Message.success(res.data.msg)
            }else{
              Message.error(res.data.msg)
            }
            this.dialog.dialogFormVisible = false
          })
        } else {
          return false;
        }
      });
    },
    cancelDialog(formName){
      this.$refs[formName].resetFields();
      this.dialog.dialogFormVisible = false
      this.dialog.form = {}
    },
    handleSizeChange(val) {
      this.loading = true
      this.pageUtil(this.page.currentPage,val)
    },
    handleCurrentChange(val) {
      this.loading = true
      this.pageUtil(val,this.page.pageSize)
    },
    delRoleInfo(index,row){
      if (!confirm("确定要删除吗?"))
        return
      delRoles(row.roleId).then(res=>{
        if (res.data.code === 200){
          this.onSubmit()
          Message.success(res.data.msg)
        }else{
          Message.error(res.data.msg)
        }
      })
    },
    exportRoleExcel(){
      exportRole().then(res=>{
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
      })
    },
    batchDel(){
      if (!confirm("确定要删除吗?"))
        return
      delRoles(this.multipleSelection).then(res=>{
        if (res.data.code === 200){
          this.onSubmit()
          Message.success(res.data.msg)
        }else{
          Message.error(res.data.msg)
        }
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val.map(item=>{
        return item.roleId
      })
    },
    onSubmit() {
      this.loading = true
      this.pageUtil(this.page.currentPage,this.page.pageSize)
    },
    pageUtil(startPage,pageSize) {
      let role = {
        roleValue:this.listSelect.roleValue,
        createName:this.listSelect.createName,
        startPage:startPage,
        pageSize:pageSize
      }
      roleList(role).then(res=>{
        this.loading = false
        this.tableData = res.data.data.list
        this.page.currentPage = res.data.data.current
        this.page.pageSize = res.data.data.size
        this.page.total = res.data.data.total

      })
    }
  },
  mounted() {
    this.pageUtil(1,this.page.pageSize)
  }
}
</script>

<style scoped>

</style>
