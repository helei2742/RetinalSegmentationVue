import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idNumber: '',
    srcUrlList: [],
    loginUser: null
  },
  getters: {
    getIdNumber(state) {
      return state.idNumber
    },
    getSrcUrlList(state) {
      return state.srcUrlList
    },
    getLoginUser(state) {
      return state.loginUser
    }
  },
  mutations: {
    setIdNumber(state, idNumber) {
      state.idNumber = idNumber
    },
    setSrcUrlList(state, list) {
      state.srcUrlList = list
    },
    setLoginUser(state, loginUser) {
      state.loginUser = loginUser
    }
  },
  actions: {
  },
  modules: {
  }
})
