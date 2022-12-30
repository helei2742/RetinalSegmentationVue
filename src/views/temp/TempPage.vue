<template>
  <div id="temp" :style="bgStyle">
    <div style="min-height: 300px">
      <src-image-uploader class="main-area-upload"/>
    </div>

    <div style="position: relative">
      <image-displayer class="main-area-image-displayer"/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import SrcImageUploader from "@/views/temp/child/SrcImageUploader";
import {HOMEPAGEBACKGROUND} from '@/util/ImageURL';
import ImageDisplayer from "@/views/temp/child/ImageDisplayer";

export default {
  name: "TempPage",
  components: {ImageDisplayer, SrcImageUploader, NavBar},
  data(){
    return {
      bgStyle: HOMEPAGEBACKGROUND
    }
  }
}
</script>

<style scoped>

#temp {
  padding: 15px 0 5px;
}

.main-area-upload{
  position:absolute;
  margin-left: -195px;
  left:50%;
}
.main-area-image-displayer {
  margin-top: 5px;
}
</style>
