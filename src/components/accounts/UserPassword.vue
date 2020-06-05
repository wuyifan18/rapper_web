<template>
  <div id="form">
    <h2>Change password</h2>
    <el-form :model="data" status-icon :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
      <el-form-item label="Old password" prop="oldPassword" style="width:400px">
        <el-input type="password" v-model="data.oldPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="New password" prop="newPassword" style="width:400px">
        <el-input type="password" v-model="data.newPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()" style="margin-left: 80px">Submit</el-button>
        <el-button @click="resetForm('ruleForm')" style="margin-left: 40px">Clear</el-button>
      </el-form-item>
    </el-form>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userApi from 'src/api/userApi'

export default {
  name: 'UserPassword',
  data() {
    return {
      data: {
        oldPassword: '',
        newPassword: ''
      },
      rules: {
        oldPassword: [{ required: true, trigger: 'blur' }],
        newPassword: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  methods: {
    submit() {
      const data = {
        user_id: this.user_id,
        old_password: this.data.oldPassword,
        new_password: this.data.newPassword
      }
      userApi.updatePassword(data).then(() => {
        this.$message({ message: 'success！', type: 'info', duration: 600, center: true })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
.accounts-view
  #form
    height 600px
    padding-left 20px
    .errorStyle
      color #ff4949
      font-size 0.8em
    .input-line, .input-text
      width 360px
      margin-top 6px
      padding 6px 8px
      border 1px solid #ddd
      border-radius 3px
      background-color #fafafa
      box-shadow inset 0 1px 2px rgba(0, 0, 0, 0.075)
    .changePassword
      &:disabled
        color #aaa
        border 1px solid #e9e9e9
</style>
