<template>
  <div>
    <div class="tainer">
      <ul class="tabtai">
        <li>
          <router-link to="/home" class="tab-li">
            <span class="icon icon-index12x inconsy"></span>
            <span>首页</span>
          </router-link>
        </li>
        <li>
          <!--/work-->
          <router-link to="/nomessge" class="tab-li">
            <span class="icon icon-work3x"></span>
            <span>工作</span>
          </router-link>
        </li>
        <li>
          <i class="icon-jia3x add" @click="popups">
          </i>
        </li>
        <li>
          <!--nomessge tool-->
          <router-link to="/tool" class="tab-li">
            <span class="icon icon-tool3x"></span>
            <span>工具</span>
          </router-link>
        </li>
        <li>
          <router-link to="/my" class="tab-li">
            <span class="icon icon-my3x"></span>
            <span>我的</span>
          </router-link>
        </li>
      </ul>
    </div>
    <!--弹窗-->
    <mt-popup
      v-model="popupVisible"
      position="bottom" class="popup">
      <div class="pop_main">
        <div class="pop_time">
        </div>
        <div class="poptit">
          <ul class="popul">
            <li>
              <router-link to="/home" class="tab-li">
                <span class="pop pop_order image-com"></span>
                <span>首页</span>
              </router-link>
            </li>
            <li>
              <!--/work nomessge-->
              <router-link to="/nomessge" class="tab-li">
                <span class="pop pop_user image-com"></span>
                <span>工作</span>
              </router-link>
            </li>
            <li>
              <!--nomessge tool-->
              <router-link to="/nomessge" class="tab-li">
                <span class="pop pop_tool image-com"></span>
                <span>工具</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="popfooter">
          <img src="../../images/close.png" alt="关闭" @click="popclose">
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Popup } from 'mint-ui'
import Vue from 'vue'
Vue.component(Popup.name, Popup)
export default {
  data () {
    return {
      popupVisible: false
    }
  },
  methods: {
    popups () {
      this.popupVisible = true
    },
    popclose () {
      this.popupVisible = false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .tainer
    position: fixed
    bottom: 0px
    width: 100%
    border-top:1px solid #E0E3E5
    .tabtai
      display:flex
      background:#ffffff
      padding-top: 0.6rem
      padding-bottom: 0.2rem
      .tab-li.active
        color: #4A78E8
        .icon-work3x:before
          color: #4A78E8
        .icon-tool3x:before
          color: #4A78E8
        .icon-my3x:before
          color: #4A78E8
        .icon-index12x:before
          color: #4A78E8
      li
        flex: 1
        .icon
          font-size: 1.4rem
        span
          display:block
          text-align: center
          height:1.5rem
          line-height:1.5rem
          font-size: 10px
          color: #929292
        .inconsy
          font-size: 1.5rem
        .add
          display: block
          font-size: 2.3rem
          margin: auto
          text-align: center
  .popup
    width: 101%
    background:#F9FAFD
    .pop_main
      .pop_time
        font-size:12px
        display: inline-block
        margin-top: 81px
        margin-left: 33px
        color:#565D66
        line-height: 24px
        span
          display:block
      .popfooter
        background: #fff
        position: absolute
        width: 100%
        text-align: center
        bottom: 0
        height: 50px
        line-height: 50px
      .poptit
        position: absolute
        width: 100%
        bottom: 51px
        .popul
          display:flex
          margin-bottom: 37px
          li
            flex:1
            text-align: center
            .tab-li
              .pop
                height: 64px
                width: 64px
                margin: auto
                padding-bottom: 5px
              .pop_order
                bg-image('../../images/tjdd')
              .pop_user
                bg-image('../../images/tjkh')
              .pop_tool
                bg-image('../../images/xjrc')
            span
              display:block
              font-size:12px
  .v-modal
    background: #F9FAFD
    opacity: 1
</style>
