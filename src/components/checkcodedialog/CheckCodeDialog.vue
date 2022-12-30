<template>
<div>
  <el-dialog
      title="请输入验证码"
      :visible.sync="checkCodeVisible"
      :before-close="handleClose"
      width="300px">
    <div title="点击刷新验证码"
         @click="refresh"
         style="cursor:pointer;">
      <el-image style="width: 270px; height: 100px;"
                :fit="'fill'"
                :src="checkCodeImg">
      </el-image>
    </div>

    <el-input v-model="checkCode" type="text"></el-input>
    <span slot="footer" class="dialog-footer">
          <el-button @click="checkCodeVisible = false">取 消</el-button>
          <el-button type="primary"
                     :disabled="this.checkCode.length !== 4"
                     @click="confirmValidCode">确 定</el-button>
    </span>
  </el-dialog>
</div>

</template>

<script>
export default {
  name: "CheckCodeDialog",
  data() {
    return {
      checkCode: '',
      checkCodeImg: '',
      checkCodeVisible: false
    }
  },
  methods:{
    confirmValidCode() {
      this.$emit('confirmvalidcode', this.checkCode)
    },
    handleClose(){
      this.checkCodeVisible = false
      this.init()
    },
    refresh() {
      this.init()
      this.$emit('refresh')
    },
    init() {
      this.checkCode = ''
      this.checkCodeImg = ''
    }
  }
}
</script>

<style scoped>

</style>
