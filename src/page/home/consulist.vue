<template>
    <div class="conlist">
      <header class="head-tab">
        <ul class="head-ul">
          <li class="head-li back-con"><span class="back" @click=" $router.back(-1)">返回</span></li>
          <li class="head-li" style="font-weight: 400" >
            每日资讯
          </li>
          <li class="head-li visimess" >
          </li>
        </ul>
      </header>
      <div class="list">
        <a v-for="item in newlist" :href="item.shareurl" >
          <mt-cell class="mtcell"
                   :title="item.informationTitle"
                   :label="item.entryTimeText">
            <span><img slot="icon"  width="112" height="83" :src="'http://yinlaijinfu.yinlaicaifu.com/'+item.informationImage"></span>
          </mt-cell>
        </a>
      </div>
    </div>
</template>

<script>
import {Global} from '../../config/golobal'
import {InterFace} from '../../config/userapi'
import { Cell } from 'mint-ui'
import Vue from 'vue'
Vue.component(Cell.name, Cell)
export default {
  name: "consulist",
  data () {
    return {
      newlist: []
    }
  },
  created () {
    this.consulis()
  },
  methods: {
    consulis () {
      //资讯列表
      var cha = (data) => {
        console.log(data)
        console.log(data.result)
        this.newlist = data.result
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.consulis, '', cha)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mint.styl"
  @import "../../common/stylus/mixin.styl"
  .conlist
    .head-tab
      height: 50px
      line-height: 50px
      background: #ffffff
      color: #000000
      .head-ul
        display:flex
        border-1px(#E0E3E5)
        .head-li
          flex:1
          font-size:16px
          text-align: center
        .back-con
          text-indent: 0.4rem
          text-align: left
        .back
          background:url("../../images/back.png")
          background-repeat:no-repeat
          background-size:25px
          text-indent: 29px
          display: inline-block
          background-position-y: 14px
          color: #4A78E8
        .visimess
          .image-com
            display: inline-block
            width:20px
            height:20px
            position: absolute
            right: 12px
            margin-top: 17px
    .list
      margin-top:15px
      a
        color:#666
      .mtcell
        border-1px(#ecf0f8)
        margin-top:15px
        padding-bottom 12px
        line-height: 20px
</style>
