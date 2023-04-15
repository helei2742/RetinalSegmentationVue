<template>
<div class="patient-list">
  <el-table
      :data="infoList"
      height="600"
      stripe
      style="width: 100%">
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
        label="操作"
        fixed="right"
        width="200">
      <template slot-scope="scope">
        <el-button v-if="scope.row.diagnoseType === 0 || scope.row.diagnoseType === 2"
                   @click="showRecord(scope.row.leftDiagnoseRecordId, scope.row.id, 'l')"
                   type="text" size="small">查看左眼</el-button>
        <el-button v-if="scope.row.diagnoseType === 1 || scope.row.diagnoseType === 2"
                   @click="showRecord(scope.row.rightDiagnoseRecordId, scope.row.id, 'r')"
                   type="text" size="small">查看右眼</el-button>
      </template>
    </el-table-column>
  </el-table>

</div>
</template>

<script>
export default {
  name: "PatientList",
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
    }
  }
}
</script>

<style scoped>
.patient-list {
  border: 1px solid #323233;
  padding: 20px;
  border-radius: 7px;
}
</style>
