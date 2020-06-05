<template>
    <div class="login-view">
        <div class="login-container">
            <el-form ref="loginForm" :model="loginForm" class="login-form" label-width="100px">
                <el-form-item label="Username" prop="username" :rules="[{ required: true, message: 'Username can\'t be blank'}]">
                    <el-input
                            ref="username"
                            v-model="loginForm.username"
                            type="text"
                    />
                </el-form-item>
                <el-form-item label="Password" prop="password" :rules="[{ required: true, message: 'Password can\'t be blank'}]">
                    <el-input
                            ref="password"
                            v-model="loginForm.password"
                            :type="passwordType"
                    />
                    <span class="show-pwd" @click="showPwd">
          </span></el-form-item>
                <el-form-item label="Phone" prop="phone">
                    <el-input
                            ref="phone"
                            v-model="loginForm.phone"
                            type="text"
                    />
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input
                            ref="email"
                            v-model="loginForm.email"
                            type="text"
                    />
                </el-form-item>
                <el-form-item label="Motto" prop="motto">
                    <el-input
                            ref="motto"
                            v-model="loginForm.motto"
                            type="text"
                    />
                </el-form-item>
                <el-button
                        :loading="loading"
                        type="primary"
                        style="margin-left:180px;margin-right:70px"
                        @click.native.prevent="register"
                >Sign up</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import userApi from '../api/userApi'
export default {
  name: 'LoginView',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        motto: '',
        phone: '',
        email: ''
      },
      passwordType: 'password'
    }
  },
  beforeCreate() {
    if (this.$store.state.user.login) {
      this.$router.replace('/')
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    register() {
      const data = {
        'username': this.loginForm.username,
        'password': this.loginForm.password,
        'motto': this.loginForm.motto,
        'phone': this.loginForm.phone,
        'email': this.loginForm.email
      }
      userApi.register(data).then(() => {
        this.$message({ message: 'success！', type: 'info', duration: 600, center: true })
      }).catch((error) => {
        this.$message({ message: error, type: 'warning', duration: 600, center: true })
      })
      this.$router.push('Login')
    }
  }
}
</script>

<style lang="scss" scoped>
    .login-view {
        margin-top: 50px
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        color: #454545;
    }

    .login-container {
        min-height: 100%;
        width: 100%;
        overflow: hidden;

        .login-form {
            position: relative;
            width: 450px;
            max-width: 100%;
            padding: 100px 35px 0;
            margin: 0 auto;
            overflow: hidden;
        }

        .svg-container {
            position: absolute;
            padding: 6px 5px 6px 15px;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                margin: 0 auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            width: 30px;
            height: 30px;
            font-size: 16px;
            cursor: pointer;
            user-select: none;
        }
    }
</style>
