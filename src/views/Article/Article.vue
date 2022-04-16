<template>
  <div class="user">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="listSelect.title" placeholder="标题" style="width: 200px" clearable></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="listSelect.content" placeholder="内容" style="width: 200px" clearable></el-input>
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
      <el-button type="primary" @click="dialogForm.dialogFormVisible = true;dialogForm.title = '新增文章'" >添加</el-button>
      <el-button type="success" :disabled="!multipleSelection.length" @click="batchDel">批量删除</el-button>
      <el-button type="warning" @click="exportArticleExcel">导出</el-button>
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
        prop="title"
        label="标题"
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        prop="content"
        label="内容"
        show-overflow-tooltip
        width="250">
      </el-table-column>
      <el-table-column
        sortable
        prop="picUrl"
        label="图片"
        width="200"
        show-overflow-tooltip>
        <template #default="{row}">
          <span v-if="row.picUrl">
            <el-image
              style="width: 150px; height: 100px"
              :src="row.picUrl"
              :preview-src-list="picList">
            </el-image>
          </span>
        </template>
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success" @click="exitArticleInfo(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger" @click="delArticleInfo(scope.$index, scope.row)">删除</el-button>
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
      :total="page.total">
    </el-pagination>
    <el-dialog :title="dialogForm.title" :visible.sync="dialogForm.dialogFormVisible" width="30%"
               style="text-align: center" @close="cancelDialog('ruleForm')" >
      <el-form :model="dialogForm.form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="轮播图" prop="picUrl">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9191/common/uploadPic"
            :headers="{Authentication:Authentication}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :file-list="dialogForm.fileList">
            <img v-if="dialogForm.form.picUrl" :src="dialogForm.form.picUrl" class="avatar" alt="出错了">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input  v-model="dialogForm.form.title"  placeholder="请输入标题" autocomplete="off" clearable ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="dialogForm.form.content">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="cancelDialog('ruleForm')">取 消</el-button>
        <el-button type="primary" v-show="dialogForm.title === '新增文章'"  @click="submitForm('ruleForm')">添加</el-button>
        <el-button type="primary" v-show="dialogForm.title === '编辑文章'" @click="exitForm('ruleForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {exportArticle,getArticle,addArticle,delArticle,updateArticle,getArticleById} from "../../api/Article/Article"
import {Message} from "element-ui";
import {getCookie} from "../../utils/cookie";
export default {
  name: "Role",
  data(){
    var validateAttach = (rule, value, callback) => {
      if (value === undefined){
        callback(new Error("上传图片不能为空"))
      }
      callback()
    }
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
      rules: {
        picUrl:[
          { required:true, validator: validateAttach, trigger: 'blur' },
        ],
        title: [
          { required: true ,message: '请输入标题' , trigger: 'blur'}
        ],
        content: [
          { required: true ,message: '请输入内容' , trigger: 'blur'}
        ]
      },

      listSelect:{
        title:'',
        content:'',
      },
      tableData:[],
      multipleSelection:[],
      page:{
        currentPage:1,
        pageSize:5,
        total:0
      },
      loading:true,
      picList:[],
      dialogForm:{
        fileList:[],
        form:{
          title:'',
          content:'',
          picUrl:''
        },
        dialogFormVisible : false,
        title:''
      },
      articleId:0
    }
  },
  computed:{
    Authentication(){
      return getCookie("Authentication")
    }
  },
  methods:{
    dateToDay (originVal){
      console.log(originVal)
      const dt = new Date(originVal)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      const hh = "00"
      const mm = "00"
      const ss = "00"
      return `${y}.${m}.${d} ${hh}:${mm}:${ss}`
    },
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('轮播图只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('轮播图大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res){
      this.dialogForm.form.picUrl = res.data
    },
    exitArticleInfo(index,row){
      getArticleById(row.id).then(res=>{
        if(res.data.code === 200){
          this.dialogForm.form = res.data.data

          this.articleId = row.id
          this.dialogForm.title = '编辑文章'
          this.dialogForm.dialogFormVisible = true
        }else{
          this.$message.error("获取数据失败")
        }
      })


    },
    exitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let query = {
            id:this.articleId,
            title : this.dialogForm.form.title,
            content : this.dialogForm.form.content,
            picUrl:this.dialogForm.form.picUrl
          }
          updateArticle(query).then(res=>{
            if (res.data.code === 200){
              this.onSubmit()
              Message.success(res.data.msg)
            }else{
              Message.error(res.data.msg)
            }
            this.dialogForm.dialogFormVisible = false
          })
        } else {
          return false;
        }
      });
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addArticle(this.dialogForm.form).then(res=>{
            if (res.data.code === 200){
              this.onSubmit()
              Message.success(res.data.msg)
            }else{
              Message.error(res.data.msg)
            }
            this.dialogForm.dialogFormVisible = false
          })
        } else {
          return false;
        }
      });
    },
    cancelDialog(formName){
      this.dialogForm.dialogFormVisible = false
      this.$refs[formName].resetFields();
      this.dialogForm.form = {}
    },
    handleSizeChange(val) {
      this.pageUtil(this.page.currentPage,val)
    },
    handleCurrentChange(val) {
      this.pageUtil(val,this.page.pageSize)
    },
    delArticleInfo(index,row){
      if (!confirm("确定要删除吗?"))
        return
      delArticle(row.id).then(res=>{
        if (res.data.code === 200){
          this.onSubmit()
          Message.success(res.data.msg)
        }else{
          Message.error(res.data.msg)
        }
      })
    },
    exportArticleExcel(){
      exportArticle().then(res=>{
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
      delArticle(this.multipleSelection).then(res=>{
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
        return item.id
      })
    },
    onSubmit() {
      this.pageUtil(1,this.page.pageSize)
    },
    pageUtil(startPage,pageSize) {
      this.loading = true
      console.log(11111111111)
      console.log(this.timeSelect)
      let query = {
        title:this.listSelect.title,
        content:this.listSelect.content,
        startTime:this.timeSelect.length === 0 ? '' : this.dateToDay(this.timeSelect[0]),
        endTime:this.timeSelect.length === 0 ? '' : this.dateToDay(this.timeSelect[1]),
        startPage:startPage,
        pageSize:pageSize
      }

      getArticle(query).then(res=>{
        this.loading = false
        this.tableData = res.data.data.list
        this.page.currentPage = res.data.data.current
        this.page.pageSize = res.data.data.size
        this.page.total = res.data.data.total
        if (this.tableData != null){
          this.picList = this.tableData.map(item=>{
            return item.picUrl
          })
        }
      })
    }
  },
  mounted() {
    this.pageUtil(1,this.page.pageSize)
  }
}
</script>

<style scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar-uploader :hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
