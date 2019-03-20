<template>
  <div class="visichose">
    <header>
      <ul>
        <li class="back-con">
          <span class="back" @click="back()">返回</span>
        </li>
        <li>{{this.headtitle}}</li>
        <li class="visimess" >
          <img v-show="pkshow" alt="" src="../../images/10@2x.png" class="image-com" @click="prompk()">
        </li>
      </ul>
    </header>
    <div class="vitit" v-show="vititshow">最少选择两个，最大选择3个同事进行对比，请选择对象</div>
    <div class="visimessage" v-show="visicon">
      <ul>
        <li v-for="item in ranking">
          <span class="icon" @click="visiecharts(item.departmentUserId, item.isDepartment, item.departmentUserName)">
            <img v-if="!item.headPortrait" class="iconimg" src="../../images/touxiang.png" alt="" width="25" height="25">
            <img v-if="item.headPortrait" class="iconimg" :src="'http://yinlaijinfu.yinlaicaifu.com/'+item.headPortrait" alt="" width="25" height="25">
          </span>
          <div class="mess">
            <span class="mess_one" @click="visiecharts(item.departmentUserId, item.isDepartment, item.departmentUserName)">{{item.departmentUserName}}</span>
            <span class="mess_two" @click="visiecharts(item.departmentUserId, item.isDepartment, item.departmentUserName)">负责人-{{item.responsiblePostName}}</span>
            <img @click="subordinate(item.isDepartment,item.departmentUserId)" src="../../images/rijiantou.png"/>
          </div>
        </li>
      </ul>
    </div>
    <div class="visimessage" v-show="visipk">
      <ul>
        <li v-for="item in ranking">
          <!--<span class="vichose"  ref="singleDom" @click="vichchose(item)" style="color: #3677f7"></span>-->
          <input class="vichose" type="checkbox"
                 :id="'checkbox'+item.id"
                 :data-id="'food-'+item.id" name="radio"
                 :value="item.departmentUserId"
                 v-model="checkValues"
                 @click="vichchose($event,item)"
          >
          <span class="icon" @click="visiecharts(item.departmentUserId, item.isDepartment, item.departmentUserName)">
            <img v-if="!item.headPortrait" class="iconimg2" src="../../images/touxiang.png" alt="" width="25" height="25">
            <img v-if="item.headPortrait" class="iconimg2" :src="'http://yinlaijinfu.yinlaicaifu.com/'+item.headPortrait" alt="" width="25" height="25">
          </span>
          <div class="mess mess2">
            <span class="mess_one" @click="visiecharts(item.departmentUserId, item.isDepartment, item.departmentUserName)">{{item.departmentUserName}}</span>
            <span class="mess_two" @click="visiecharts(item.departmentUserId, item.isDepartment, item.departmentUserName)">负责人-{{item.responsiblePostName}}</span>
            <img @click="subordinate(item.isDepartment,item.departmentUserId)" src="../../images/rijiantou.png"/>
          </div>
        </li>
      </ul>
      <div>
        <span v-show="checkValues.length">{{filterCheckValues}}</span>
      </div>
    </div>
    <div class="visnext"  v-show="visnest" @click="nextbutt()">下一步</div>
  </div>
</template>

<script>
import { Cell } from 'mint-ui'
import Vue from 'vue'
import {Global} from '../../config/golobal'
import {InterFace} from '../../config/userapi'
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
Vue.component(Cell.name, Cell)
export default {
  data () {
    return {
      params: 0,
      ranking: {},
      lastparme: 0,
      headtitle: '选择',
      loding: true,
      goback: true,
      pkshow: false,
      visicon: true,
      visipk: false,
      vititshow: false,
      checkValues: [],
      visnest: false
    }
  },
  watch: {
    '$route' (to, from) {
      if(to.name === 'visite' || from.name === 'visite'  || to.name === 'Visteam' || from.name === 'Visteam') {
        console.log('yesssss')
        //需要缓存
        this.lastparme = sessionStorage.getItem('lastID')
        Indicator.close() //请求成功关闭loding
      } else {
        this.lastparme = sessionStorage.getItem('lastID')
        this.init()
        this.peranking()
      }
    }
  },
  created () {
    this.lastparme = sessionStorage.getItem('lastID')
    this.init()
    this.peranking()
  },
  computed: {
    filterCheckValues: function () {
      return this.checkValues
    }
  },
  methods: {
    init () {
      if (this.$route.params.code) {
        this.params = this.$route.params.code
      } else {
        this.params = 0
      }
    },
    back () {
      this.$router.go(-1)
    },
    peranking () {
      let code = {
        DepartmentId: this.params
      }
      let cod = JSON.stringify(code)
      var cha = (data) => {
        this.ranking = data.result
        if (this.ranking[0].isDepartment === false) {
          this.pkshow = true
        }
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.apiGetDepatmentName, cod, cha)
    },
    subordinate (isDepartment, id) {
      this.goback = true
      if (isDepartment === false) {
        Toast("该职位没有下属！")
      } else {
        this.$router.push({ name: 'visichose2', params: {code: id} })
      }
    },
    visiecharts (id, isDepartment,departmentUserName) {
      if(isDepartment === false) {
        //跳转到个人
        this.$router.push({ name: 'visite', params: {code: id}})
      } else {
        //跳转到团队
        this.$router.push({ name: 'Visteam', params: {code: id, deparname: departmentUserName} })
      }
    },
    prompk () {
      this.headtitle = '选择PK对象'
      this.visicon = false
      this.visipk = true
      this.vititshow = true
      this.visnest = true
    },
    vichchose (id) {
    },
    nextbutt () {
      if (this.checkValues.length > 3) {
        alert('最多选择三人进行对比哦！')
      } else {
        this.$router.push('/pkindex')
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
          .mess2
            margin-left: 13px
          .icon
            display:inline-block
            width:25px
            height:25px
            border-radius:50%
            margin-right:3px
          .vichose
            display: inline-block
            border: 1px solid
            width: 14px
            height: 14px
            position: relative
            top: -7px
          .iconimg
            border-radius: 50%
            left: 10px
            top: 10px
          .iconimg2
            border-radius: 50%
            left: 45px
            top: 10px
    .vitit
      color: #808FEC
      background: #F7F9F8
      font-size:12px
      height:30px
      line-height: 30px
      text-indent: 20px
    .visnext
      width: 90%;
      height: 40px;
      line-height: 40px;
      margin: auto;
      text-align: center;
      background: #6599FE;
      color: #fff;
      border-radius: 21px;
      margin-top: 62px;
</style>
