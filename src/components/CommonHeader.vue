<template>
  <div>
    <header>
      <div class="left-container">
        <el-button @click="isOpen" plain icon="el-icon-menu" size="mini">
        </el-button>
        <h3 style="color: white ;cursor:pointer" @click="backHome">首页</h3>
        <h4 style="color: white ; margin-left: 10px" v-if="menuLabel !== '首页'">/</h4>
        <h3 style="color: white ;margin-left: 10px" v-show="menuLabel !== '首页'">{{menuLabel}}</h3>
      </div>
      <div class="right-container">
        <el-dropdown trigger="click" size="mini" @command="handleCommand">
          <div>
            <img :src="userInfo.avatarImg" style="cursor:pointer">
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personCenter">个人中心</el-dropdown-item>
            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>

    <el-dialog title="修改密码"
               :visible.sync="dialogFormVisible"
               append-to-body
               close-on-click-modal
               width="30%"
               style="text-align: center">

      <el-form :model="form"
               status-icon
               :rules="rules"
               ref="form"
               label-width="100px"
               class="demo-ruleForm">

        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword" ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="form.newPassword" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="form.checkPassword" ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="text-align: center;padding-top: 0">
        <el-button @click="exitChangePassword">退出</el-button>
        <el-button type="primary" @click="modifyPassword">修改</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {removeCookie} from "../utils/cookie";
import {logout} from "../api/Login/logout";

export default {
  name: "CommonHeader",
  data(){
    let validateNewPass = (rule , value , callback) =>{
      if (value === ''){
        callback(new Error("请输入旧密码"))
      }else if(value.length < 6){
        callback(new Error("密码不能小于6位"))
      }else if(value.length > 16){
        callback(new Error("密码不能超过16位"))
      }else
        callback()
    }
    let validatePass = (rule, value, callback) => {

      if (value === '') {
        callback(new Error('请输入密码'));
      }
      else if (value === this.form.oldPassword){
        callback("新密码和旧密码不能一样")
      }
      else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{

      form:{
        oldPassword:'',
        newPassword:'',
        checkPassword:''
      },
      rules: {
        oldPassword: [
          {required:true,validator: validateNewPass, trigger:'blur'}
        ],
        newPassword: [
          {required:true,validator: validatePass, trigger: 'blur'}
        ],
        checkPassword: [
          {required:true,validator: validatePass2, trigger: 'blur'}
        ]
      },

      dialogFormVisible:false,
      formLabelWidth: '120px'

    }
  },
  computed:{
    ...mapState('user',['userInfo','Authentication']),
    ...mapState('tags',['menuLabel','isCollapse']),
  },
  methods:{
    ...mapMutations('tags',{isOpen:'ISOPEN'}),
    // 回到首页
    backHome(){
      this.$router.push({name:'home'})
      let item={
        id:1,
        label:'首页'
      }
      this.$store.commit('tags/ACTIVEMENU',item)
    },

    /**
     * 头像下拉框选择
     */
    handleCommand(command){
      if(command === 'logOut'){
        this.logOut()
      }else if(command === 'changePassword'){
        this.dialogFormVisible = true
      }else{
        // 进入personCenter组件
        this.$router.push({name:'personCenter'})
        let tagList = {
          id:9999,
          path: this.$route.path,
          name:'personCenter',
          label:'个人中心',
          icon:'user-solid',
          url: this.$route.fullPath
        }
        this.$store.commit('tags/ACTIVEMENU',tagList)
        this.$store.dispatch('tags/inTagsList',tagList)
      }
    },

    /**
     * 退出登录
     */
    logOut(){
      logout().then(res=>{
        removeCookie("Authentication")
        this.openMessage('退出成功','success')
        this.$router.push({name:'login'})
      })
    },

    // 修改密码
    modifyPassword(){

      this.$refs['form'].validate((valid) =>{
        if(valid){
          //TODO .... 上传修改密码 ................
          this.openMessage("修改成功",'success')
        }else {
          return false
        }
      })
    },

    // 退出修改密码，同时重置form表单
    exitChangePassword(){
      this.$refs['form'].resetFields();
      this.dialogFormVisible = false
    },

    // 弹出信息
    openMessage(message, type) {
      this.$message({
        message: message,
        type: type
      });
    }
  }
}
</script>

<style scoped>
header{
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.left-container{
  display: flex;
  align-items: center;

}
.el-button {
  margin-right: 20px;
}

.right-container{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

img{
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>
