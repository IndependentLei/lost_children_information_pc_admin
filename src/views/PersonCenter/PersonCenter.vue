<template>
  <el-card shadow="always" class="personalCenter">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="头像" prop="avatarImg">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9191/common/uploadPic"
          :headers="{Authentication:Authentication}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.avatarImg" :src="ruleForm.avatarImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="账号" prop="userCode">
        <el-input v-model="ruleForm.userCode" :disabled="ruleForm.userCode === 'admin'"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
          <el-radio v-model="ruleForm.sex" label="0">女</el-radio>
          <el-radio v-model="ruleForm.sex"  label="1">男</el-radio>
          <el-radio v-model="ruleForm.sex"  label="2">未知</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {mapState} from 'vuex'
import {getCookie} from "../../utils/cookie";
import {exitUserInfo} from '../../api/User/user'
import {Message} from "element-ui";
export default {
  name: "PersonCenter",
  data(){
    var validateAttach = (rule, value, callback) => {
      if (value === undefined){
        callback(new Error("上传图片不能为空"))
      }
      callback()
    }
    var validateAge = (rule, value, callback) => {
      console.log(this.ruleForm)
      if (this.ruleForm.age === undefined){
        callback(new Error("年龄不能为空"))
      }
      if (this.ruleForm.age <= 0 && this.ruleForm.age > 150){
        callback(new Error("年纪必须在0-150之间"))
      }
      callback()
    }
    return{
      ruleForm:{},
      rules:{
        avatarImg:[
          { required:true, validator: validateAttach, trigger: 'blur' },
        ],
        userCode:[
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 20 , message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        age:[
          {required:true, validator: validateAge, trigger: 'blur' },
        ],
        sex:[
          {required:true, message: "性别不能为空", trigger: 'blur' },
        ]
      },

    }
  },
  methods:{
    handleAvatarSuccess(res){
      this.$store.commit("user/CHANGEUSERAVATER",res.data)
      this.ruleForm = this.userInfo
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
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          exitUserInfo(this.ruleForm).then(res=>{
            if(res.data.code === 200){
              Message.success("修改成功")
            }else{
              Message.error("修改失败")
            }
          })
        } else {
          return false;
        }
      })
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    },
    Authentication(){
      return getCookie("Authentication")
    }
  },
  computed:{
    ...mapState('user',['userInfo'])
  },
  mounted() {
    this.ruleForm = this.userInfo
    console.log(this.userInfo)
  }
}
</script>

<style lang="css" scoped>
.personalCenter{
  width: 30%;
  height: 100%;
}
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
