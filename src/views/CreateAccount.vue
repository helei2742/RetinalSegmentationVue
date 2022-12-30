<template>
  <div class="create-account">
    <el-row type="flex" justify="space-around">
      <el-col :xs="20" :sm="16" :md="12" :lg="10" :xl="12">
        <div class="title">注册用户</div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :xs="20" :sm="16" :md="12" :lg="10" :xl="12">
        <create-account-from @createaccount="createAccount"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import CreateAccountFrom from "@/components/createaccountfrom/CreateAccountFrom";
import {registerNetwork} from "@/network/user";


export default {
  name: "CreateAccount",
  components:{
    CreateAccountFrom,
  },
  data(){
    return {
      logoUrl: require('@/assets/img/logo.png')
    }
  },
  methods: {
    createAccount(user) {
      const loading = this.$loading({
        lock: true,
        text: '正在创建用户',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      registerNetwork(user).then(res=>{
        if(res.success === true) {
          this.$router.push('/login')
          this.$message.success('注册成功，请前往邮箱确认后登录')
        }else {
          this.$message.error(res.errorMsg)
        }
      }).finally(()=>{
        loading.close()
      })
    }
  }
}
</script>

<style scoped>
.create-account{
  background-color: #fff;
  min-height: calc(100vh);
  padding: 0 0 50px;
}
.title{

  text-align: center;
  font-size: 32px;
  letter-spacing: 6px;
  font-weight: 500;
  margin-bottom: 10px;

  padding: 70px 0 20px;
}
</style>
