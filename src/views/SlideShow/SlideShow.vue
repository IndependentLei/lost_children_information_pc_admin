<template>
  <div class="user">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="formInline.context" placeholder="内容"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="formInline.state" placeholder="是否轮播" clearable>
          <el-option label="轮播" value="0"></el-option>
          <el-option label="不轮播" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row >
      <el-button type="primary" @click="dialogFormVisible = true;flag = 1" plain>添加</el-button>
      <el-button :disabled="delIds.length === 0 " type="success" @click="batchDelete(1, delIds)" plain>批量删除</el-button>
      <el-upload
        style="display: inline-block;padding: 0 10px 0 10px"
        class="upload-demo"
        :show-file-list="false"
        :action="actionUrl+'import'"
        :headers="{Authentication:Authentication}"
        :on-success="importSuccess"
        :on-error="importError">
        <el-button  type="info" plain>导入</el-button>
      </el-upload>
      <el-button  type="warning" plain @click="exportSlideShow">导出</el-button>
    </el-row>
    <el-table
      :align="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      :key="1"
      ref="multipleTable"
      :data="tableData"
      :default-sort = "{prop: 'date'}"
      :header-cell-style="{'text-align':'center'}"
      border
      tooltip-effect="dark"
      style="width: 90%;margin-top: 10px;"
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
        show-overflow-tooltip>
        <template #default="{row}">
          <span v-if="row.pic">
            <img :src="row.pic" alt="" width="50px" height="36px">
          </span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="createTime"
        label="时间"
        show-overflow-tooltip>
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
        width="120">
        <template #default="{row}">
          <span v-if="row.state">
            <el-tag v-if="row.state === '0'">轮播</el-tag>
            <el-tag type="danger" v-if="row.state === '1'">不轮播</el-tag>
          </span>
        </template>
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


    <el-dialog title="添加轮播图"
               :visible.sync="dialogFormVisible"
               append-to-body
               close-on-click-modal
               width="30%"
               style="text-align: center" @close="cleanData('form')">

      <el-form :model="form"
               status-icon
               :rules="rules"
               ref="form"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="轮播图" prop="pic">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:9191/common/uploadPic"
            :headers="{Authentication:Authentication}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :file-list="form.fileList">
            <img v-if="form.pic" :src="form.pic" class="avatar" alt="出错了">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="内容" prop="context" style="width: 77%;">
          <el-input type="text" v-model="form.context" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="是否轮播" prop="state" >
          <el-select v-model="form.state"  clearable placeholder="是否轮播" style="margin-left: -92px" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="large">
          <el-button v-show="flag === 1" type="primary" @click="addSlideShow('form')" >提交</el-button>
          <el-button v-show="flag === 2" type="primary" @click="exitSlideShow('form')" >修改</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import 'animate.css'
import {addSlideShow, delSlideShow, getSlideShowList,getSlideShowById,exitSlideShow,exportSlideShow} from "../../api/SlideShow/slideshow";
import {Message} from "element-ui"
import {getCookie} from "../../utils/cookie";

export default {
  name: "slideshow",
  data() {
    var validateAttach = (rule, value, callback) => {
      if (value === ""){
        callback(new Error("上传图片不能为空"))
      }
      callback()
    }
    var validateState = (rule, value, callback) => {
      console.log(value)
      if (this.form.state === null || this.form.state ===''){
        callback(new Error("轮播图状态不能为空"))
      }
      callback()
    }
    return {
      actionUrl:'http://localhost:9191/lostchildinfo/slideshow/',
      flag:undefined, //添加修改 标志位
      dialogFormVisible:false,
      form:{
        pic:undefined,
        context:undefined,
        state:undefined,
      },
      rules:{
        pic:[
          { required:true, validator: validateAttach, trigger: 'blur' },
        ],
        context:[
          { required: true, message: '轮播图概况不能为空', trigger: 'blur' },
        ],
        state:[
          {required:true, validator: validateState, trigger: 'blur' },
        ]
      },
      page:{
        currentPage:1,
        total:undefined,
        size:5
      },
      formInline: {
        context: '',
        state: ''
      },
      tableData: [],
      options:[
        {
          value: 0,
          label: '轮播'
        }, {
          value: 1,
          label: '不轮播'
        }
      ],
      multipleSelection:[],
      delIds:[],
      rowKey:324,
      exitId:null
    }
  },
  computed:{
    /**
     * 获取token
     */
    Authentication(){
      return getCookie("Authentication")
    }
  },
  methods: {
    exportSlideShow(){
      exportSlideShow().then(res=>{
        console.log("------------->"+res)
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
    importError(err, file, fileList){
      Message.error(err)
    },
    importSuccess(response, file, fileList){
      if (response.code === 200)
        Message.success(response.msg)
      else
        Message.error(response.msg)
    },
    cleanData(form){
      this.form.state = undefined
      this.form.pic = undefined
      this.form.context = undefined
      this.resetForm(form)
    },

    /**
     * 加载图片
     */
    handleAvatarSuccess(res){
      this.form.pic = res.data;
    },
    /**
     * 校验图片
     */
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
    /**
     * 改变当前页
     */
    handleCurrentChange(val){
      this.page.currentPage = val
      this.pageUtil()
    },
    /**
     * 页面容量改变
     */
    handleSizeChange(val){
      this.page.size = val;
      this.pageUtil()
    },
    /**
     * 条件查找
     */
    onSubmit() {
      this.pageUtil()
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

    /**
     * 编辑
     */
    handleEdit(index,row){
      this.exitId = row.id
      this.flag = 2
      getSlideShowById(row.id).then(res=>{
        this.dialogFormVisible = true
        this.form.state = res.data.data.state
        this.form.pic = res.data.data.pic
        this.form.context = res.data.data.context
      })
    },

    /**
     * 批量删除
     */
    handleSelectionChange(val) {
      this.delIds = val.map(item => {
        return item.id
      })
    },
    batchDelete(index,row){
      if(!confirm("确认删除吗?"))
        return
      delSlideShow(row).then(res=>{
        if(res.data.code === 200){
          Message.success(res.data.msg)
        }

        else Message.error(res.data.msg)
      })
    },

    /**
     * 单个删除
     */
    handleDelete(index,row){
      if(!confirm("确认删除吗?"))
        return
      delSlideShow(row.id).then(res=>{
        if(res.data.code === 200){
          Message.success(res.data.msg)
          this.tableData.splice(index,1)
        }
        else Message.error(res.data.msg)
      })
    },

    /**
     * 添加
     */
    addSlideShow(form){
      this.$refs[form].validate((valid) => {
        if (valid) {
          let query = {
            pic:this.form.pic,
            context:this.form.context,
            state:this.form.state
          }
          addSlideShow(query).then((res)=>{
            if(res.data.code === 200){
              this.dialogFormVisible = false
              Message.success(res.data.msg);
              this.pageUtil()
            }else
              Message.error(res.data.msg)
          }).catch().finally(()=>{
          })
        } else {
          return false;
        }
      });

    },

    /**
     * 修改信息
     */
    exitSlideShow(form){
      this.$refs[form].validate((valid) => {
        if (valid) {
          let query = {
            id: this.exitId,
            pic: this.form.pic,
            context: this.form.context,
            state: this.form.state
          }
          console.log(query.state)
          exitSlideShow(query).then((res) => {
            if (res.data.code === 200) {
              this.dialogFormVisible = false
              Message.success("操作成功");
              this.pageUtil()
            } else
              Message.error("操作失败")
          })
        } else {
          return false;
        }
      })
    },

    /**
     * 重置表单
     */
    resetForm(form){
      this.$refs[form].resetFields();
    },

    /**
     * 分页功能封装
     */
    pageUtil(){
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
      })
    }
  },
  mounted() {
    this.pageUtil()
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
  width: 220px;
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
