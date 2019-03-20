// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'  //解决移动端点击300ms延迟得问题
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router/router'
import VueScroller from 'vue-scroller'
import 'mint-ui/lib/style.css'
import './assets/my-mint.styl'
import Promise from 'promise-polyfill'
import store from './store/'
// 引入echarts
import echarts from 'echarts'
//mui
// import mui from '../static/js/mui.min'
// Vue.prototype.mui = mui

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueScroller)

if (!window.Promise) {
  window.Promise = Promise
  window.Promise = Promise
}

// const router = new VueRouter({
//   routes, // （缩写）相当于 routes: routes
//   linkExactActiveClass:'active'
// })

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
