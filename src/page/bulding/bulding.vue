<template>
  <div class="bindcon">
    <div v-if="load">
      <img src="../../images/loding2.gif" style="position: absolute; display: block; margin: auto; left: 0; right: 0; top: 0; bottom: 0;">
    </div>
    <div v-if="page">
      <img class="bindcon-image"  alt="" :src="this.headimgurl">
      <!--:src="this.headimgurl"-->
      <p class="bindcon-name">{{this.nickname}}</p>
      <input class="uname" type="text" id="username"  placeholder="输入用户名">
      <input class="upass" type="password" id="passwor" placeholder="输入密码">
      <button class="surebtn" @click="handleLogin" >确认授权</button>
    </div>
  </div>
</template>

<script>
import {Global} from '../../config/golobal'
import {InterFace} from '../../config/userapi'
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      load: true,
      page: false,
      codeunescape: '',
      headimgurl: '',
      nickname: ''
    }
  },
  created () {
    this.init()
    this.acctoken()
  },
  methods: {
    init () {
      //截取code
      var name = 'code'
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
      var r = window.location.search.substr(1).match(reg)
      if (r != null) {
        this.codeunescape = unescape(r[2])
      }
      //获取本地token
      var globaltoken = Global.token.get()
      Global.token.set(globaltoken)
    },
    acctoken () {
      var unes = {
        code: this.codeunescape
      }
      var cod = JSON.stringify(unes)

      var cha = (data) => {
        if((data.openId != null) && (data.headimgurl != null) && (data.nickname != null)) {
          Global.storage.local.set('openId', data.openId)
          Global.storage.local.set('headimgurl', data.headimgurl)
          Global.storage.local.set('nickname', data.nickname)
          this.headimgurl = data.headimgurl
          this.nickname = data.nickname
        } else {
          this.headimgurl = Global.storage.local.get('headimgurl')
          this.nickname = Global.storage.local.get('nickname')
        }
        if(data.isBinDing === true) {
          this.page = false
          this.load = true
          if(data.tokenIsEffective === false) {
            //已绑定 mis_token有效
            //alert("跳转主页")
            Global.token.set(data.token)
            this.$router.push('/home')
          } else {
            this.$router.push('/home')
            // alert("跳转主页")
          }
        }
        if (data.isBinDing === false) {
          // alert('请绑定账号')
          this.page = true
          this.load = false
          MessageBox('提示', '请绑定账号')
        }
      }
      var erroo = (data) => {
        console.log(data)
        let instance = Toast(data)
        setTimeout(() => {
          instance.close()
        }, 2000)
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.gettoken, cod, cha, erroo)
    },
    handleLogin () {
      var username = $('#username').val()
      var passwor = $('#passwor').val()
      var openId = Global.storage.local.get('openId')
      var code = {
        UserName: username,
        Password: passwor,
        OpenId: openId
      }
      var cod = JSON.stringify(code)
      var cha = (data) => {
        Global.token.set(data.token)
        console.log(data.token)
        //跳转到首页
        this.$router.push('/home')
      }
      //请求失败，提示信息
      var erroo = (data) => {
        console.log(data)
        let instance = Toast(data)
        setTimeout(() => {
          instance.close()
        }, 2000)
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.handlogin, cod, cha, erroo)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .bindcon
    .bindcon-image
      display:block
      margin:auto
      width:80px
      height:80px
      border-radius:50%
      margin-top:30px
    .bindcon-name
      text-align:center
      line-height:30px
    .uname, .upass
      margin:auto
      display: block
      margin:auto
      margin-top:1.2rem
      height:45px
      width: 80%
      border:1px solid #E0E0E0
      border-radius:2rem
      text-indent:1.1rem
      outline:none
    .surebtn
      display: block
      margin:auto
      margin-top: 20px
      width:80%
      height:45px
      color:#FFFEFE
      background:#4A78E8
      border-radius:2rem
      border:none
      outline:none
</style>
