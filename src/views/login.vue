<template>
    <div class="login">
      <div class="container">
          <img src="../assets/avatar.jpg" alt="" class="avatar">
          <!-- - :model：当前表单所绑定的属性对象，对象中的成员由表单元素的数量和作用来决定
               - :rules="rules"：表单的验证规则
               - ref="ruleForm"：表单标识 -->
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <!--  prop：为了配合验证规则，这个prop的属性值就对应着验证规则的名称 -->
         <el-form-item prop="username">
           <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="myicon myicon-user" ></el-input>
         </el-form-item>
         <el-form-item prop="password">
           <el-input v-model="loginForm.password" placeholder="密码" prefix-icon="myicon myicon-key" ></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" class="login-btn" @click="login">登录</el-button>
         </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>
import { login } from '@/api/user_index.js'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // rules是一个对象，书写在data里面，他里面的属性是一个数组
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login(this.loginForm).then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.$router.push({ name: 'home' })
            } else {
              this.$message({
                message: res.data.meta.msg,
                type: 'error'
              })
            }
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '登陆失败',
              type: 'error'
            })
          })
        } else {
          this.$message({
            message: '数据输入不合法',
            type: 'error'
          })
          // 只有return false才能阻止请求
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      margin-bottom:20px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
