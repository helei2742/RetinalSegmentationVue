<template>

  <el-empty class="expand-area"
            style="width: 100%"
            v-if="record===null"
            description="点击右侧记录的查看按钮显示详情">
  </el-empty>

  <div v-else class="expand-area">
    <el-divider content-position="center">图片查看</el-divider>
    <div class="expand-area-context">
      <div class="expand-area-item">
        <el-tag>原图片</el-tag>
        <div class="box">
          <el-image
              class="image"
              alt="图片加载失败"
              :src="record.srcLocation"
              :preview-src-list="[record.srcLocation]">
          </el-image>
        </div>
      </div>
      <div class="expand-area-item">
        <el-tag>分割结果</el-tag>
        <div class="box">
          <el-image
              alt="无分割结果"
              class="image"
              :src="record.resLocation"
              :preview-src-list="[record.resLocation]">
          </el-image>
        </div>
      </div>
    </div>


    <el-divider content-position="center">病例信息</el-divider>

    <div style="text-align: center">
      <el-button v-if="record.patientId === null" @click="bindDialogVisible=true" type="text">
        点击绑定病人信息
      </el-button>
      <el-button v-else type="text" @click="showPatientInfo">
        点击查看病人信息
      </el-button>
      <el-dialog
          title="绑定病例信息"
          style="text-align: center"
          :visible.sync="bindDialogVisible"
          width="30%">
        <el-form :model="bindForm" ref="bindForm" label-width="100px" class="demo-ruleForm">
          <el-form-item
              label="绑定码"
              prop="bindCode"
              :rules="[
                { required: true, message: '请输入绑定码', trigger: 'blur' },
                { min: 7, max: 7, message: '长度为6个字符', trigger: 'blur' }
              ]">
            <el-input v-model.number="bindForm.bindCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('bindForm')">提交</el-button>
            <el-button @click="bindDialogVisible=false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>


    <el-divider content-position="center">更多操作</el-divider>
    <el-row style="text-align: center">
      <el-button type="success" round size="mini"
                 :disabled="record.state!==0"
                 @click="startSegmentation"
                 icon="el-icon-caret-right">
        开始分割
      </el-button>
      <el-button type="primary" round size="mini"
                 @click="download(record.srcLocation)"
                 icon="el-icon-download">
        下载原图
      </el-button>
      <el-button  round size="mini"
                 :disabled="record.state!==2"
                 @click="download(record.resLocation)"
                 icon="el-icon-download">
        下载结果
      </el-button>
      <el-button type="warning" round size="mini"
                 @click="imgDetection"
                 :disabled="record.state!==2"
                 icon="el-icon-refresh">
        病灶检测
      </el-button>
      <el-button type="warning" round size="mini"
                 @click="imgCoincide"
                 :disabled="record.state!==2"
                 icon="el-icon-refresh">
        血管勾勒
      </el-button>
      <el-button type="danger" round size="mini"
                 @click="deleteRecord"
                 icon="el-icon-refresh">
        删除记录
      </el-button>
    </el-row>
  </div>
</template>

<script>
import {delCookie} from "@/util/cookie";
import {USER_TOKEN} from "@/config";
import {bindPatientNetwork} from "@/network/patient";

export default {
  name: "ExpandArea",
  props:{
    record: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      bindDialogVisible: false,
      bindForm: {
        bindCode: '',
        recordId: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.bindForm.recordId = this.record.id
          bindPatientNetwork(this.bindForm).then(data=>{
            if(data.success===true) {
              this.$message.success('绑定成功')
              this.bindDialogVisible = false
            }else {
              this.$message.error('绑定失败'+data.errorMsg)
            }
          })
        } else {
          return false;
        }
      })
    },
    showPatientInfo(){

    },
    getUrlBase64(url) {
      return new Promise(resolve => {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        let img = new Image()
        img.crossOrigin = 'Anonymous' //允许跨域
        img.src = url
        img.onload = function() {
          canvas.height = 300
          canvas.width = 300
          ctx.drawImage(img, 0, 0, 300, 300)
          let dataURL = canvas.toDataURL('image/png')
          canvas = null
          resolve(dataURL)
        }
      })
    },
    download(downloadUrl) {

      let splits = downloadUrl.split('\\')
      let fileName = splits[splits.length-1]
      this.getUrlBase64(downloadUrl).then(base64 => {
        let link = document.createElement('a')
        link.href = base64
        link.download = fileName
        link.click()
      })
    },
    imgDetection(){
      let str = this.record.resLocation.split('\\images\\')[1]
      this.$emit('imgDetection', '\\images\\' + str)
    },
    imgCoincide(){
      this.$emit('imgCoincide', this.record.id)
    },
    startSegmentation(){
      this.$emit('startSegmentation', this.record.id)
    },
    deleteRecord() {
      this.$confirm('是否删除该记录？', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是',
        cancelButtonText: '否', //相当于 取消按钮
        type: 'warning'
      }).then(() => {
        this.$emit("deleteRecord", this.record.id)
      })
    }
  }
}
</script>

<style scoped>
.expand-area {
  border: 1px solid #3c3f41;
  border-radius: 12px;
  /*display: inline-block;*/
  padding: 10px;
  width: calc(100% - 20px);
  min-height: 690px;
}

.expand-area  .box {
  width:100%;
  height:0;
  padding-bottom:100%;
  overflow: hidden;
  margin-top: 5px;
}
.expand-area-item{
  width: 40%;
  text-align: center;
  padding: 15px;
  border: 1px dashed #3c3a3b;
  border-radius: 8px;
}
.expand-area-context{
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
}
</style>
