<template>
<div class="patient-query-bar">
  <el-form :inline="true" :model="queryForm" class="demo-form-inline" size="mini">
    <el-form-item label="姓名">
      <el-input v-model="queryForm.patientName" placeholder="输入查询病人姓名"></el-input>
    </el-form-item>

    <el-form-item label="身份证">
      <el-input v-model="queryForm.idCard" placeholder="输入查询病人身份证"></el-input>
    </el-form-item>

    <el-form-item label="性别">
      <el-select v-model="queryForm.gender" placeholder="选择性别" style="width: 60px">
        <el-option label="空" :value="-1"></el-option>
        <el-option label="男" :value="true"></el-option>
        <el-option label="女" :value="false"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="诊断类型">
      <el-select v-model="queryForm.diagnoseType" placeholder="选择诊断类型">
        <el-option label="未选择" :value="-1"></el-option>
        <el-option label="左眼" :value="0"></el-option>
        <el-option label="右眼" :value="1"></el-option>
        <el-option label="双眼" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="籍贯">
      <el-input v-model="queryForm.nativeArea" placeholder="输入查询病人籍贯"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="success" @click="create">录入</el-button>
    </el-form-item>
  </el-form>


</div>
</template>

<script>
export default {
  name: "PatientQueryBar",
  props:{
    queryForm: {
      type: Object,
      default(){
        return {
          dockerId: this.$store.getters.getLoginUser.id,
          gender: -1,
          patientName: '',
          nativeArea: '',
          idCard: '',
          diagnoseType: -1
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('conditionQuery')
    },
    create() {
      this.$emit('showCreate')
    }
  }
}
</script>

<style scoped>
.patient-query-bar{
  text-align: center;
  border: 1px solid #313335;
  border-radius: 6px;

  padding: 14px 10px 0;

  margin-bottom: 4px;
}
</style>
