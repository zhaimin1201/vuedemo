<template>
  <div>
    <scroller  ref="myscroller" style="position:absolute;background-color:#ecf0f8">
      <div class="mybody">
        <img src="../../images/bg-my@2x.png" alt="">
      </div>
      <div class="message">
        <ul>
          <li>
            <span class="my-num">{{this.cusertomerCount}}</span>
            <span class="my-uu">客户</span>
          </li>
          <div class="myline"></div>
          <li>
            <span class="my-num">{{this.orderInverstment}}(万)</span>
            <span class="my-uu">在投金额</span>
          </li>
          <div class="myline"></div>
          <li>
            <span class="my-num">{{this.orderInverstmentFund}}</span>
            <span class="my-uu">在投基金金额</span>
          </li>
        </ul>
      </div>
      <!--头像-->
      <div class="myhead">
        <div class="myhead-tx">
          <img @click="exitmase()" v-show="!headPortrait" src="../../images/touxiang.png" alt="" width="65" height="65">
          <img @click="exitmase()" v-show="headPortrait" :src="'http://yinlaijinfu.yinlaicaifu.com/'+ this.headPortrait" width="65" height="65">
          <p class="user-name">{{this.name}}</p>
        </div>
        <!--<div class="card">掌上名片</div>-->
      </div>
      <p class="user-num">{{this.postName}} | {{this.userSerialNumber}}</p>
      <!--拜访记录-->
      <div class="visit baobiao pay">
        <p>
          拜访记录
        </p>
      </div>
      <!--退出-->
      <!--<div class="exit" @click="exit()">退出</div>-->
    </scroller>
    <v-footer></v-footer>
  </div>
</template>

<script>
import footer from '../../common/footer/footer'
import Vue from 'vue'
import {Global} from '../../config/golobal'
import {InterFace} from '../../config/userapi'
import { Search } from 'mint-ui'
Vue.component(Search.name, Search)
export default {
  data () {
    return {
      name: '',//员工姓名
      surname: '',//员工昵称
      userSerialNumber: '',//员工编号
      headPortrait: '',//员工头像
      userID: 0,//员工id
      postId: 0,//职务id
      postName: '',//职务
      departmentId: 0,//部门id
      tel: '',//联系电话
      city: '',//所属城市
      PersonalProfile: '',//个人简介
      ErWeiMa: '',//二维码
      CorporateName: '',//公司名称
      isDeptLeader: false, //是否事部门负责人
      cusertomerCount: '',//客户总数
      orderInverstment: '',//订单金额
      orderInverstmentFund: ''//基金订单金额
    }
  },
  // watch: {
  //   '$route' (to, from) {
  //     console.log(to.name)
  //     console.log(from.name)
  //     if (to.name === 'loginuser' || from.name === 'loginuser' || to.name === 'loginnumber' || from.name === 'loginnumber') {
  //       this.init()
  //       this.getcoun()
  //     } else {
  //       //需要缓存
  //     }
  //   }
  // },
  components: {
    'v-footer': footer
  },
  created () {
    this.init()
    this.getcoun()
  },
  methods: {
    init () {
      var cha = (data) => {
        console.log(data)
        let data2 = data.result
        this.name = data2.name
        this.surname = data2.surname
        this.userSerialNumber = data2.userSerialNumber
        this.isDeptLeader = data2.isDeptLeader
        this.headPortrait = data2.headPortrait // Global.page.url.Request +
        this.userID = data2.id
        this.postId = data2.postId
        this.departmentId = data2.departmentId
        this.tel = data2.tel
        this.city = data2.city
        this.PersonalProfile = data2.personalProfile
        this.ErWeiMa = data2.erWeiMa
        this.CorporateName = data2.CorporateName
        this.postName = data2.postName
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.getUserdetail, '', cha)
    },
    getcoun () {
      var cha = (data) => {
        let data2 = data.result
        this.cusertomerCount = data2.cusertomerCount
        this.orderInverstment = data2.orderInverstment
        this.orderInverstmentFund = data2.orderInverstmentFund
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.apiGetCount, '', cha)
    },
    exitmase () {
      console.log(this.PersonalProfile)
      //编辑个人信息
      this.$router.push({name: 'editpersonal',
        params: {
          id: this.userID,
          name: this.name,
          surname: this.surname,
          PostId: this.postId,
          DepartmentId: this.departmentId,
          Tel: this.tel,
          city: this.city,
          PersonalProfile: this.PersonalProfile,
          HeadPortrait: this.headPortrait,
          ErWeiMa: this.ErWeiMa,
          UserSerialNumber: this.userSerialNumber,
          CorporateName: this.CorporateName,
          postName: this.postName
        }
      })
    },
    exit () {
      this.$router.push('/loginuser')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .mybody
    img
      width: 100%
      height 100%
  .message
    width:94%
    margin-left: 3%
    margin-top: -2rem
    border-radius: 0.7rem
    background:#ffffff
    position:fixed
    z-index:99
    ul
      display:flex
      li
        flex:1
        font-size: 14px;
        span
          height: 2rem
          line-height: 2rem
          display:block
          text-align:center
          color:#565D66
          font-size:15px
        .my-num
          color:#4A78E8
          padding-top: 1rem
        .my-uu
          padding-top: 1rem
          padding-bottom: 2rem
      .myline
        border-right: 1px solid #ebebeb
        height: 2rem
        margin: auto
  .myhead
    .myhead-tx
      color: #fff
      left: 0
      right: 0
      top: 1.5rem
      width: 9rem
      text-align: center
      margin: auto
      position: absolute
      img
        width: 65px
        height: 65px
        border-radius: 50%
      .user-name
        padding-top: 0.5rem
        padding-bottom: 0.2rem
        font-size:13px
    .card
      position: absolute
      font-size: 0.2rem
      text-align: center
      color: #fff
      font-size:10px
      background: rgba(255, 255, 255, 0.26)
      top: 3.5rem
      right: 2rem
      border: 1px solid
      border-radius: 0.7rem
      width: 4rem
      height: 1.4rem
      line-height: 1.4rem
  .user-num
    position: absolute
    font-size:11px
    color:white
    top: 127px
    right: 0
    left: 0
    text-align: center
  .visit
    width: 96%
    margin: auto
    height: 50px
    line-height: 50px
    border-radius: 0.7rem
    background: #fff
    background-size: 20px
    background-repeat: no-repeat
    background-position-y: 50%
    background-position-x: 0.9rem
    border-1px(#ebebeb)
    overflow: hidden
    p
      text-indent: 45px
      background-size: 8px
      background-repeat: no-repeat
      background-position-y: 50%
      background-position: right
      width: 96%
      font-size: 14px
      color: #666
      bg-image('../../images/jiantou')
  .baobiao
    margin-top: 7rem
    bg-image('../../images/yjbbtj')
  .pay
    bg-image('../../images/bfjl')
  .exit
    border:1px solid
    font-size: 14px
    color: #ffffff
    background-color: #4A78E8
    width:50%
    max-width:200px
    margin:auto
    margin-top:24px
    text-align: center
    height:2.2rem
    line-height:2.2rem
    border-radius:2rem
</style>
