import http from '../utils/http'

export default {
  login(data) {
    return http({
      method: 'post',
      url: '/api/user/login?name=' + data['name'] + '&password=' + data['password']
    }
    )
  },
  register(data) {
    return http({
      method: 'post',
      url: '/api/user/register?name=' + data['username'] + '&password=' + data['password'] + '&phone=' + data['phone'] + '&email=' + data['email'] + '&motto=' + data['motto']
    }
    )
  },
  getProfile(user_id) {
    return http({
      method: 'post',
      url: 'api/user/query/id?user_id=' + user_id,
      headers: { 'showLoading': false }
    }
    )
  },
  updateProfile(data) {
    return http({
      method: 'post',
      url: '/api/user/change/info?user_id=' + data['user_id'] + '&phone=' + data['phone'] + '&email=' + data['email'] + '&motto=' + data['motto'],
      headers: { 'showLoading': false }
    }
    )
  },
  updatePassword(data) {
    return http({
      method: 'post',
      url: '/api/user/change/password?user_id=' + data['user_id'] + '&old_password=' + data['old_password'] + '&new_password=' + data['new_password']
    })
  },
  insertRecord(data) {
    return http({
      method: 'post',
      url: '/api/user/footprint/new',
      data: data,
      headers: { 'showLoading': false }
    })
  },
  getRecord(data) {
    return http({
      method: 'post',
      url: '/api/user/footprints',
      data: data,
      headers: { 'showLoading': false }
    })
  }
}
