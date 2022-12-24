import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idNumber: ''
  },
  getters: {
    getIdNumber(state) {
      return state.idNumber
    }
  },
  mutations: {
    setIdNumber(state, idNumber) {
      state.idNumber = idNumber
    }
  },
  actions: {
  },
  modules: {
  }
})
