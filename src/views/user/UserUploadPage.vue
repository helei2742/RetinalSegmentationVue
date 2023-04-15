<template>
<div class="user-upload-page">
  <div class="user-upload-page-operate">
    <upload-img-table
        key="0"
        class="user-upload-page-img-table"
        :conf="this.conf.imgTable[0]"
        :load-data-fun="getUploadRecordList"
        @moreData="getMoreData"
        @showRecordDetail="showRecordDetail"/>

    <upload-img-table
        key="1"
        class="user-upload-page-img-table"
        :conf="this.conf.imgTable[1]"
        :load-data-fun="getUploadRecordList"
        @moreData="getMoreData"
        @showRecordDetail="showRecordDetail"/>

    <upload-img-table
        key="2"
        class="user-upload-page-img-table"
        :conf="this.conf.imgTable[2]"
        :load-data-fun="getUploadRecordList"
        @moreData="getMoreData"
        @showRecordDetail="showRecordDetail"/>
  </div>


  <div class="user-upload-page-detail">

    <div class="upload-area">
      <el-button style="width: 100%;height: 100%;text-align: center"
                 @click="uploaderVisible=true" plain>
        点击上传需分割的图片
      </el-button>

    </div>
    <expand-area :record="currentRecord"
                 @imgDetection="imgDetection"
                 @imgCoincide="imgCoincide"
                 @startSegmentation="startSegmentation"
                 @deleteRecord="deleteRecord"/>
  </div>

  <el-dialog
      title="图片上传"
      :visible.sync="uploaderVisible"
      width="1200px">
    <file-upload @uploadFile="uploadUserFile"/>
    <span slot="footer" class="dialog-footer">
    <el-button @click="uploaderVisible = false">取 消</el-button>
    <el-button type="primary" :disabled="percentVisible===false"
               @click="uploaderVisible = false">确 定</el-button>
  </span>
  </el-dialog>


  <el-dialog
      title="提示"
      :visible.sync="moreDataVisible"
      width="90%">



    <more-data-page
        :state="this.currentState"
        @getMoreData="getMoreData"
        @showRecordDetail="showRecordDetailV2"
        :more-data="moreData"/>
    <span slot="footer" class="dialog-footer">
    <el-button @click="moreDataVisible = false">取 消</el-button>
    <el-button type="primary" @click="moreDataVisible = false">确 定</el-button>
  </span>
  </el-dialog>

</div>
</template>

<script>
import FileUpload from "@/components/fileupload/FileUpload";
import UploadImgTable from "@/views/user/child/uploadimgtable/UploadImgTable";
import {
  deleteRecordNetwork,
  getUserImageListNetwork,
  imageDetectionNetwork,
  imageCoincideNetwork,
  imageSegmentationNetwork,
  userUploadSrcImageNetwork
} from "@/network/user";
import {IMGCDNURL} from "@/config";
import ExpandArea from "@/views/user/child/uploadimgtable/ExpandArea";
import MoreDataPage from "@/views/user/child/moredatapage/MoreDataPage";
export default {
  name: "UserUploadPage",
  components: {MoreDataPage, ExpandArea, UploadImgTable, FileUpload},
  methods: {
    uploadUserFile(fileForm){
      this.percentVisible = true;
      const uploadProgressEvent = progressEvent => {
        this.progressPercent = (progressEvent.loaded / progressEvent.total * 100 | 0)
      }
      userUploadSrcImageNetwork(fileForm,uploadProgressEvent).then(res => {
        if(res.success === true) {
          this.$message.success('上传成功')
          this.fileForm = null
        }else {
          this.$message.error(res.errorMsg)
        }
      })
    },

    startSegmentation(recordId){
      imageSegmentationNetwork(recordId).then(res=>{
        if(res.success === true) {
          this.$message.success("请求已发送，服务器正在处理")
        }else {
          this.$message.error(res.errorMsg)
        }
      })
    },

    getUploadRecordList(state) {
      let uid = this.$store.getters.getLoginUser.id
      return getUserImageListNetwork(uid, state,1, 10)
    },
    getMoreData(payload){
      const {state, page} = payload

      this.currentState = state

      let uid = this.$store.getters.getLoginUser.id
      getUserImageListNetwork(uid, state, page, 10).then(data=>{
        // console.log(data)
        if(data.success === true) {
          this.moreData = data.data
          this.moreDataVisible = true
        }else {
          this.$message.error('获取数据失败')
        }
      })
    },
    showRecordDetail(record) {
      this.currentRecord = record
    },
    showRecordDetailV2(record){
      this.moreDataVisible = false
      record.srcLocation = IMGCDNURL + record.srcLocation
      record.resLocation = IMGCDNURL + record.resLocation
      this.currentRecord = record
    },
    imgDetection(srcPath) {
      const loading = this.$loading({
        lock: true,
        text: '处理中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      imageDetectionNetwork(srcPath).then(data=>{
        if(data.size !== 0){
          let BLOB = new Blob([data]);
          let url = window.URL.createObjectURL(BLOB);
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', 'detectionResult.png');
          document.body.appendChild(link);
          link.click();
        }else {
          this.$message.error('发生错误')
        }
      }).finally(()=>{
        loading.close()
      })
    },
    imgCoincide(recordId){
      const loading = this.$loading({
        lock: true,
        text: '处理中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      imageCoincideNetwork(recordId).then(data=>{
        if(data.size !== 0){
          let BLOB = new Blob([data]);
          let url = window.URL.createObjectURL(BLOB);
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', 'CoincideResult.png');
          document.body.appendChild(link);
          link.click();
        }else {
          this.$message.error('发生错误')
        }
      }).finally(()=>{
        loading.close()
      })
    },

    deleteRecord(recordId) {
      const loading = this.$loading({
        lock: true,
        text: '正在删除记录',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      deleteRecordNetwork(recordId).then(data =>{
        if(data.success === true) {
          this.$message.success("记录删除成功")
        }else {
          this.$message.error("删除失败" + data.errorMsg)
        }
      }).finally(()=>{
        loading.close()
      })
    }
  },
  data(){
    return {
      currentRecord: null,
      percentVisible: false,
      uploaderVisible: false,
      moreDataVisible: false,
      progressPercent: 0,
      conf: {
        imgTable: [
          {
            title: '等待中',
            type: 0,
            height: 300
          },
          {
            title: '进行中',
            type: 1,
            height: 130
          },
          {
            title: '已完成',
            type: 2,
            height: 300
          }
        ]
      },
      currentState: 0,
      moreData: {

      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{
      if(vm.$store.getters.getLoginUser === null) {
        vm.$confirm('您尚未登陆，请先登录才能使用相关功能')
            .then(_ => {
              vm.$router.push('/login')
            })
            .catch(_ => {});
      }
    })
  }
}
</script>

<style scoped>
.user-upload-page{
  position: relative;
}
.user-upload-page-img-table{
  margin-top: 6px;
}
.user-upload-page-operate{
  position: absolute;
}
.user-upload-page-detail{
  margin: 6px;
  position: absolute;
  right: 0;

  width: calc(100% - 372px);
}
.upload-area{
  height: 67px;
  border: 1px solid #000000;
  border-radius: 6px;
  margin-bottom: 7px;
}
</style>
