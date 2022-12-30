<template>
<div class="image-displayer">

  <el-button v-show="!isShowImage"
             @click="init">
    展示结果
  </el-button>

  <div v-show="isShowImage">
    <el-tabs tab-position="top" type="border-card">
      <el-tab-pane label="分割结果">

        <div class="image-card-context">
          <div v-for="(url, idx) in srcUrlList" class="image-card-item">
            <img-card :src-img-url="basePath+url"
                      :ref="idx"
                      :index="idx"
                      @startsegmentation="startSegmentation"/>
          </div>

          <div class="clear"></div>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import ImgCropper from "@/components/imgcropper/ImgCropper";
import ImgCard from "@/components/imgcard/ImgCard";
import {getSrcImgURLNetwork, tempSegmentationNetwork, isHaveSegmentationNetwork} from "@/network/temp";
import {IMGCDNURL} from "@/config";

export default {
  name: "ImageDisplayer",
  components: {ImgCard, ImgCropper},
  data() {
    return {
      isShowImage: false,
      srcUrlList: [],
      resUrlMap: {},
      basePath: IMGCDNURL
    }
  },
  methods: {
    init() {
      let idNumber = this.$store.getters.getIdNumber
      if(idNumber !== ""){
        getSrcImgURLNetwork(idNumber).then(res => {
          console.log(res)
          if(res.success === true) {
            this.isShowImage = true
            this.srcUrlList = res.data
          }
        })
      }
    },

    startSegmentation(srcImgUrlIdx) {
      let idNumber = this.$store.getters.getIdNumber
      let url = this.srcUrlList[srcImgUrlIdx]
      const card = this.$refs[srcImgUrlIdx][0]

      //1.检查是否保存有
      if(this.resUrlMap[srcImgUrlIdx] !== undefined){
        //card.resResolved(this.basePath + this.resUrlMap[srcImgUrlIdx])
        return
      }

      //2.检查是否有分割结果
      isHaveSegmentationNetwork(idNumber, url).then(res=>{
        if(res.success === false) {
          //2,1没有分割结果，才让分割
          tempSegmentationNetwork(idNumber, url).then(res=>{
            //分割得到结果的uri保存
            if(res.success === true) {
              this.resUrlMap[srcImgUrlIdx] = res.data
              card.resResolved(this.basePath + this.resUrlMap[srcImgUrlIdx])
            }
          })
        }else {
          //2,2有分割结果，直接用原来的
          this.resUrlMap[srcImgUrlIdx] = res.data
          card.resResolved(this.basePath + this.resUrlMap[srcImgUrlIdx])
        }
      })
    }
  }
}
</script>

<style scoped>
.image-displayer {
  min-width: 610px;
  overflow-x:scroll;
  padding: 14px;
  text-align: center;
}
.image-card-context{

}
.image-card-item{
  width: 400px;
  float: left;
  margin: 10px
}
.clear{
  clear: both;
}
</style>
