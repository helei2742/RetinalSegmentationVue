<template>
  <div>

    <el-upload
        action=""
        :show-file-list="false"
        :http-request="resolveQR">
      <el-button type="success">
        打开摄像头
      </el-button>
      <el-button type="success">
        图库选择
      </el-button>
    </el-upload>

    <div v-if="isShowSelect">
      <el-divider><i class="el-icon-set-up"></i></el-divider>
      <el-switch
          v-model="isLeft"
          active-text="左"
          inactive-text="右"
          active-color="#0077d2"
          inactive-color="#ff4949"
          style="margin-top: 10px">
      </el-switch>
    </div>


    <el-divider><i class="el-icon-thumb"></i></el-divider>
    <el-button :disabled="isLeft === null"
               @click="bindRecordClick"
               size="mini">
      确认绑定
    </el-button>
  </div>
</template>


<script>


import {getQrUrl} from "@/util/rqUtil";

export default {
  name: "ResolveQRCode",
  data(){
    return {
      isLeft: null,
      isShowSelect: false,
      bindCode: ''
    }
  },
  methods: {
    resolveQR(event) {
      const result = getQrUrl(event.file)
      result.then(res => {
        if (res.data) {
          let code = res.data
          if(code.length !== 7 ) {
            this.$message.error('识别二维码格式错误, 请重新上传')
            return
          }else {
            this.bindCode = code
            if(code[0] === 'l') {
              this.isLeft = true
            }else if(code[0] === 'r') {
              this.isLeft = false
            }else if(code[0] === 'a') {
              this.isShowSelect = true
            }else {
              this.$message.error('识别二维码格式错误, 请重新上传')
            }
          }
          this.$message.success('识别二维码成功!')
        } else {
          this.$message.error('识别二维码失败, 请重新上传')
        }
      }).catch(err => {
        this.$message.error(JSON.stringify(err))
      })
    },

    bindRecordClick() {
      let code = this.bindCode.substr(1, 6)

      if(this.isLeft) code = 'l' + code
      else code = 'r' + code

      this.$emit('bindRecord', code)
    }
  }

}
</script>

<style scoped>

</style>