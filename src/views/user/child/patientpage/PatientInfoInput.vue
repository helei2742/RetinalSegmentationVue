<template>
<div class="patient-info-input"
     v-loading="loading"
     element-loading-text="正在创建病人信息"
     element-loading-spinner="el-icon-loading"
     element-loading-background="rgba(0, 0, 0, 0.8)"
>

  <el-form ref="form" :rules="rules" :model="patientInfo" label-width="80px" size="small">
    <el-form-item label="患者姓名" prop="name">
      <el-input style="width: 180px" v-model="patientInfo.name" ></el-input>
    </el-form-item>
    <el-form-item label="籍贯">
      <el-cascader
          size="small"
          class="profile-cascader"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange"
      />

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

    <el-form-item label="邮箱" prop="email">
      <el-input style="width: 400px" v-model="patientInfo.email" ></el-input>
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
import { regionData, CodeToText, TextToCode } from "element-china-area-data"
import {ref} from "vue";

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
        email: '',
        gender: '',
        diagnosePart: [],
        diagnoseType: -1
      },
      options: ref(regionData),
      selectedOptions: ref([]),

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
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.patientInfo.diagnoseType = this.getDiagnoseType(this.patientInfo.diagnosePart)
          let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
          if(!reg.test(this.patientInfo.email)) {
            this.$confirm("若录入邮箱请输入正确格式的邮箱地址")
            return false
          }
          this.$emit('createPatientInfo', this.patientInfo)
        } else {
          return false;
        }
      })
    },
    handleChange() {
      if (
          this.selectedOptions[0] != null &&
          this.selectedOptions[1] != null &&
          this.selectedOptions[2] != null
      ) {
        //这里可以根据你需要的数据格式来设置省市区显示
        this.patientInfo.nativeArea = CodeToText[this.selectedOptions[0]]
            + CodeToText[this.selectedOptions[1]]
            + CodeToText[this.selectedOptions[2]]
      }
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
