<template>
    <div class="resetpassword">
      <header class="head-tab">
        <ul>
          <li class="back-con"><span class="back" @click="$router.back(-1)">返回</span></li>
          <li class="visodata" >
            <span>重置密码</span>
          </li>
          <li></li>
        </ul>
      </header>
      <div class="foget-body">
        <input class="foget-input" @input="descArea" type="text" placeholder="输入8-20位数字加字母新密码" v-model="password">
        <input class="foget-input" @input="descArea" type="password" placeholder="再输入一遍" v-model="aginpassword">
        <button v-bind:class="surex==true ? 'button2':'button1'" @click="nextpass()">确认修改</button>
      </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
import {Global} from '../../config/golobal'
import {InterFace} from '../../config/userapi'
export default {
  name: "resetpassword",
  data () {
    return {
      surex: false,
      password: '',//密码
      aginpassword: '',//2次密码
      telcode: '',//手机号
      mothcod: ''//随机码
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.telcode = this.$route.params.telcode
      this.mothcod = this.$route.params.vercode
    },
    descArea () {
      if (this.password.length && this.aginpassword) {
        //两次密码
        this.surex = true
      } else {
        this.surex = false
      }
    },
    nextpass () {
      if (this.password === this.aginpassword) {
        //调用修改密码接口
        this.resetpassword()
      } else {
        MessageBox('提示', '两次输入密码不一致')
      }
    },
    resetpassword () {
      let code = {
        TelCode: this.telcode,
        UpPassword: this.password,
        VerificationCode: this.mothcod
      }
      let cod = JSON.stringify(code)
      var cha = (data) => {
        console.log(data)
        Toast('修改成功')
        //跳转到登录页面
        this.$router.push('/loginuser')
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.updatepassword, cod, cha)
    }
  }
}
</script>

<style scoped lang="stylus"  rel="stylesheet/stylus">
  .resetpassword
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
      font-size: 14px
      display: block
      margin:auto
      margin-top:1.2rem
      height:45px
      width: 80%
      border:1px solid #E0E0E0
      border-radius:2rem
      text-indent:1.1rem
      outline:none
  .button1,.button2
    display: block
    margin:auto
    margin-top: 23px
    width:80%
    height:45px
    color:#FFFEFE
    background:#4a78e89c
    border-radius:2rem
    border:none
    outline:none
  .button2
    background:#4A78E8
</style>
