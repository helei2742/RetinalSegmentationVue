<template>
  <div class="create-account-from">
    <el-form ref="createForm" :model="form" :rules="rules">

      <el-row class="create-account-from-item">
        <el-col :offset="2" :span="20">
          <el-form-item label="请输入6到14位用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="create-account-from-item">
        <el-col :offset="2" :span="20">
          <el-form-item label="请输入6到16位密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="create-account-from-item">
        <el-col :offset="2" :span="20">
          <el-form-item label="请输入电子邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="create-account-from-item">
        <el-col :offset="2" :span="20">
          <el-button @click="createAccount" style="width: 100%" type="primary">创建账户</el-button>
        </el-col>
      </el-row>

    </el-form>
  </div>

</template>

<script>
export default {
  name: "CreateAccountFrom",
  data(){
    return {
      form:{
        username: '',
        password: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    createAccount() {
      this.$refs['createForm'].validate((valid) => {
        if (valid) {
          let user = {
            username: this.form.username,
            password: this.form.password,
            email: this.form.email
          }
          this.$emit('createaccount', user)
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style scoped>

.create-account-from{
  background-color: rgba(200,200,200,0.7);
  padding: 80px 0 100px;
  border-radius: 12px;
}

</style>
