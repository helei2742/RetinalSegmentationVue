<template>
<div id="homepage" :style="bgStyle">

  <el-container>
    <el-header>
      <nav-bar/>
    </el-header>
    <el-main>
      <div class="main-area">
        <div style="width: 100%;">
        </div>
        <div style="width: 100vh;height: 300px">
          <src-image-uploader class="main-area-upload"/>
        </div>

        <div style="width: 100%;position: relative">
            <image-displayer class="main-area-image-displayer"/>
        </div>


      </div>

    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>


</div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import SrcImageUploader from "@/views/home/child/SrcImageUploader";
import {HOMEPAGEBACKGROUND} from '@/util/ImageURL';
import ImageDisplayer from "@/views/home/child/ImageDisplayer";

export default {
  name: "HomePage",
  components: {ImageDisplayer, SrcImageUploader, NavBar},
  data(){
    return {
      bgStyle: HOMEPAGEBACKGROUND
    }
  }
}
</script>

<style scoped>
.main-area {
  min-height: calc(100vh - 70px);
  width: 100vh;
  /*display: flex;*/
  /*flex-direction: row-reverse*/
}
.main-area-upload{
  position:absolute;
  margin-left: -195px;
  left:50%;
}
.main-area-image-displayer {
}
</style>
