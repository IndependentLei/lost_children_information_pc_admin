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
      </el-table-column>
      <el-table-column
        sortable
        prop="createTime"
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
            size="mini" @click="editChildrenInfo(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="mini"
            type="danger" @click="delChildrenInfo(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Comment"
}
</script>

<style scoped>

</style>
