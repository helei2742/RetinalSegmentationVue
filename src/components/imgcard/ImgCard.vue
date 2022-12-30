<template>
<div class="img-card">
  <el-card v-loading="loading"
           element-loading-text="处理中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)"
           :body-style="{ padding: '0px' }">
    <img v-show="!isShowRes" :src="srcImgUrl" class="image">
    <img v-show="isShowRes" :src="resImgUrl" class="image">

    <div class="bottom">
        <el-tooltip effect="dark" :content="isShowRes?'显示原图':'切换到分割结果'" placement="bottom-start">
          <el-button size="mini" icon="el-icon-refresh" circle
                     @click="turnImgShow"/>
        </el-tooltip>
        <el-tooltip effect="dark" content="开始进行分割" placement="bottom-start">
          <el-button size="mini" icon="el-icon-caret-right" circle
                     @click="startSegmentation"/>
        </el-tooltip>
        <el-tooltip effect="dark" content="下载该图片" placement="bottom-start">
          <el-button size="mini" icon=el-icon-download circle
                     @click="download"/>
        </el-tooltip>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: "ImgCard",
  props:{
    srcImgUrl: {
      type: String,
      default: require('@/assets/img/showImg_default.png')
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data(){
    return {
      isShowRes: false,
      loading: false,
      resImgUrl: require('@/assets/img/logo.png')
    }
  },
  methods: {
    turnImgShow() {
      this.isShowRes = !this.isShowRes
    },
    startSegmentation() {
      this.loading = true
      this.$emit('startsegmentation', this.index)
    },
    resResolved(resUrl){
      setTimeout(()=>{
        this.loading = false
        this.resImgUrl = resUrl
      },2000)

    },
    getUrlBase64(url) {
      return new Promise(resolve => {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        let img = new Image()
        img.crossOrigin = 'Anonymous' //允许跨域
        img.src = url
        img.onload = function() {
          canvas.height = 300
          canvas.width = 300
          ctx.drawImage(img, 0, 0, 300, 300)
          let dataURL = canvas.toDataURL('image/png')
          canvas = null
          resolve(dataURL)
        }
      })
    },
    download() {
      let downloadUrl = this.isShowRes?this.resImgUrl:this.srcImgUrl

      let splits = downloadUrl.split('/')
      let fileName = splits[splits.length-1]
      this.getUrlBase64(downloadUrl).then(base64 => {
        let link = document.createElement('a')
        link.href = base64
        link.download = fileName
        link.click()
      })
    }
  }
}
</script>

<style scoped>
.img-card{
  width: 400px;
}

.bottom {
  line-height: 12px;
  padding: 14px;
  text-align: center;
}

.image {
  height: 400px;
  width: 400px;
  display: block;
  margin: 0 auto;
}

</style>
