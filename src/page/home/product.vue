<template>
  <div>
    <header class="head-tab">
      <ul class="head-ul">
        <li class="head-li back-con"><span class="back" @click=" $router.back(-1)">返回</span></li>
        <li class="head-li" style="font-weight: 400" >
          产品信息
        </li>
        <li class="head-li visimess" >
        </li>
      </ul>
    </header>
    <scroller :on-refresh="refresh" style="top: 45px"
               ref="my_scroller">
      <ul class="product_ul">
        <li class="product_li" v-for="(item,index) in listdata">
          <a :href="'http://yinlaijinfu.yinlaicaifu.com/'+item.projectInfoDetailImg">
            <img class="product_img" alt="" :src="'http://yinlaijinfu.yinlaicaifu.com/'+item.projectInfoIcon" width="100%" height="170">
            <span class="product_span">{{item.projectInfoName}}</span>
            <span class="product_span2">{{item.areasText}}</span>
          </a>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
import {Global} from '../../config/golobal'
import {InterFace} from '../../config/userapi'
import Scroll from '../../base/scroll/scroll'
export default {
  data () {
    return {
      listdata: [],
      pageIndex: 1, //显示页码
      maxResultCount: 5, //显示条数
      cod: '',
      listlength: 0
    }
  },
  created () {
    this.init(this.pageIndex)
  },
  mounted () {
  },
  methods: {
    init (pagendex) {
      let code = {
        PageIndex: pagendex,
        MaxResultCount: this.maxResultCount
      }
      this.cod = JSON.stringify(code)
      var cha = (data) => {
        let imte = data.result.items
        console.log(imte)
        // //this.listdata = imte
        // this.projectInfoIcon = imte.projectInfoIcon
        // this.projectInfoName = imte.projectInfoName
        for (let i = 0; i < imte.length; i++) {
          if (imte[i].projectInfoState == 1) {
            console.log(imte[i])
            this.listdata.push(imte[i])
          }
        }
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.produce, this.cod, cha)
    },
    refresh (done) {
      //下拉刷新
      this.pageIndex = 1
      this.listdata = []
      this.init()
      setTimeout( () => {
        this.top = -58
        done()
      }, 1500)
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus"  rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
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
  .product_ul
    width: 90%
    margin: auto
    margin-top: 10px
    .product_li
      position:relative
      margin-bottom:10px
      .product_span
        position:absolute
        font-weight: 100
        top: 21px
        left: 20px
        font-size: 29px
        color: #fff
      .product_span2
        position:absolute
        font-size: 20px
        color: #fff
        bottom: 28px
        left: 20px
</style>
