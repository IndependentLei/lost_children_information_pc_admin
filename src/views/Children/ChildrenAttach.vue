<template>
  <div class="childrenInfoAttach">
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
      <el-button type="warning" @click="exportChildrenInfoAttach">导出</el-button>
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
        prop="pic"
        label="图片"
        width="200">
        <template #default="{row}">
          <span v-if="row.pic">
              <el-image
                style="width: 100px; height: 100px"
                :src="row.pic"
                :preview-src-list="picList">
              </el-image>
          </span>
        </template>
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger" @click="delChildrenInfoAttach(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getAttachByChildrenId} from '../../api/Children/ChildrenInfoAttach'
export default {
  name: "ChildrenAttach",
  data(){
    return{
      picList:[],
      tableData:[],
      listSelect:{

      },
      multipleSelection:[],
      loading:true
    }
  },
  methods:{
    delChildrenInfoAttach(){

    },
    handleSelectionChange(){

    },
    onSubmit(){

    },
    batchDel(){

    },
    exportChildrenInfoAttach(){

    },
  },
  mounted() {
    getAttachByChildrenId(this.$route.query.childrenId).then(res=>{

      this.tableData = res.data.data
      if (this.tableData != null){
          this.picList = this.tableData.map(item =>{
            return item.pic
          })
      }
      this.loading = false
    })

  }
}
</script>

<style scoped>

</style>
