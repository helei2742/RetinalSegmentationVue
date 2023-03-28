<template>
  <div class="src-image-uploader">
    <file-upload
        :percent-visible="percentVisible"
        :progress-percent="progressPercent"
        @uploadFile="uploadImageClick"/>
    <el-dialog
        v-loading="loading"
        title="请输入验证码"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="300px">
      <div class="demo-image">
        <div class="block">
          <el-image style="width: 270px; height: 100px;"
                    :fit="'fill'"
                    :src="checkCodeImg">
          </el-image>
        </div>
      </div>
      <el-input v-model="checkCode" type="text"></el-input>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmValidCode">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FileUpload from "@/components/fileupload/FileUpload";
import {getIdNumberNetwork, getValidCodeNetwork, verifyValidCodeNetwork, uploadSrcImgNetwork} from "@/network/temp";

export default {
  name: "SrcImageUploader",
  components:{
    FileUpload
  },
  data() {
    return {
      dialogVisible: false,
      percentVisible: false,
      checkCodeImg: null,
      checkCode: '',
      fileForm: null,
      progressPercent: 0,

      loading: false
    }
  },
  methods: {
    uploadImageClick(fileForm) {
      this.fileForm = fileForm
      this.loading = true
      //获取idNumber
      getIdNumberNetwork().then(res => {
        if(res.success === true) {
          this.$store.commit('setIdNumber', res.data)
          // 获取验证码
          return  getValidCodeNetwork(res.data)
        }else {
          this.$message.error('获取id失败！')
        }
      }).then(data=>{
        this.checkCodeImg =  window.URL.createObjectURL(data)
      }).finally(()=>{
        this.loading =false
      })
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            this.dialogVisible = false
            done();
          })
          .catch(_ => {
          });
    },
    //确认验证码
    confirmValidCode(){
      this.loading = true
      verifyValidCodeNetwork(this.$store.getters.getIdNumber, this.checkCode).then(res=>{
        if(res.success === true) {
          this.uploadImage()
          this.dialogVisible = false
        }else {
          this.$message.error(res.errorMsg)
        }
      }).finally(()=>{
        this.loading = false
      })
    },
    uploadImage() {
      this.percentVisible = true;
      const uploadProgressEvent = progressEvent => {
        this.progressPercent = (progressEvent.loaded / progressEvent.total * 100 | 0)
      }
      uploadSrcImgNetwork(this.$store.getters.getIdNumber, this.fileForm, uploadProgressEvent).then(res => {
        if(res.success === true) {
          this.$message.success('上传成功')
          this.fileForm = null
        }else {
          this.$message.error(res.errorMsg)
        }
      })
    }
  }
}
</script>

<style scoped>
.src-image-uploader{
  border:1px dashed #000000;
  width: 360px;
  padding: 13px 13px 20px
}
</style>
