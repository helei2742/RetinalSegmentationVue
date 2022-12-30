<template>
  <div id="app">
    <el-container>
      <el-header>
        <nav-bar/>
      </el-header>
      <el-main>
        <div class="main-area">
          <router-view/>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script>


import NavBar from "@/components/navbar/NavBar";
import {getCookie} from "@/util/cookie";
import {validLoginUser} from "@/network/user";
import {USER_TOKEN} from "@/config";
export default {
  name: "app",
  components: {NavBar},
  mounted() {
    let userToken = getCookie(USER_TOKEN)
    if(userToken !== null && userToken !== undefined && userToken.length > 0){
      validLoginUser(userToken).then(res => {
        if(res.success === true) {
          this.$store.commit('setLoginUser', res.data)
        }
      })
    }

  }
}
</script>
<style>
.main-area {
  min-height: calc(100vh - 70px);
}

body{
  margin: 0;
}

#app .el-header{
  padding: 0
}
#homepage > section > main > div > div:nth-child(1) > div > div.file-upload > div.upload-demo > div.el-upload.el-upload--text > div{
  background: none;

}
#app > section > main{
  padding: 0;
}
</style>
