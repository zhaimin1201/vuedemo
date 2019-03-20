import Vue from 'vue'
import Vuex from 'vuex'
import router from 'vue-router'

Vue.use(Vuex)
Vue.use(router)
import mutations from './mutations'
import actions from './actions'

export default new Vuex.Store({
  actions,
  router
})
