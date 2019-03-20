<template>
    <div class="forget">
      <header class="head-tab">
        <ul>
          <li class="back-con"><span class="back" @click="$router.back(-1)">返回</span></li>
          <li class="visodata" >
            <span>安全验证</span>
          </li>
          <li></li>
        </ul>
      </header>
      <div class="foget-body">
        <input class="foget-input" type="text" placeholder="输入手机号" v-model="userphone">
        <div class="forgetword">
          <input class="writepassword" type="password" placeholder="输入密码" v-model="password">
          <span class="getpassword" @click="forclic()">{{this.forgetile}}</span>
        </div>
        <button class="button2" @click="nextpass()">下一步</button>
      </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import {InterFace} from '../../config/userapi'
import {Global} from '../../config/golobal'
export default {
  data () {
    return {
      userphone: '',
      password: '',
      forgetile: '获取验证码',
      phonechose: false
    }
  },
  methods: {
    forclic () {
      // window.clearInterval(interval)
      let myreg = /^1[3|4|5|7|8][0-9]{9}$/  //判断是否为手机号
      //判断是否输入内容
      if (this.userphone) {
        //判断手机号是否为正确
        if (!myreg.test(this.userphone)) {
          MessageBox('提示', '请输入正确的手机号')
        } else {
          this.phonecod()
          var nowtime = 60
          let interval = setInterval (() => {
            nowtime -= 1
            if (nowtime > 0) {
              this.forgetile = nowtime + 's后重新发送'
            } else {
              this.forgetile = "重新获取验证码"
              nowtime = 60
              clearInterval(interval)
            }
          }, 1000)
        }
      } else {
        MessageBox('提示', '请输入手机号')
      }
    },
    phonecod () {
      let code = {
        TelCode: this.userphone
      }
      let cod = JSON.stringify(code)
      var cha = (data) => {
        console.log(data)
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.phonecod, cod, cha)
    },
    nextpass () {
      //判断是否输入验证码
      if (!this.password) {
        MessageBox('提示', '请输入验证码')
      } else {
        let code = {
          TelCode: this.userphone,
          RadCode: this.password
        }
        let cod = JSON.stringify(code)
        var cha = (data) => {
          console.log(data)
          //验证成功跳转重置密码
          if (data.successOrFailure === '验证成功') {
            this.$router.push({path: '/resetpassword',params: {telcode: this.userphone, vercode: data.verificationCode}})
          } else {
            MessageBox('提示', '验证码错误')
          }
        }
        Global.Ajax.post(Global.page.url.Request + InterFace.apificationcode, cod, cha)
      }
    }
  }
}
</script>

<style scoped lang="stylus"  rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .forget
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
          color:#4A78E8
          background-repeat:no-repeat
          background-size:25px
          text-indent: 29px
          display: inline-block
          background-position-y: 14px
        .visodata
          color:#000000
          font-size:17px
  .foget-body
    .foget-input
      display: block
      margin:auto
      margin-top:1.2rem
      height:45px
      width: 80%
      border:1px solid #E0E0E0
      border-radius:2rem
      text-indent:1.1rem
      outline:none
    .forgetword
      border:1px solid
      margin-top: 13px !important
      width:80%
      border-radius:2rem
      height: 2.2rem
      margin:auto
      border: 1px solid #e0e0e0
      .writepassword
        height: 2.2rem
        width: 54%
        border-radius:2rem
        outline:none
        text-indent: 1.1rem
      .getpassword
        font-size: 12px
        border-radius:2rem
        display: inline-block
        width: 104px
        float: right
        height: 28px
        margin-top: 3px
        margin-right: 3px
        text-align: center
        line-height: 28px
        color:#4A78E8
        background: rgba(74,120,232,.3)
    .button2
      display: block
      margin:auto
      width:80%
      height:45px
      margin-top:23px
      color:#FFFEFE
      background:#4A78E8
      border-radius:2rem
      border:none
      outline:none
</style>
