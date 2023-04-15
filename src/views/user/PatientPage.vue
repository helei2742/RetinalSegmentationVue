<template>
<div class="patient-page"
     v-loading="loading"
     element-loading-text="正在加载"
     element-loading-spinner="el-icon-loading"
     element-loading-background="rgba(0, 0, 0, 0.8)">


  <patient-query-bar :query-form="queryForm"
                     @conditionQuery="conditionQuery"
                     @showCreate="inputDialogVisible=true"/>

  <patient-list :infoList="patientList"
                @showRecord="showRecord"
                @patientBindRecord="patientBindRecord"/>

  <div>
    <el-pagination
        style="text-align: center"
        :page-size="queryForm.limit"
        :pager-count="7"
        layout="prev, pager, next"
        :current-page="queryForm.page"
        @current-change="handleCurrentChange"
        :total="queryForm.total">
    </el-pagination>
  </div>


  <el-dialog
      title="患者信息录入"
      :visible.sync="inputDialogVisible"
      width="80%">
      <patient-info-input
          style="margin-left: calc(50% - 250px)"
          @createPatientInfo="createPatientInfo"
          @closeCreate="inputDialogVisible=false"/>
  </el-dialog>
  <el-dialog
      title="请先绑定记录"
      style="text-align: center"
      :visible.sync="bindCodeDialogVisible"
      width="30%">
    该病人尚未绑定分割记录，请凭借<el-tag>{{bindCode}}</el-tag>到血管分割处绑定记录
  </el-dialog>

</div>
</template>

<script>
import PatientInfoInput from "@/views/user/child/patientpage/PatientInfoInput";
import {createPatientInfoNetwork, getBindCodeNetwork, pageQueryPatientInfoNetwork} from "@/network/patient";
import PatientList from "@/views/user/child/patientpage/PatientList";
import PatientQueryBar from "@/views/user/child/patientpage/PatientQueryBar";
export default {
  name: "PatientPage",
  components: {PatientQueryBar, PatientList, PatientInfoInput},
  data() {
    return {
      loading: false,

      inputDialogVisible: false,

      bindCodeDialogVisible: false,
      bindCode: '',

      queryForm: {
        doctorId: '',
        gender: -1,
        patientName: '',
        nativeArea: '',
        idCard: '',
        diagnoseType: -1,

        page: 1,
        limit: 10,

        total: 0
      },

      patientList: []
    }

  },
  methods: {
    conditionQuery() {
      this.queryForm.page = 1
      this.queryForm.limit = 10
      this.pageQueryPatientInfo(this.queryForm)
    },
    handleCurrentChange(cutPage) {
      this.queryForm.page = cutPage
      this.pageQueryPatientInfo(this.queryForm)
    },
    pageQueryPatientInfo(query) {
      let q = {}
      q.page = query.page
      q.size = query.limit
      q.doctorId = this.$store.getters.getLoginUser.id
      if(query.patientName !== '') q.patientName = query.patientName
      if(query.nativeArea !== '') q.patientName = query.nativeArea
      if(query.idCard !== '') q.idCard = query.idCard
      if(query.diagnoseType !== -1) q.diagnoseType = query.diagnoseType
      if(query.gender !== -1) q.gender = query.gender
      console.log(q)
      this.loading = true
      pageQueryPatientInfoNetwork(q).then(data=>{
        console.log(data)
        if(data.success === true) {
          this.patientList = data.data.list
          this.queryForm.total = data.data.total
        }else {
          this.$message.error('查询失败,' + data.errorMsg)
        }
      }).finally(()=>{
        this.loading = false
      })
    },

    createPatientInfo(info) {
      createPatientInfoNetwork(info).then(data => {
        if(data.success === true) {
          this.$message.success("创建成功")
        }else {
          this.$message.error("创建失败," + data.errorMsg)
        }
      }).finally(()=>{
        this.loading = false
      })
    },

    showRecord(recordId){
      console.log(recordId)
    },
    patientBindRecord(form){
      getBindCodeNetwork(form.patientId, form.c).then(data=>{
        if(data.success === true) {
          this.bindCode = data.data
          this.bindCodeDialogVisible = true
        }
      })
    }
  },
  mounted() {
    this.conditionQuery()
  }
}
</script>

<style scoped>
.patient-page{
  padding: 7px;
}
</style>
