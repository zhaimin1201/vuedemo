<template>
    <div>
      <header class="head-tab">
        <ul>
          <li class="back-con"><span class="back" @click="$router.back(-1)">返回</span></li>
          <li class="visodata" >
            <span>订单列表</span>
          </li>
          <li class="visoadd" >
            <span class="ziinput">手动输入</span>
          </li>
        </ul>
      </header>
      <mt-search
        autofocus
        v-model="value"
        :result="filterResult">
      </mt-search>
      <scroller class="addvist_scoll">
        <div class="listcon">
          <div style="margin-top: 10px">
            <div class="listcon_div">
              <p class="listcon_num">
                <span class="bg1"></span>
                <span>合同编号：</span>
              </p>
              <p class="listcon_li2">
                <ul>
                  <li>
                    <span>客户姓名：</span>
                    <span>某某某</span>
                  </li>
                  <li>
                    <span>客户姓名：</span>
                    <span>某某某</span>
                  </li>
                  <li>
                    <span>客户姓名：</span>
                    <span>某某某</span>
                  </li>
                  <li>
                    <span>客户姓名：</span>
                    <span>某某某</span>
                  </li>
                  <li>
                    <span>客户姓名：</span>
                    <span>某某某</span>
                  </li>
                  <li>
                    <span>客户姓名：</span>
                    <span>某某某</span>
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </scroller>
    </div>
</template>

<script>
import Vue from 'vue'
import {Search} from 'mint-ui'
Vue.component(Search.name, Search)
export default {
  data () {
    return {
      value: '',
      // 默认数据
      defaultResult: [
        'Apple',
        'Banana',
        'Orange',
        'Durian',
        'Lemon',
        'Peach',
        'Cherry',
        'Berry',
        'Core',
        'Fig',
        'Haw',
        'Melon',
        'Plum',
        'Pear',
        'Peanut',
        'Other'
      ],
      scrollshow: true
    }
  },
  computed: {
    filterResult () {
      let filvalue = this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value))
      if (filvalue.length > 0) {
        //搜到到结果展示在页面
        console.log(this.scrollshow)
        return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value))
        this.scrollshow = !this.scrollshow
      } else {
        this.listview = false
        alert('没有更多数据')
      }
      // console.log(filvalue)
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="stylus"  rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .head-tab
    height: 51px
    background: #fff
    line-height: 51px
    border-1px(#E0E3E5)
    ul
      display:flex
      li
        font-size:16px
        color:#424242
        flex:1
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
      .visodata
        color:#000000
        font-size:17px
      .visoadd
        margin:auto
        text-align: right
        display: inherit
        .ziinput
          display: block
          color: #4a78e8
          width: 100%
          padding-right: 9px
        img
          width: 27px
          height: 27px
          position: absolute
          right: 0.4rem
          top: 12px
  .addvist_scoll
    margin-top: 105px
    background-color: #ecf0f8
    .listcon
      background: #ffffff
      .listcon_div
        .listcon_num
          padding-left: 30px
          border-1px(#E0E3E5)
          height: 43px
          line-height: 43px
          .bg1
            background-image: url('../../images/selected.png')
            display: inline-block
            width: 19px
            height: 20px
            background-size: 100%
            position: relative
            top: 5px
        .listcon_li2
          border-1px(#E0E3E5)
          line-height: 35px
          padding-left: 30px
</style>
