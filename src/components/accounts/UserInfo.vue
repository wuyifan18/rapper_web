<template>
  <div id="form">
    <h2>Profile</h2>
    <el-form ref="user" :model="user" label-width="80px" label-position="top">
      <el-form-item label="Username" style="width:400px">
        <el-input v-model="user.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="Email" style="width:400px">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="Phone" style="width:400px">
        <el-input v-model="user.phone"></el-input>
      </el-form-item>
      <el-form-item label="Motto" style="width:400px">
        <el-input v-model="user.motto"></el-input>
      </el-form-item>
      </el-form>
    <el-button type="primary" @click="submit()" style="margin-left: 150px">Save</el-button>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import userApi from 'src/api/userApi'

export default {
  name: 'UserInfo',
  data() {
    return {
      user: {
        name: '',
        phone: '',
        email: '',
        motto: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_id'
    ])
  },
  created() {
    this.get()
  },
  methods: {
    submit() {
      var data = {
        'user_id': this.user_id,
        'name': this.user.username,
        'email': this.user.email,
        'motto': this.user.motto,
        'phone': this.user.phone
      }
      userApi.updateProfile(data).then(() => {
        this.$message({ message: 'success！', type: 'info', duration: 600, center: true })
      })
    },
    get() {
      userApi.getProfile(this.user_id).then((response) => {
        this.user = response.data.Data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
