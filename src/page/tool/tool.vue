<template>
  <div class="tool">
    <header class="head-tab">工具</header>
    <div class="tool-container1">
      <ul>
        <li>
          <router-link to="/learning">
            <span class="learn icon image-com"></span>
            <span>E-learning</span>
          </router-link>
        </li>
        <li>
          <router-link to="/approval">
            <span class="approval icon image-com"></span>
            <span>审批管理</span>
          </router-link>
        </li>
        <li>
          <router-link to="/addvist">
            <span class="visit icon image-com"></span>
            <span>新建拜访</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="tool-container2">
      <ul>
        <li>
          <span class="order icon image-com"></span>
          <span>待处理订单</span>
        </li>
        <li>
          <span class="client icon image-com"></span>
          <span>待处理客户</span>
        </li>
        <li>
          <span class="yeji icon image-com" style="display: none"></span>
          <span style="display: none">发布业绩</span>
        </li>
      </ul>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from '../../common/footer/footer'
  import Vue from 'vue'
  import VueScroller from 'vue-scroller'
  Vue.use(VueScroller)
  export default {
    components: {
      'v-footer': footer
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .tool
    width: 100%
    height: 100%
    background:#ECF0F8
    .head-tab
      display: block
      text-align:center
      height:3rem
      line-height:3rem
      color:#4A78E8
      background: white
  .tool-container1,.tool-container2
    background: #F9FAFD
    border-1px(#E0E3E5)
    ul
      display:flex
      padding-top: 2.7rem
      li
        flex:1
        text-align: center
        padding-bottom: 3rem
        span
          display: block
          color:#565D66
          font-size:13px
        .icon
          width: 1.4rem
          height: 1.7rem
          margin: auto
          display: block
          padding-bottom: 1rem
        .learn
          bg-image('../../images/learning')
        .approval
          bg-image('../../images/spgl')
        .visit
          background-color: #f9fafd
          bg-image('../../images/xjbf')
          background-position-x: 0px
        .order
          bg-image('../../images/dcldd')
        .client
          bg-image('../../images/dclkh')
        .yeji
          bg-image('../../images/fbyj')
</style>
