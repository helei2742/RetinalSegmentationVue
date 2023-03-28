<template>
<div class="more-data-page">
  <el-table
      :data="moreData.list"
      stripe
      style="width: 100%">
    <el-table-column
        prop="createTime"
        label="记录时间"
        width="240">
      <template slot-scope="scope">
        <div>{{getTime(scope.row.createTime)}}</div>
      </template>
    </el-table-column>
    <el-table-column
        prop="updateTime"
        label="更新时间"
        width="240">
      <template slot-scope="scope">
        <div>{{getTime(scope.row.updateTime)}}</div>
      </template>
    </el-table-column>
    <el-table-column
        prop="segmentationTime"
        label="分割时间(ms)">
    </el-table-column>
    <el-table-column
        prop="state"
        label="状态">
      <template slot-scope="scope">
        <div>{{getState(scope.row.state)}}</div>
      </template>
    </el-table-column>
  </el-table>

  <div>
    <el-pagination
        :page-size="moreData.pageSize"
        :pager-count="7"
        layout="prev, pager, next"
        :current-page="moreData.pageNum"
        @current-change="handleCurrentChange"
        :total="moreData.total">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: "MoreDataPage",
  props:{
    moreData: {
      type: Object,
      default() {
        return null
      }
    },
    state: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getTime() {
      return time => {
        return this.$formatDate(new Date(time))
      }
    },
    getState() {
      return state => {
        if(state === 0) {
          return '尚未分割'
        }else if(state === 1) {
          return '正在分割'
        }else if(state === 2) {
          return '分割完成'
        }
      }
    }
  },
  methods: {
    handleCurrentChange(cutPage) {
      this.$emit('getMoreData', {'state': this.state, 'page': cutPage})
    }
  }
}
</script>

<style scoped>

</style>
