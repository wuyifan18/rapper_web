import Store from '../../utils/store.js'
import userApi from '../../api/userApi'

const state = {
  login: Store.fetch('login') != null,
  user_id: Store.fetch('user_id')
}

const mutations = {
  LOGIN(state) {
    state.login = true
    Store.save('login', state.login)
  },
  SET_ID: (state, user_id) => {
    state.user_id = user_id
    Store.save('user_id', state.user_id)
  },
  LOGOUT(state) {
    state.login = false
    state.user_id = null
    Store.remove('login')
    Store.remove('user_id')
  }
}

// actions
const actions = {
  doLogin({ commit }, user) {
    return new Promise((resolve, reject) => {
      userApi.login(user).then(response => {
        if (response.data.Result.StateCode !== '200') {
          throw new Error(response.data.Result.StateMes)
        }
        commit('LOGIN')
        commit('SET_ID', response.data.UserId)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  doLogout({ commit }) {
    commit('LOGOUT')
  }
}

export default {
  state,
  mutations,
  actions
}
