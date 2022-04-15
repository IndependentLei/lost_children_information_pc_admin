<template>
  <div class="user">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="listSelect.label" placeholder="主题" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
<!--    <el-row style="margin-bottom: 10px">-->
<!--      <el-button type="primary" @click="dialog.dialogFormVisible=true;dialog.title='添加菜单'">新增</el-button>-->
<!--      <el-button type="success" :disabled="!multipleSelection.length" @click="batchDel">批量删除</el-button>-->
<!--      <el-button type="warning" @click="exportMenu">导出</el-button>-->
<!--    </el-row>-->
    <el-table
      v-loading="loading"
      :align="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      :key="1"
      row-key="menuId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
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
        prop="label"
        label="主题"
        width="250">
      </el-table-column>
      <el-table-column
        sortable
        prop="icon"
        label="图标"
        width="120">
        <template #default="{row}">
          <span v-if="row.icon">
            <i :class="'el-icon-'+row.icon"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="menuPath"
        label="组件路径"
        show-overflow-tooltip
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="menuName"
        label="组件名"
        show-overflow-tooltip
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="createTime"
        label="创建时间"
        show-overflow-tooltip>
        <template #default="{row}">
          <span v-if="row.createTime">
            {{row.createTime | dateFormat}}
          </span>
        </template>
      </el-table-column>
<!--      <el-table-column label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini" type="success" @click="editMenuInfo(scope.$index, scope.row)">编辑</el-button>-->
<!--          <el-button-->
<!--            size="mini" type="warning" @click="delMenu(scope.$index, scope.row)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
      <el-form :model="dialog.form" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜单等级" prop="level">
          <el-select v-model="dialog.form.level" clearable >
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click="checkLevel">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级标题" prop="icon" v-show="dialog.check">
          <el-input type="text" v-model="dialog.form.icon" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主题" prop="label">
          <el-input type="text" v-model="dialog.form.label" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input type="text" v-model="dialog.form.icon" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="menuPath">
          <el-input type="text" v-model="dialog.form.menuPath" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="组件" prop="component">
          <el-input type="text" v-model="dialog.form.component" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路由名" prop="menuName">
          <el-input type="text" v-model="dialog.form.menuName" clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="cancelDialog('ruleForm')">取 消</el-button>
        <el-button type="primary" v-show="dialog.title === '添加菜单'"  @click="submitForm('ruleForm')">添加</el-button>
        <el-button type="primary" v-show="dialog.title === '编辑菜单'" @click="exitForm('ruleForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {menuList} from "../../../api/Sys/Menu/Menu";

export default {
  name: "Menu",
  data(){
    return{
      levelOptions:[
        {value:'1',label:'一级菜单'},
        {value:'2',label:'二级菜单'},
      ],
      loading:true,
      listSelect:{
        label:'',
      },
      tableData:[],
      multipleSelection:[],
      page:{
        currentPage:1,
        pageSize:5,
        total:undefined
      },
      dialog:{
        check:false,
        dialogFormVisible:false,
        title:'',
        form:{
          level:'',
          fatherId:'',
          label:'',
          icon:'',
          menuPath:'',
          component:'',
          menuName:''
        }
      },
      rules:{

      }
      // oneLevelMenu:this.tableData.map(item => item.label)
    }
  },
  methods:{
    checkLevel(){
      console.log("---------->"+this.dialog.form.level)
      if(this.dialog.form.level === 2){
        this.dialog.check = true;
      }
    },
    cancelDialog(formName){

    },
    delMenu(index,row){

    },
    handleCurrentChange(val){
      this.loading = true
      this.pageUtil(val,this.page.pageSize)
    },
    handleSizeChange(val){
      this.loading = true
      this.pageUtil(this.page.currentPage,val)
    },
    exportMenu(){

    },
    batchDel(){

    },
    handleSelectionChange(val){
      this.multipleSelection = val.map(item=>{
        return item.id
      })
    },
    onSubmit() {
      this.loading = true
      this.pageUtil(1,this.page.pageSize)
    },
    editMenuInfo(index,row){

    },
    pageUtil(startPage,pageSize){
      let query = {
        label:this.listSelect.label,
        startPage:startPage,
        pageSize:pageSize
      }
      menuList(query).then(res=>{
        console.log(res)
        this.tableData = res.data.data.list
        this.page.currentPage = res.data.data.current
        this.page.pageSize = res.data.data.size
        this.page.total = res.data.data.total
        this.loading = false
      })
    }

  },
  mounted() {
    this.pageUtil(this.page.currentPage,this.page.pageSize)
  }
}
</script>

<style scoped>

</style>
