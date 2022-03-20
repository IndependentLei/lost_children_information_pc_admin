<template>
  <div class="user">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="listSelect.userCode" placeholder="用户名" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="listSelect.role" clearable placeholder="角色" style="width: 150px">
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="listSelect.state" clearable placeholder="状态" style="width: 150px">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom: 10px">
      <el-button type="primary" @click="dialog.dialogFormVisible = true;dialog.title = '添加用户';dialog.checked = true;dialog.checkRules = dialog.rules">添加</el-button>
      <el-button type="success" :disabled="!multipleSelection.length" @click="batchDel">批量删除</el-button>
      <el-button type="info">导入</el-button>
      <el-button type="warning">导出</el-button>
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
        prop="age"
        label="年龄"
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
        prop="state"
        label="用户状态"
        show-overflow-tooltip
        width="120">
        <template #default="{row}">
          <span v-if="row.state">
            <el-tag type="success" v-if="row.state === '0'">正常</el-tag>
            <el-tag type="warning" v-if="row.state === '1'">禁止发言</el-tag>
            <el-tag type="danger" v-if="row.state === '2'">禁止登录</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="roleType"
        label="角色"
        show-overflow-tooltip
        width="120">
        <template #default="{row}">
          <span v-if="row.roleType">
            <el-tag type="success" v-if="row.roleType === '1'">管理员</el-tag>
            <el-tag type="warning" v-if="row.roleType === '2'">用户</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="createTime"
        label="创建时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" @click="editUserInfo(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="primary" @click="resetPwd(scope.$index, scope.row)">重置密码</el-button>
          <el-button
            size="mini"
            type="danger" @click="delUserInfo(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog :title="dialog.title" :visible.sync="dialog.dialogFormVisible" width="30%"
               style="text-align: center" @close="cancelDialog('form')" >
      <el-form :model="dialog.form" :rules="dialog.checkRules" ref="form" label-width="100px">
        <el-form-item label="账号"  prop="userCode">
          <el-input v-model="dialog.form.userCode" placeholder="账号" autocomplete="off" clearable style="width:70%;margin-left: -92px" ></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="userPwd" v-show="dialog.checked">
          <el-input v-model="dialog.form.userPwd" placeholder="密码" autocomplete="off" clearable  style="width:70%;margin-left: -92px"></el-input>
        </el-form-item>
        <el-form-item label="性别"  prop="sex">
          <el-select v-model="dialog.form.sex" placeholder="请选择用户性别" clearable style="margin-left: -95px">
            <el-option label="女" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="未知" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄"  prop="age">
          <el-input v-model.number="dialog.form.age" placeholder="年龄" autocomplete="off" clearable  style="width:70%;margin-left: -92px"></el-input>
        </el-form-item>
        <el-form-item label="状态"  prop="state" >
          <el-select v-model="dialog.form.state" placeholder="请选择用户状态" clearable style="margin-left: -95px">
            <el-option label="正常" value="0"></el-option>
            <el-option label="禁止发言" value="1"></el-option>
            <el-option label="禁止登录" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色"  prop="roleType">
          <el-select v-model="dialog.form.roleType" placeholder="请选择用户角色" clearable style="margin-left: -95px">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="用户" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="cancelDialog('form')">取 消</el-button>
        <el-button type="primary" v-if="dialog.checked" @click="submitForm('form')">添加</el-button>
        <el-button type="primary" v-if="!dialog.checked" @click="exitForm('form')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getUser,addUser,getUserById,exitUserInfo,delUserByIds,changePwd} from '../../api/User/user'
import {Message} from "element-ui"
export default {
  name: "user",
  data() {
    return {
      roleOptions:[
        {"label":"管理员","value":"1"},
        {"label":"用户","value":"2"},
      ],
      stateOptions:[
        {"label":"正常","value":"0"},
        {"label":"禁止发言","value":"1"},
        {"label":"禁止登录","value":"2"},
      ],
      listSelect:{
        userCode:"",
        role : "",
        state :""
      },
      tableData: [],
      page:{
        size:5,
        currentPage:1,
        total:undefined
      },
      loading: true,
      multipleSelection:[],
      dialog:{
        checked:undefined,
        rules1:{
          userCode: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          state: [
            {required: true ,message: '请选择用户状态' , trigger: 'blur'}
          ],
          roleType: [
            {required: true ,message: '请选择用户角色' , trigger: 'blur'}
          ],
          sex: [
            {required: true ,message: '请选择性别' , trigger: 'blur'},
          ],
          age: [
            {required: true ,message: '请输入年龄' , trigger: 'blur'},
            { type: 'number',message:'年龄必须是数字',trigger: 'blur'}
          ]
        },
        checkRules:undefined,
        rules:{
          userCode: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          userPwd: [
            {required: true ,message: '请输入密码' , trigger: 'blur'},
            { min:6,max:16,message:'长度在6到16个字符',trigger: 'blur'}
          ],
          state: [
            {required: true ,message: '请选择用户状态' , trigger: 'blur'}
          ],
          roleType: [
            {required: true ,message: '请选择用户角色' , trigger: 'blur'}
          ],
          sex: [
            {required: true ,message: '请选择性别' , trigger: 'blur'},
          ],
          age: [
            {required: true ,message: '请输入年龄' , trigger: 'blur'},
            { type: 'number',message:'年龄必须是数字',trigger: 'blur'}
          ]
        },
        dialogFormVisible:false,
        formLabelWidth:'100px',
        title:'',
        form:{
          state:"",
          userCode:"",
          roleType:"",
          userPwd:"",
          sex:"",
          age:""
        }
      }
    }
  },
  methods: {
    resetPwd(index,row){
      if (!confirm("确定重置该账号密码?")){
        return
      }
      let user = {
        userId:row.userId,
        userPwd:''
      }
      changePwd(user).then(res =>{
        if (res.data.code === 200){
          Message.success(res.data.msg)
        } else{
          Message.error(res.data.msg)
        }
      })
    },
    batchDel(){
      if (!confirm("确定删除吗?")){
        return
      }
      delUserByIds(this.multipleSelection).then(res=>{
        if (res.data.code === 200){
          this.pageUtils(this.page.currentPage,this.page.size)
          Message.success("删除成功")
        }else{
          Message.error("删除失败")
        }
      })
    },
    delUserInfo(index,row){
      if (!confirm("确定删除吗?")){
        return
      }
      delUserByIds(row.userId).then(res=>{
        if (res.data.code === 200){
          this.pageUtils(this.page.currentPage,this.page.size)
          Message.success("删除成功")
        }else{
          Message.error("删除失败")
        }
      })
    },
    editUserInfo(index,row){
      this.dialog.checkRules = this.dialog.rules1
      this.dialog.checked = false
      this.dialog.title = "编辑用户信息"

      getUserById(row.userId).then(res=>{
        this.dialog.form = res.data.data
      })

      this.dialog.dialogFormVisible = true
    },
    exitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          exitUserInfo(this.dialog.form).then(res=>{
            this.pageUtils(this.page.currentPage,this.page.size)
            if (res.data.code === 200){
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUser(this.dialog.form).then(res=>{
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
    onSubmit() {
      this.pageUtils(1,this.page.size)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item =>{
        return item.userId;
      });
    },
    // 分页容量的改变
    handleSizeChange(val) {
      this.page.size = val
      this.pageUtils(1,val)
    },
    // 当前页数的改变
    handleCurrentChange(val) {
      this.page.currentPage =val
      this.pageUtils(val,this.page.size)
    },
    pageUtils(startPage,pageSize){
      let user = {
        startPage:startPage,
        pageSize:pageSize,
        userCode: this.listSelect.userCode,
        roleType: this.listSelect.role,
        state: this.listSelect.state
      }
      getUser(user).then((res)=>{
        this.loading = false;
        this.tableData = res.data.data.list
        this.page.total = res.data.data.total

      })
    }
  },

  mounted() {
    this.pageUtils(1,5)
  }
}
</script>

<style lang="css" scoped>
.user{
}
</style>
