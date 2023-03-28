<template>
<div class="user-page">
  <user-info class="user-page-user-info" :user-info="userInfo"/>


  <password-alter-form class="password-alter-form"
                       @alterPassword="alterPassword"/>
</div>
</template>

<script>
import UserInfo from "@/views/user/child/userinfo/UserInfo";
import PasswordAlterForm from "@/views/user/child/passwordalter/PasswordAlterFrom";
import {alterPasswordNetwork, queryUserInfoNetwork} from "@/network/user";
import {delCookie} from "@/util/cookie";
import {USER_TOKEN} from "@/config";

export default {
  name: "UserPage",
  components: {PasswordAlterForm, UserInfo},
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    alterPassword(form){
      form.uid = this.$store.getters.getLoginUser.id
      alterPasswordNetwork(form).then(data=>{
        if(data.success === true) {
          delCookie(USER_TOKEN)
          this.$store.commit('setLoginUser', null)
          this.$router.push('/login')
        }else {
          this.$message.error(data.errorMsg)
        }
      })
    },
    getUserInfo(){
      queryUserInfoNetwork().then(data=>{
        if(data.success === true) {
          this.userInfo = data.data
        }
      })
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style scoped>
.user-page{
  padding: 20px 0;
  position: relative;
}
.user-page-user-info{
  position: absolute;
  top: 60px;
  left: 50%;
  margin-left: -300px;
}
.password-alter-form{
}
</style>
