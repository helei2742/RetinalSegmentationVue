<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1" @click="toHomePage">
      视网膜血管分割
    </el-menu-item>

    <el-menu-item index="2" @click="toTempPage">
      匿名使用
    </el-menu-item>

    <el-menu-item index="3" @click="toUserUploadPage">
      注册用户使用
    </el-menu-item>

    <el-submenu v-if="isLogin"
                id="user-manage"
                index="1">
      <template slot="title">
        <el-avatar :src="headImg" ></el-avatar>
        <span id="user-manage-name">
            {{$store.getters.getLoginUser.username}}
        </span>
      </template>
      <el-menu-item>
        <span>个人中心</span>
      </el-menu-item>
      <el-menu-item>
        <span style="color: #dca551">密码修改</span>
      </el-menu-item>
      <el-menu-item @click="logout">
        <span style="color: #e47470">退出登录</span>
      </el-menu-item>
    </el-submenu>
    <!--    未登录-->
    <el-menu-item v-if="!isLogin" id="not-login" @click="toLoginPage">
      点击登录
    </el-menu-item>
  </el-menu>
</template>

<script>

import {delCookie} from "@/util/cookie";
import {USER_TOKEN} from "@/config";

export default {
  name: "NavBar",
  computed: {
    isLogin() {
      return this.$store.getters.getLoginUser !== null
    }
  },
  data() {
    return {
      activeIndex: '1',
      headImg: require('@/assets/img/head_default.png'),
    };
  },
  props: {
    user: {
      type: Object,
      default() {
        return {userName: '张三', trueName: '真正的张三'}
      }
    }
  },
  methods: {
    toHomePage(){
      this.$router.push('/home')
    },
    toLoginPage(){
      this.$router.push('/login')
    },
    toTempPage(){
      this.$router.push('/temp')
    },
    toUserUploadPage(){
      this.$router.push('/userUpload')
    },
    logout(){
      this.$confirm('是否退出登陆？', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是',
        cancelButtonText: '否', //相当于 取消按钮
        type: 'warning'
      }).then(() => {
        this.$store.commit('setLoginUser', null)
        delCookie(USER_TOKEN)
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
#user-manage{
  position: absolute;
  right: 0;
  top: 0;
  background-color: #e5e7ec;
}

#not-login{
  position: absolute;
  top: 0;
  right: 0;
}

#user-manage-name {
  display:inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100px
}
</style>
