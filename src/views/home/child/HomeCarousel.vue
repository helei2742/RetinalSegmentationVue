<template>
<div>
  <el-carousel :interval="4000"  height="30vw" type="card" >
    <el-carousel-item v-for="item in getSlideCount" :key="item">
      <div>
        <img :src="getSlideImg(item)" class="carousel-img" alt=""/>
        <div class="carousel-text">
          {{getSlideText(item)}}
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>

</div>

</template>

<script>
import {INTRODUCEBSLIDESHOW} from "@/config/imgConfig";

export default {
  name: "HomeCarousel",
  computed: {
    getSlideImg(){
      return index => INTRODUCEBSLIDESHOW[index-1].img
    },
    getSlideText(){
      return index => INTRODUCEBSLIDESHOW[index-1].text
    },
    getSlideCount() {
      return INTRODUCEBSLIDESHOW.length
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.carousel-img{
  width: 100%;height: auto;
}
.carousel-img:hover{
  cursor:pointer;
}
.carousel-text {
  margin-top: 10px;
  text-indent: 2em;
  padding:10px;
}
</style>
