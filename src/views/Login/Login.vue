<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules"  label-width="80px" class="login-form">
      <h2 class="login-title">管理系统</h2>
      <div style="text-align: center">
        <el-form-item label="账号" prop="username" style="margin-right: 40px">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="margin-right: 40px">
          <el-input v-model="form.password " autocomplete="off" type="password"></el-input>
        </el-form-item>
      </div>


      <div class="button2">
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button  @click="resetForm('form')">重置</el-button>
        </el-form-item>

      </div>
    </el-form>
  </div>
</template>
<script>

import {login} from '../../api/Login/login'
import {mapState} from "vuex"
export default {
  name:'login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules:{
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 20 , message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20 , message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  computed:{
    ...mapState("user",['Authentication'])
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // alert('submit!');
          login(this.form.username,this.form.password).then((res)=>{
            console.log(res.data)
            localStorage.setItem("Authentication",res.data.Authentication)
            this.$store.commit("user/set_token",res.data.Authentication)
            if (this.Authentication !== ''){
              this.$router.push({name:'mainPage'})
            }
          })
        }
      })
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    openMessage(message,type){
      this.$message({
        message: message,
        type: type
      });
    }
  }
};
</script>

<style lang="css" scoped>
.login-form {
  width: 350px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: rgba(255, 255, 255,0.9); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(https://file.7b114.xyz/blog_avater/2022/01/18/1642517003480070.jpg);
  background-size: cover;
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
}

.button2{
  display: flex;
}
</style> -->
