import Vue from 'vue'
import router from 'vue-router'
Vue.use(router)
export default {
  //处理你要干什么，异步请求，判断，流程控制
  // increme:({//处理你要干什么，异步请求，判断，流程控制
  //            commit
  //          })=>{
  //   commit('increme')
  // }
  handleLogin: ({
    commit
  }) => {
    // alert(111222)
    //this.$router.push('/loginnumber')
    commit('handleLogin').$router.push('/loginnumber')
  }
}
