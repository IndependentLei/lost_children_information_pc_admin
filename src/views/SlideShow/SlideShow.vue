<template>
  <div class="user">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="formInline.context" placeholder="内容"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="formInline.state" placeholder="是否在轮播中" clearable>
          <el-option label="轮播中" value="0"></el-option>
          <el-option label="不在轮播中" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="primary" plain>添加</el-button>
      <el-button type="success" plain>批量删除</el-button>
      <el-button type="info" plain>导入</el-button>
      <el-button type="warning" plain>导出</el-button>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      :default-sort = "{prop: 'date'}"
      border
      tooltip-effect="dark"
      style="width: 90%;margin-top: 10px"
      @selection-change="handleSelectionChange" >
      <el-table-column
        type="selection"
        sortable
        width="55">
      </el-table-column>
      <el-table-column
        sortable
        prop="pic"
        label="图片"
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="createTime"
        label="时间"
        width="200">
      </el-table-column>
      <el-table-column
        sortable
        prop="context"
        label="内容"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        sortable
        prop="state"
        label="状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      style="margin-top: 42px">
    </el-pagination>
  </div>
</template>

<script>
import {getSlideShowList} from "../../api/SlideShow/slideshow";

export default {
  name: "slideshow",
  data() {
    return {
      page:{
        currentPage:1,
        total:undefined,
        size:5
      },
      formInline: {
        context: '',
        state: ''
      },
      tableData: []
    }
  },
  methods: {
    handleCurrentChange(){

    },
    handleSizeChange(val){

    },
    onSubmit() {
      let query = {
        context:this.formInline.context,
        state:this.formInline.state,
        startPage:this.page.currentPage,
        pageSize:this.page.size
      }
      getSlideShowList(query).then((res)=>{
        this.page.size = res.data.data.size
        this.page.total = res.data.data.total
        this.tableData = res.data.data.list
        console.log(res.data)
      })
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
    }
  },
  mounted() {
    let query = {
      context:this.formInline.context,
      state:this.formInline.state,
      startPage:this.page.currentPage,
      pageSize:this.page.size
    }
    getSlideShowList(query).then((res)=>{
      console.log(res.data)
      this.tableData = res.data.data.list
      console.log("---------------》"+this.tableData)
      console.log("---------------》"+res.data.data.list)
      this.page.currentPage = res.data.data.current
      this.page.size = res.data.data.size
      this.page.total = res.data.data.total
    })
  }
}
</script>

<style scoped>

</style>
