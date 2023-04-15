<template>
<div class="patient-info-input"
     v-loading="loading"
     element-loading-text="正在创建病人信息"
     element-loading-spinner="el-icon-loading"
     element-loading-background="rgba(0, 0, 0, 0.8)"
>

  <el-form ref="form" :rules="rules" :model="patientInfo" label-width="80px" size="mini">
    <el-form-item label="患者姓名" prop="name">
      <el-input style="width: 180px" v-model="patientInfo.name" ></el-input>
    </el-form-item>
    <el-form-item label="籍贯">
      <el-select v-model="patientInfo.nativeArea" placeholder="省份">
        <el-option label="上海" value="上海"></el-option>
        <el-option label="北京" value="北京"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期" prop="birthday">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期"
                        v-model="patientInfo.birthday" style="width: 100%;">
        </el-date-picker>
      </el-col>
    </el-form-item>

    <el-form-item label="身份证号" prop="idCard">
      <el-input style="width: 400px" v-model="patientInfo.idCard" ></el-input>
    </el-form-item>

    <el-form-item label="诊断部位" prop="diagnosePart">
      <el-checkbox-group v-model="patientInfo.diagnosePart">
        <el-checkbox-button label="0" name="type">左眼</el-checkbox-button>
        <el-checkbox-button label="1" name="type">右眼</el-checkbox-button>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="patientInfo.gender" size="small">
        <el-radio border :label="true" >男</el-radio>
        <el-radio border :label="false">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item size="large">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="$emit('closeCreate')">取消</el-button>
    </el-form-item>
  </el-form>

</div>
</template>

<script>
import {createPatientInfoNetwork} from "@/network/patient";

export default {
  name: "PatientInfoInput",
  computed: {
    getDiagnoseType(){
      return (arr) => {
        if(arr.length === 1) {
          return arr[0] === 0 ? 0 : 1
        }else {
          return 2
        }
        return -1
      }
    }
  },
  data() {

    return {
      loading: false,
      patientInfo: {
        name: '',
        nativeArea: '',
        birthday: '',
        idCard: '',
        gender: '',
        diagnosePart: [],
        diagnoseType: -1
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        birthday: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur', pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
          }
        ],
        gender: [
          { type: 'boolean', required: true, message: '请选择性别', trigger: 'change' }
        ],
        diagnosePart: [
          { type: 'array', required: true, message: '请至少选择一个诊断部位', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.patientInfo.diagnoseType = this.getDiagnoseType(this.patientInfo.diagnosePart)
          this.$emit('createPatientInfo', this.patientInfo)
        } else {
          return false;
        }
      })

    }
  }
}
</script>

<style scoped>
.patient-info-input {
  width: 500px;
  /*border: 1px solid black;*/
  border-radius: 6px;
  padding: 20px;
}
</style>
