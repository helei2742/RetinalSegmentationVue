<template>
<div id="homepage" >
  <el-row>
   <HomeCarousel/>
  </el-row>

</div>
</template>

<script>

import HomeCarousel from "@/views/home/child/HomeCarousel";
export default {
  name: "HomePage",
  components: {HomeCarousel},
}
</script>

<style scoped>

</style>
