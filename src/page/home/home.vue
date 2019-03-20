<template>
  <div class="home">
    <header class="head-tab">首页</header>
    <div>
      <scroller  ref="myscroller">
        <!--轮播图-->
        <div class="swip-mt">
          <mt-swipe :auto="4000" :show-indicators="true" >
            <mt-swipe-item v-for="item in picArr">
              <img :src="varurl+ item.url" alt="轮播1" width="100%" height="100%" @click="Carouselhref(item.redirectUrl)">
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <!--tab-->
        <div class="home-tab">
          <ul>
            <li>
              <router-link tag="span" to="/consulist" class="tab-icon1 image-com tab-iconcom"></router-link>
              <span>每日咨询</span>
            </li>
            <li>
              <router-link tag="span" to="/product" class="tab-icon2 image-com tab-iconcom"></router-link>
              <span>产品信息</span>
            </li>
            <li>
              <span tag="span" @click="workgrade()" class="tab-icon3 image-com tab-iconcom"></span>
              <span>业绩统计</span>
            </li>
          </ul>
        </div>
        <!--时间选择-->
        <div class="time">
          <v-timer></v-timer>
        </div>
        <!--新闻列表-->
        <div class="news">
          <ul>
            <li v-for="item in carous">
              <span>{{item.calenderContent}}</span>
            </li>
          </ul>
        </div>
        <!--查看更多-->
        <div class="seemore">
          <div class="tab-li" @click="More()">
            <p>查看更多>></p>
          </div>
        </div>
        <div style="height: 60px;"></div>
      </scroller>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import footer from '../../common/footer/footer'
import Timer from '../timer/timer'
import bus from '../../assets/evenBus'
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui'
import {Global} from '../../config/golobal'
import {InterFace} from '../../config/userapi'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
  data () {
    this.$router.replace({
      path: '/home'
    })
    return {
      picArr: '',
      allcarous: '',//全部日程
      carous: '',//部分日程
      timer: '',
      transitionName: '',
      varurl: ''
    }
  },
  components: {
    'v-footer': footer,
    'v-timer' : Timer
  },
  created () {
    let name = 'code'
    this.Carousel()
    this.Advisory(this.timer)
    bus.$on("sendeMsagToInhours",(message)=>{
      this.timer = message
      this.Advisory(this.timer)
      sessionStorage.setItem('timer', message)
      console.log(sessionStorage.getItem('timer'))
    })
  },
  methods: {
    //获取轮播图
    Carousel () {
      var cha = (data) => {
        console.log(data)
        console.log(Global.page.url.Request)
        this.varurl = Global.page.url.Request
        this.picArr = data.result
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.carousel, '', cha)
    },
    //点击轮播图跳转
    Carouselhref (e) {
      window.location.href = e
    },
    //业绩统计
    workgrade () {
      var cha = (data) => {
        console.log(data.result.isDeptLeader)
        let idlearder = data.result.isDeptLeader
        if (idlearder === true) {
          //判断是否是领导
          this.$router.push('/visteam')
        } else {
          this.$router.push('/visit')
        }
      }

      Global.Ajax.post(Global.page.url.Request + InterFace.workgrade, '', cha)
    },
    //查看跟多
    More () {
      this.$router.push({name: 'allvisory', params: {timer: this.timer}})
    },
    //获取日程
    Advisory (timer) {
      //默认时间为当前时间
      let today = new Date()
      let year = today.getFullYear()
      let month = today.getMonth() + 1
      let day = today.getDate()
      let dayDate = ''
      if (!timer) {
        dayDate = String(year) + "-" + String(month) + "-" + String(day)
        this.timer = dayDate
      }
      let code = {
        EntryTime: this.timer
      }
      let cod = JSON.stringify(code)
      var cha = (data) => {
        this.allcarous = data.result //全部日程
        if (data.result.length > 3) {
          this.carous = data.result.slice(0, 3)
        } else {
          this.carous = data.result
        }
      }
      var erroo = (data) => {
        console.log(data)
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.advisory, cod, cha, erroo)
    }
    //
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .home
    position: absolute
    width: 100%
    height: 100%
    background: #ECF0F8
    .head-tab
      display: none
      text-align:center
      height:3rem
      line-height:3rem
      color:#4A78E8
      background: white
      font-size: 18px
    .swip-mt
      height:9rem
    .home-tab
      background:#ffffff
      padding-bottom: 12px;
      ul
        display:flex
        li
          flex:1
          text-align:center
          span
            display: block
            color:#565D66
            font-size: 13px
          .tab-iconcom
            height: 1.7rem
            line-height: 1.7rem
            width: 1.7rem
            margin: auto
            margin-bottom: 1rem
            margin-top: 1.4rem
          .tab-icon1
            width: 25px
            height: 24px
            bg-image('../../images/mrzx')
          .tab-icon2
            width: 25px
            height: 25px
            bg-image('../../images/cpxx')
          .tab-icon3
            width: 25px
            height: 25px
            bg-image('../../images/yjbbtj')
    .time
      height:138px
      margin-top: 12px
    .news
      background:#ffffff
      font-size: 14px
      ul
        li
          text-indent: 1rem
          border-1px(#E0E3E5)
          line-height: 4rem
          background-image: url('../../images/point.png')
          background-repeat:no-repeat
          padding-left: 20px
          background-position-x: 9px
          background-position-y: 23px
          span
            color: #565D66
            display: inline-block
            width: 87%
            line-height: 24px
            text-indent: 0
            padding-top: 17px
    .seemore
      text-align: center
      color: #4A78E8
      background: #fff
      height: 3rem
      line-height: 3rem
      font-size:14px
      margin-bottom: 90px
</style>
