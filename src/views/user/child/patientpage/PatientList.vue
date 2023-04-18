<template>
<div class="patient-list">
  <el-table
      :data="infoList"
      height="600"
      stripe
      @selection-change="handleSelectionChange"
      style="width: 100%">
    <el-table-column
        type="selection"
        width="55">
    </el-table-column>
    <el-table-column
        fixed
        prop="name"
        label="姓名"
        width="100">
    </el-table-column>
    <el-table-column
        label="性别"
        width="50">
      <template slot-scope="scope">
        <div>
          {{getGender(scope.row.gender)}}
        </div>
      </template>
    </el-table-column>
    <el-table-column
        prop="idCard"
        width="200"
        label="身份证号">
    </el-table-column>
    <el-table-column
        prop="nativeArea"
        label="籍贯">
    </el-table-column>

    <el-table-column
        label="创建时间"
        width="200"
        prop="createTime">
      <template slot-scope="scope">
        <div style="font-size: 4px">{{getTime(scope.row.createTime)}}</div>
      </template>
    </el-table-column>

    <el-table-column
        prop="diagnoseType"
        label="检查类型">
      <template slot-scope="scope">
        <div>
          {{getDiagnoseType(scope.row.diagnoseType)}}
        </div>
      </template>
    </el-table-column>

    <el-table-column
        fixed="right"
        width="200">
      <template  slot="header">
        <el-button size="mini"
                   @click="deleteIds"
                   type="danger">
          删除选中
        </el-button>
      </template>
      <template slot-scope="scope">
        <el-button v-if="scope.row.diagnoseType === 0 || scope.row.diagnoseType === 2"
                   @click="showRecord(scope.row.leftDiagnoseRecordId, scope.row.id, 'l')"
                   type="text" size="small">查看左眼</el-button>
        <el-button v-if="scope.row.diagnoseType === 1 || scope.row.diagnoseType === 2"
                   @click="showRecord(scope.row.rightDiagnoseRecordId, scope.row.id, 'r')"
                   type="text" size="small">查看右眼</el-button>
      </template>
    </el-table-column>

    <el-table-column
        fixed="right"
        width="60">
      <template  slot="header">

      </template>
      <template slot-scope="scope">
        <el-tooltip content="打印病人记录" placement="top">
          <el-button size="mini" icon="el-icon-printer" @click="printPatientInfo(scope.row)"/>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
      title="打印结果"
      :visible.sync="printDialogVisible"
      width="360px">
    <patient-info-print ref="patientInfoPrinter"
                        :code="QRCode"
                        :patient-info="curInfo"/>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" @click="printStart">打印</el-button>
      <el-button type="info" @click="printDialogVisible = false">关闭</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import PatientInfoPrint from "@/views/user/child/patientpage/PatientInfoPrint";
import {getPatientQRCodeNetwork} from "@/network/patient";
export default {
  name: "PatientList",
  components: {PatientInfoPrint},
  props: {
    infoList: {
      type: Array,
      default() {
        return [
          {
            "id": 3,
            "doctorId": 7,
            "name": "何磊大哥",
            "gender": true,
            "idCard": "522228200103280816",
            "nativeArea": "上海",
            "diagnoseType": 2,
            "leftDiagnoseRecordId": null,
            "rightDiagnoseRecordId": null,
            "createTime": "2023-04-14T12:56:28",
            "updateTime": "2023-04-14T12:56:28",
            "isValid": true
          }
        ]
      }
    }
  },
  data() {
    return {
      selectedIds: [],
      printDialogVisible: false,
      curInfo: null,
      QRCode: ''
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
    },
    getTime() {
      return time => {
        return this.$formatDate(new Date(time))
      }
    }
  },
  methods: {
    showRecord(recordId, patientId, c) {
      if(recordId === null || recordId === undefined) {
        this.$emit('patientBindRecord', {
          patientId,
          c
        })
      }else {
        this.$emit('showRecord', recordId)
      }
    },
    handleSelectionChange(arr) {
      let ids = []

      for(let i = 0; i < arr.length; i++) {
        ids[i] = arr[i].id
      }
      this.selectedIds = ids
    },
    deleteIds() {
      this.$confirm('是否删除选择病人信息？', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是',
        cancelButtonText: '否', //相当于 取消按钮
        type: 'danger'
      }).then(() => {
        this.$emit('deleteInfoByIds', this.selectedIds)
      })
    },

    printPatientInfo(info) {
      let c = info.diagnoseType===0?'l':info.diagnoseType===1?'r':'a'
      getPatientQRCodeNetwork(info.id, c).then(data => {
        if(data.size !== 0) {
          this.curInfo = info
          this.printDialogVisible = true
          this.$nextTick(()=>{
            this.$refs.patientInfoPrinter.qrCode = window.URL.createObjectURL(data)
          })
        }else {
          this.$message.error("获取二维码失败")
        }
      })
    },
    printStart(){
      this.$nextTick(()=>{
        this.$refs.patientInfoPrinter.printClick()
      })
    }
  }
}
</script>

<style scoped>
.patient-list {
  border-bottom: 1px solid #323233;
  border-left: 1px solid #323233;
  border-right: 1px solid #323233;
  padding: 20px;
  border-radius: 7px;
}
</style>
