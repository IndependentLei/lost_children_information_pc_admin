<template>
  <div class="user">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="listSelect.userCode" placeholder="用户名" style="width: 200px"></el-input>
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
      <el-button type="primary">添加</el-button>
      <el-button type="success">批量删除</el-button>
      <el-button type="info">导入</el-button>
      <el-button type="warning">导出</el-button>
    </el-row>
    <el-table
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
            <el-tag  v-if="row.sex === '0'">男</el-tag>
            <el-tag type="success" v-if="row.sex === '1'">女</el-tag>
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
            <el-tag type="success" v-if="row.roleType === '0'">管理员</el-tag>
            <el-tag type="warning" v-if="row.roleType === '1'">用户</el-tag>
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
            size="mini">编辑</el-button>
          <el-button
            size="mini"
            type="danger">删除</el-button>
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
      style="margin-top: 42px">
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
import {getUser} from '../../api/User/user'
export default {
  name: "user",
  data() {
    return {
      roleOptions:[
        {"label":"管理员","value":"0"},
        {"label":"用户","value":"1"},
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
      }
    }
  },
  methods: {
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
      this.multipleSelection = val;
    },
    // 分页容量的改变
    handleSizeChange(val) {
      this.page.size = val
      this.pageUtils(1,val)
    },
    // 当前页数的改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
        console.log(user)
        console.log(res.data.data)
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
