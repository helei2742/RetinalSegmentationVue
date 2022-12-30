<template>

<div id="login" :style="bgStyle">
  <div id="login-from">
    <el-avatar style="margin-left: 110px" :size="80" :src="logoUrl" ></el-avatar>

    <div class="title">视网膜血管分割平台</div>

    <login-from ref="loginfrom" @userlogin="loginClick"/>

    <div class="create-account">
      <br/>
      没有账号？ <el-link @click="toCreateAccount" type="primary">点击注册</el-link>
    </div>
  </div>


  <check-code-dialog ref="checkCodeDialog"
                     @refresh="refreshCheckCode"
                     @confirmvalidcode="login"/>

</div>

</template>

<script>
import LoginFrom from "@/components/loginfrom/LoginFrom";

import {LOGINBACKGROUND} from "@/util/ImageURL";

import {getCheckCodeNetwork, loginNetwork} from "@/network/user";
import CheckCodeDialog from "@/components/checkcodedialog/CheckCodeDialog";
import {addCookie} from "@/util/cookie";
import {USER_TOKEN} from "@/config";

export default {
  name: "login",
  components:{
    CheckCodeDialog,
    LoginFrom
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        checkCode: ''
      },
      bgStyle: LOGINBACKGROUND,
      logoUrl: require("@/assets/img/logo.png"),
      createAccountPath: '/createaccount',
    }
  },
  methods: {

    toCreateAccount() {
      this.$router.push(this.createAccountPath)
    },
    loginClick(form){
      this.form = form
      this.getCheckCode(form.username)
    },
    /**
     * 获取验证码
     */
    getCheckCode(username){
      const loading = this.$loading({
        lock: true,
        text: '正在获取验证码',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const dialog = this.$refs.checkCodeDialog
      getCheckCodeNetwork(username).then(data => {
        if(data.size !== 0){
          dialog.checkCodeImg = window.URL.createObjectURL(data)
          dialog.checkCodeVisible = true
        }else {
          this.$message.error('不存在该用户')
        }
      }).finally(()=>{
        loading.close()
      })
    },
    /**
     * 刷新验证码
     */
    refreshCheckCode(){
      this.getCheckCode(this.form.username)
    },
    /**
     * 登录方法
     */
    login(checkCode){
      this.form.checkCode = checkCode

      const loading = this.$loading({
        lock: true,
        text: '正在登录',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      loginNetwork(this.form).then(data =>{
        if(data.success === true){
          this.$message.success('登录成功，即将进入系统')
          addCookie(USER_TOKEN, data.data.token, 7*24)
          this.$store.commit('setLoginUser', data.data.loginUser)
          this.$router.push('/home')
        }else{
          //登录失败
         this.$message.error('登录失败, '+data.errorMsg)
        }
      }).catch(e => {
        this.$message.error('出错拉,检查网络试试或联系管理员')
      }).finally(()=>{
        loading.close()
      })
    }
  }
}
</script>

<style scoped>
#login{
  margin-top: -100px;
  min-height: calc(100vh - 49px);
  padding: 70px 0 50px;
}
#login-from{
  width: 300px;
  margin: 100px auto;
  background-color: #fff;
  padding: 23px 17px;
  border-radius: 16px;
}
.title{
  font-size: 30px;
  font-weight: 800;
  color: rgba(0,0,0,0.1) !important;
  -webkit-text-stroke: 1px #4294f3;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;

  text-align: center;
  width: 100%;

  margin: 20px 0;
}
.create-account{
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 20px;
  font-size: 15px;
  font-weight: 400;
  margin: 20px 0;
}

#video{
  width: 100%;
  height: 50vh;
}

#output{
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 50vh;
}
</style>
