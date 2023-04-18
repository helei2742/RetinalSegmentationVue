<template>
<div class="patient-info-card" v-if="info!=null">
  <el-descriptions class="margin-top"
                   :title="getTitle"
                   :column="3" size="mini"
                   border>
    <template slot="extra">
      <el-button size="mini"
                 @click="saveDiagnoseClick"
                 icon="el-icon-view">
        保存诊断
      </el-button>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        姓名
      </template>
      {{ info.name }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-s-custom"></i>
        身份证号
      </template>
      {{ info.idCard }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        籍贯
      </template>
      {{ info.nativeArea }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        诊断部位
      </template>
      <el-tag size="small">{{getType(info.diagnoseType)}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        邮箱
      </template>
      {{info.email}}
    </el-descriptions-item>
  </el-descriptions>

  <el-input
      type="textarea"
      :autosize="{ minRows: 2}"
      placeholder="请输入诊断内容"
      maxlength="800"
      show-word-limit
      v-model="diagnoseRecord.diagnoseText">
  </el-input>
</div>
  <div v-else>
    病人信息已被删除
  </div>
</template>

<script>
import {delCookie} from "@/util/cookie";
import {USER_TOKEN} from "@/config";

export default {
  name: "PatientInfoCard",
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    },
    recordId: {
      type: Number,
      default: -1
    },
    diagnoseRecord: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed:{
    getType(){
      return t => {
        return t === 0? '左眼' : t === 1? '右眼': '双眼'
      }
    },
    getTitle() {
      if(this.info.rightDiagnoseRecordId === this.recordId) {
        return '右眼图像'
      }else if(this.info.leftDiagnoseRecordId === this.recordId){
        return '左眼图像'
      }else {
        return '未绑定病人'
      }
    }
  },

  methods:{
    saveDiagnoseClick() {
      this.$confirm('是否保存诊断？', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是',
        cancelButtonText: '否', //相当于 取消按钮
        type: 'warning'
      }).then(() => {
        this.diagnoseRecord.patientId = this.info.id

        this.$emit('saveDiagnose', this.diagnoseRecord)
      })
    }
  }
}
</script>

<style scoped>
.patient-info-card{
  padding: 10px 17px;
}
</style>