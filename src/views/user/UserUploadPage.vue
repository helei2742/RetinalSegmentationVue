<template>
<div class="user-upload-page">
  用户上传图片

  <file-upload @uploadFile="uploadUserFile"/>

</div>
</template>

<script>
import FileUpload from "@/components/fileupload/FileUpload";
export default {
  name: "UserUploadPage",
  components: {FileUpload},
  methods: {
    uploadUserFile(){

    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{
      if(vm.$store.getters.getLoginUser === null) {
        vm.$confirm('您尚未登陆，请先登录才能使用相关功能')
            .then(_ => {
              vm.$router.push('/login')
            })
            .catch(_ => {});
      }
    })
  }
}
</script>

<style scoped>

</style>
