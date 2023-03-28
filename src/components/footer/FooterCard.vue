<template>
<div class="footer-card">
  <div class="footer-card-main">
    <div class="footer-card-msg-card">
      <ul>
        <li><h4>开发成员</h4></li>
        <li>作者：<span>何磊</span></li>
      </ul>
    </div>
    <div class="footer-card-msg-card">
      <ul>
        <li><h4>开源地址</h4></li>
        <li>GitHub:&nbsp&nbsp<el-link target="_blank" href="https://github.com/helei2742/XM06_PMS">
          <span>后端代码</span>
        </el-link></li>
        <li><span style="visibility: hidden">GitHub:&nbsp&nbsp</span>
          <el-link target="_blank" href="https://github.com/helei2742/XM06_PMS_vue">
            <span>前端代码</span>
          </el-link>
        </li>
        <li><span style="visibility: hidden">GitHub:&nbsp&nbsp</span>
          <el-link target="_blank" href="https://github.com/helei2742/XM06_PMS_vue">
            <span>训练模型代码</span>
          </el-link>
        </li>
      </ul>
    </div>
    <div class="footer-card-msg-card">
      <ul>
        <li><h4>所属机构</h4></li>
        <li>四川大学计算机与科学技术学院</li>
        <li>2019级</li>
      </ul>
    </div>
    <div class="footer-card-msg-card">
      <ul>
        <li><h4>联系方式</h4></li>
        <li>手机号：<span>19141273392</span></li>
        <li>邮箱：<span>914577981@qq.com</span></li>
        <li>微信号：<span>helei2742</span></li>
      </ul>
    </div>
  </div>
<!--  <h2 class="footer-card-title">版权所有 © 2021 辛卫研究与开发实践XM06小组</h2>-->
</div>
</template>

<script>
export default {
  name: "FooterCard"
}
</script>

<style scoped>
.footer-card{
  position: relative;
  background-color: rgba(100, 100, 100, 0.4);
  padding: 15px;
  border-top: 1px solid #f8d714;
}
.footer-card ul{
  list-style: none;
}
.footer-card li{
  padding: 0;
}

.footer-card-main{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.footer-card-title{
  text-align: left;
  padding-left: 50px;
  font-size: 16px;
}
.footer-card-msg-card{
  width: 300px;
  float: left;
  font-size: 14px;
  text-align: left;
  padding: 20px;
}
</style>
