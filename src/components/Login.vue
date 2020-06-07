<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
          <img src="../assets/logo.png">
      </div>
      <!-- 表单区域 -->
      <el-form ref="loginFormRef" class="login_form" :rules="loginRules" :model="loginForm" label-width="0">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icondenglu"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont iconmima"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login('loginFormRef')">登录</el-button>
          <el-button @click="resetLoginForm('loginFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度5~12字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度6~10字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    login(loginFormRef) {
      this.$refs[loginFormRef].validate(async (valid) => {
          if (!valid) alert('登录失败');
          const {data: res} = await this.$http.post('login', this.loginForm);
          if (res.status == 'ok') {
            window.sessionStorage.setItem('user', res.user);
            this.$message.success('登录成功');
            this.$router.push({path: '/home'});
          } else {
            this.$message.error('登录失败');
          }
        });
    },
    // 重置表单
    resetLoginForm(loginFormRef) {
      this.$refs[loginFormRef].resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  border-radius: 3px;
  background-color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 5px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #eee;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.btns{
  display: flex;
  justify-content: flex-end;
}
.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>