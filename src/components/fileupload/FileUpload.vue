<template>
<div class="file-upload">
  <el-upload
      class="upload-demo"
      drag
      ref="upload"
      action="/"
      :limit="1"
      :http-request="addUploadFile"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="true">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">
      <span style="color: #616778;font-size: 18px;font-family: Arial,Helvetica,sans-serif;font-weight: 700;">
        将需分割图片拖到此处，或<em>点击选取</em>
      </span>
    </div>

    <div class="el-upload__tip file-upload-message" slot="tip">
      只能上传jpg/png文件，且不超过500kb
      <el-button style="float: right; margin-right: 10px"
                 size="small"
                 type="success"
                 v-if="fileForm!==null"
                 @click="submitUpload">
        开始上传
      </el-button>
    </div>

  </el-upload>
  <!-- 上传进度条 -->
  <el-progress
      v-if="percentVisible"
      :percentage="progressPercent">
  </el-progress>

  <el-dialog
      title="提示"
      ref="dialog"
      :visible.sync="dialogVisible"
      width="100%"
      :before-close="handleClose">
      <span>请对图片进行剪裁</span>
      <img-cropper ref="imgcropper"
                   @cropperfile="cropperFile"/>
  </el-dialog>


</div>
</template>

<script>
import ImgCropper from "@/components/imgcropper/ImgCropper";
export default {
  name: "FileUpload",
  components: {ImgCropper},
  props: {
    percentVisible:{
      type: Boolean,
      default: false
    },
    progressPercent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fileList: [],
      fileForm: null,
      fileName: '',
      dialogVisible: false
    };
  },
  methods: {
    addUploadFile(param) {
      this.fileName = param.file.name
      this.getBase64(param.file).then(res => {
        this.$refs.imgcropper.option.img = res
        this.dialogVisible = true
      })
      this.fileList = []
    },
    cropperFile(fileForm){
      this.fileForm = fileForm
      this.isHaveFile = true
      this.dialogVisible = false
      this.fileList.push({name: this.fileName})
    },
    submitUpload(){
      if(this.fileForm == null||!this.isHaveFile){
        this.$message.error('请先选择文件')
        return
      }
      this.$emit('uploadFile', this.fileForm)
    },
    handleRemove(file, fileList) {
      this.fileForm = null
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    handleClose(){
      this.$confirm('确认关闭？')
          .then(_ => {
            this.dialogVisible = false
          })
          .catch(_ => {});
    }
  },
  mounted() {
    this.$refs.dialog.rendered = true
  }
}
</script>

<style scoped>
.file-upload {
  width: 370px;
}
.file-upload-message {
  height: 40px;
}

</style>
