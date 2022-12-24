<template>

<div id="login" :style="bgStyle">

  <div id="login-from">
    <el-avatar style="margin-left: 110px" :size="80" :src="logoUrl" ></el-avatar>

    <div class="title">视网膜血管分割平台</div>

    <login-from ref="loginfrom" @userlogin="login"/>

    <div class="create-account">
      <br/>
      没有账号？ <el-link @click="toCreateAccount" type="primary">点击注册</el-link>
    </div>
  </div>
</div>

</template>

<script>
import LoginFrom from "@/components/loginfrom/LoginFrom";

import {LOGINBACKGROUND} from "@/util/ImageURL";

import {loginNetwork} from "@/network/user";

export default {
  name: "login",
  components:{
    LoginFrom
  },
  data() {
    return {
      bgStyle: LOGINBACKGROUND,
      logoUrl: require("@/assets/img/logo.png"),
      createAccountPath: '/createaccount',
      username: '',
      isStartFaceLogin: false
    }
  },
  methods: {

    toCreateAccount() {
      this.$router.push(this.createAccountPath)
    },
    /**
     * 登录方法
     */
    login(form){
      let userName = form.username
      let userPwd = form.password

      const loading = this.$loading({
        lock: true,
        text: '正在登录',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      loginNetwork(userName, userPwd).then(data =>{
        if(data.code === 200){
          let userIfo = data.result

          this.$message.success('登录成功，即将进入系统')

        }else{
          //登录失败
         this.$message.error('登录失败, '+data.msg)
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
