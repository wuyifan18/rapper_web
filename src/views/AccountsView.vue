<template>
  <div class="accounts-view personal-center">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="menu">
          <h2>Settings</h2>
          <router-link class="menu-item" to="/accounts/user-info">Your profile</router-link>
          <router-link class="menu-item" to="/accounts/user-password">Change password</router-link>
        </div>
      </el-col>
      <el-col :span="18">
        <router-view name="accountsView" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AccountsView',
  beforeCreate() {
    // 如果没有登录，跳转到登录页面
    if (!this.$store.state.user.login) {
      this.$router.replace('/login')
    }
    this.$router.replace('/accounts/user-info')
  }
}
</script>
