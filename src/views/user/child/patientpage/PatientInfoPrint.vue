<template>
<div id="printArea" class="patient-info-print" v-if="patientInfo != null">
  <el-descriptions title="病人信息单" :column="1">
    <el-descriptions-item label="编号">{{ patientInfo.id }}</el-descriptions-item>
    <el-descriptions-item label="姓名">{{ patientInfo.name }}</el-descriptions-item>
    <el-descriptions-item label="性别">{{ getGender(patientInfo.gender) }}</el-descriptions-item>
    <el-descriptions-item label="身份证号">
      {{ patientInfo.idCard }}
    </el-descriptions-item>
    <el-descriptions-item label="诊断部位">
      {{ getDiagnoseType(patientInfo.diagnoseType) }}
    </el-descriptions-item>
  </el-descriptions>
  <el-image
      style="width: 150px; height: 150px;margin: 10px 0"
      :src="qrCode"
      fit="fill"></el-image>

  <el-link type="info"
           ref="print"
           v-print="printObj">
    凭该二维码可绑定分割记录
  </el-link>

</div>
</template>

<script>
export default {
  name: "PatientInfoPrint",
  props: {
    patientInfo: {
      type: Object,
      default() {
        return null
      }
    }
  },

  computed:{
    getGender(){
      return gender => {
        return gender ? '男' : '女'
      }
    },
    getDiagnoseType() {
      return t => {
        return t===0 ? '左眼' : t===1 ? '右眼' : '双眼'
      }
    }

  },
  data() {
    return {
      qrCode: '',

      printLoading: true,
      printObj: {
        id: "printArea",
        previewBeforeOpenCallback(vue) {
          console.log('正在加载预览窗口')
        },
        previewOpenCallback(vue) {
          console.log('已经加载完预览窗口')
        },
        beforeOpenCallback(vue) {
          vue.printLoading = true
          console.log('打开之前')
        },
        openCallback(vue) {
          vue.printLoading = false
          console.log('执行了打印')
        },
        closeCallback(vue) {
          console.log('关闭了打印工具')
        }
      }
    }
  },
  methods: {
    printClick() {
      this.$nextTick(()=>{
        this.$refs.print.$el.click()
      })
    }
  }
}
</script>

<style scoped>
.patient-info-print {
  width: 300px;
  padding: 10px 25px;
  text-align: center;
}
</style>