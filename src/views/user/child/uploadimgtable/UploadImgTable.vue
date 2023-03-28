<template>
<div class="upload-img-table">

  <el-table
      v-loading="loading"
      element-loading-text="加载数据中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"

      :data="records"
      :row-class-name="tableRowClassName"
      :height="this.conf.height"
      style="width: 100%">
<!--    <el-table-column type="expand">-->
<!--      <template slot-scope="props">-->
<!--        <div style="padding: 10px">-->
<!--          <expand-area :record="props.row" v-on="$listeners"/>-->
<!--        </div>-->
<!--      </template>-->
<!--    </el-table-column>-->
    <el-table-column
        :label="this.conf.title +' '+ this.total"
        prop="createTime">
      <template slot-scope="scope">
        <div>
          <div class="upload-img-table-name">
            {{getFileName(scope.row.srcLocation)}}
          </div>
          <div style="font-size: 4px">{{getTime(scope.row.createTime)}}</div>
        </div>
      </template>
    </el-table-column>

    <el-table-column
        width="100"
        prop="state">
      <template slot="header" slot-scope="scope">
        <el-button icon="el-icon-refresh-right" @click="refreshTableClick" circle size="mini"></el-button>
        <el-button icon="el-icon-plus" @click="moreDataClick" circle size="mini"></el-button>
      </template>

      <template slot-scope="scope">
        <el-button @click="recordDetailClick(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import ExpandArea from "@/views/user/child/uploadimgtable/ExpandArea";
import {IMGCDNURL} from "@/config";


export default {
  name: "UploadImgTable",
  components: {ExpandArea},
  computed:{
    getTime() {
      return time => {
        return this.$formatDate(new Date(time))
      }
    },
    getFileName() {
      return location => {
        let arr = location.split('/')
        return  arr[arr.length-1].substr(9)
      }
    }
  },
  props:{
    conf:{
      type: Object,
      default(){
        return {
          title: '等待中',
          type: 0,
          height: 400
        }
      }
    },
    loadDataFun: {
      type: Function,
      default: null
    }
  },
  data(){
    return {
      records: [],
      loading: false,
      total: 0
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (row.state === 0) {
        return 'warning-row';
      } else if (row.state === 2) {
        return 'success-row';
      }
      return '';
    },

    refreshTableClick(){
      this.loading = true
      this.loadDataFun(this.conf.type).then(data=>{
        if(data.success === true) {
          let records = data.data.list
            this.records = records.map((item,index,arr)=>{
            item.srcLocation = IMGCDNURL + item.srcLocation
            item.resLocation = IMGCDNURL + item.resLocation
            return item;
          })
          this.total = data.data.total
        }else {
          this.$message.error('获取上传图片列表失败')
        }
      }).finally(()=>{
        this.loading = false
      })
    },
    moreDataClick(){
      this.$emit('moreData', {'state': this.conf.type, page: 1})
    },
    recordDetailClick(record){
      this.$emit('showRecordDetail', record)
    }
  },
  mounted() {
    this.refreshTableClick()
  }
}
</script>

<style scoped>
.upload-img-table{
  text-align: center;
  border: 1px solid #3c3f41;
  border-radius: 9px;
  padding:3px;
  width: 350px;
}

.upload-img-table-name{
  display:inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  font-weight: 1600;
  font-size: 17px;
}
</style>
