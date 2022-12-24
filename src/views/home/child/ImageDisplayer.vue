<template>
<div class="image-displayer">

  <el-tabs tab-position="left" type="border-card">
    <el-tab-pane label="分割结果">
    </el-tab-pane>
  </el-tabs>


</div>
</template>

<script>
import ImgCropper from "@/components/imgcropper/ImgCropper";
export default {
  name: "ImageDisplayer",
  components: {ImgCropper}
}
</script>

<style scoped>

</style>
