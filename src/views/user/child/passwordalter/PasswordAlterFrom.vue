<template>
  <div class="password-alter">
    <el-button type="warning" size="small" @click="dialogVisible=true" plain>
      修改密码
    </el-button>

    <el-dialog
        style="text-align: left"
        title="密码修改"
        :visible.sync="dialogVisible"
        width="300">

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "PasswordAlterFrom",
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        pass: '',
        checkPass: '',
        oldPass: ''
      },
      rules: {
        pass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        oldPass: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.open()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    open() {
      this.$confirm('密码即将修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.emitAlter()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
      });
    },

    /**
     * 发出修改密码事件，由父组件接收并发出修改密码网络请求
     */
    emitAlter() {
      if(this.ruleForm.checkPass !== this.ruleForm.pass){
        this.$alert('两次输入密码不相同，请重试')
        return
      }
      this.$emit('alterPassword', {
        oldPwd: this.ruleForm.oldPass,
        newPwd: this.ruleForm.pass,
        confirmPwd: this.ruleForm.checkPass
      })
    }
  }
}

</script>

<style scoped>
.password-alter{
  text-align: right;
  padding: 0 10px;
}
</style>
