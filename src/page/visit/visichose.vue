<template>
    <div class="visichose">
      <header>
        <ul>
          <li class="back-con">
            <span class="back" @click="back()">返回</span>
          </li>
          <li>选择</li>
          <li class="visimess" >
            <img alt="" src="../../images/06@2x.png" class="image-com">
          </li>
        </ul>
      </header>
      <router-view></router-view>
      <div class="visimessage">
        <ul>
          <li v-for="item in ranking">
            <span class="icon" @click="visiecharts(item.departmentUserId, item.isDepartment)"></span>
            <div class="mess">
              <span class="mess_one">{{item.departmentUserName}}</span>
              <span class="mess_two">负责人-{{item.responsiblePostName}}</span>
              <img @click="subordinate(item.isDepartment,item.departmentUserId)" src="../../images/rijiantou.png"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { Cell } from 'mint-ui'
import Vue from 'vue'
import {Global} from '../../config/golobal'
import {InterFace} from '../../config/userapi'
import {Indicator} from 'mint-ui'
import {Toast} from 'mint-ui'
Vue.component(Cell.name, Cell)
export default {
  data () {
    return {
      params: 0,
      ranking: {},
      lastparme: 0,
      loding: true,
      goback: true
    }
  },
  beforeRouteEnter (to, from, next) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    if (toDepth < fromDepth) {
      from.meta.keepAlive = false
      to.meta.keepAlive = true
    }
    next()
  },
  created () {
    this.init()
    this.peranking()
  },
  methods: {
    init () {
      if (this.$route.params.code) {
        this.params = this.$route.params.code
      } else {
        this.params = 0
      }
      console.log(this.$route.params.lastparme)
    },
    back () {
      this.$router.go(-1)
      // if (this.lastparme!= 0) {
      //   this.$router.push({ name: 'visichose2', params: {code: this.lastparme} })
      // } else {
      //   this.$router.push('/my')
      // }
    },
    peranking () {
      let code = {
        DepartmentId: this.params
      }
      let cod = JSON.stringify(code)
      var cha = (data) => {
        console.log(data.result)
        this.ranking = data.result
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.apiGetDepatmentName, cod, cha)

    },
    subordinate (isDepartment, id) {
      this.goback = true
      if (isDepartment === false) {
        Toast("该职位没有下属！")
      } else {
        console.log(id)
        this.$router.push({ name: 'visichose2', params: {code: id} })
      }
    },
    visiecharts (id, isDepartment) {
      console.log(isDepartment)
      //
      if(isDepartment === false) {
        console.log(id)
        //跳转到个人
        this.$router.push({ name: 'visite', params: {code: id}})
      } else {
        //跳转到团队
        this.$router.push({ name: 'Visteam', params: {code: id} })
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .visichose
    position:absolute
    width: 100%
    height: 100%
    background:#fff
    header
      height: 50px
      line-height: 50px
      background: #497be9
      color: #fff
      ul
        display:flex
        li
          flex:1
          text-align: center
        .back-con
          text-indent: 0.4rem
          text-align: left
        .back
          background:url("../../images/back2.png")
          background-repeat:no-repeat
          background-size:25px
          text-indent: 29px
          display: inline-block
          background-position-y: 14px
        .visimess
          img
            display: inline-block
            width:20px
            height:20px
            position: absolute
            right: 12px
            margin-top: 17px
    .visimessage
      ul
        li
          padding: 9px 0 9px 10px
          width: 88%
          margin: auto
          border-1px(#E0E3E5)
          img
            position: absolute
            right:0
            top:35%
          .mess
            display:inline-block
            span
              display:block
            .mess_one
              display: block
              font-size: 15px
              color: #666
            .mess_two
              font-size: 11px
              color: #8b8686
              margin-top: 3px
          .icon
            display:inline-block
            width:25px
            height:25px
            background:#9d9d9d
            border-radius:50%
            margin-right:3px
</style>
