<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">
      视网膜血管分割
    </el-menu-item>
    <el-menu-item>
      匿名使用
    </el-menu-item>
    <el-submenu v-if="isLogin"
                id="user-manage"
                index="1">
      <template slot="title">
        <div class="navbar-username">
          <el-avatar :src="headImg" ></el-avatar>
          {{user.userName}}
        </div>
      </template>
    </el-submenu>
    <!--    未登录-->
    <el-menu-item v-if="!isLogin" id="not-login" @click="toLoginPage">
      点击登录
    </el-menu-item>
  </el-menu>
</template>

<script>

export default {
  name: "NavBar",
  computed: {
    isLogin() {
      return false
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
    toLoginPage(){

      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
#user-manage{
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 10px;
}

#not-login{
  position: absolute;
  top: 0;
  right: 0;
}
</style>
