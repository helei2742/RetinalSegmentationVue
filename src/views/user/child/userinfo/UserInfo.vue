<template>
  <div class="user-info"  >
    <el-descriptions title="用户信息" :column="1" border>
      <el-descriptions-item label="用户名">{{ userInfo.username }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">
        <el-tag size="small">{{ userInfo.email }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
        {{userInfo.createTime}}
      </el-descriptions-item>
      <el-descriptions-item label="上传分割任务总数">
        <el-statistic title="已提交/已处理">
          <template slot="formatter"> {{userInfo.commit + '/'+  userInfo.segmentation}} </template>
        </el-statistic>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props:{
    userInfo: {
      type: Object,
      default() {
        return {
          username: '无数据',
          email: '无数据',
          createTime: null,
          commit: 0,
          segmentation: 0
        }
      }
    }
  }
}
</script>

<style scoped>
.user-info{
  width: 600px;
  border: 1px solid #2b2b2b;
  border-radius: 5px;
  padding: 5px;
}
</style>
