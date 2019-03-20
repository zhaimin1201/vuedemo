<template>
  <div>
    <v-maipage></v-maipage>
    <div class="loginuser">
      <input type="text" @input="descArea" placeholder="输入用户名" v-model="username">
      <input type="password" @input="descArea" placeholder="输入密码" v-model="password">
      <div class="forget">
        <router-link tag="p" to="/forgetword">忘记密码</router-link>
      </div>
      <button @click="handleLogin" v-bind:class="login==true ? 'button2':'button1'">登录</button>
    </div>
  </div>
</template>
<script>
import maipage from '../../page/main/mainpage'
import { Toast } from 'mint-ui'
import {InterFace} from '../../config/userapi'
import {Global} from '../../config/golobal'
export default {
  data () {
    return {
      username: '',
      password: '',
      login: false
    }
  },
  components: {
    'v-maipage': maipage
  },
  methods: {
    //获取用户名与密码
    descArea () {
      console.log(this.username)
      if (this.username.length >= 4 && this.password.length >= 6) {
        this.login = true
      } else {
        this.login = false
      }
    },
    //登录
    handleLogin () {
      let username = this.username
      let password = this.password
      //将用户名保存到本地
      localStorage.setItem('username', this.username)
      let code = {
        UserName: username,
        Password: password
      }
      let cod = JSON.stringify(code)
      //判断用户名和密码是否为空
      if (this.login) {
        //登录成功跳转到首页

        //请求失败，提示信息
        var erroo = (data) => {
          console.log(data)
          let instance = Toast(data)
          setTimeout(() => {
            instance.close()
          }, 2000)
        }
        var cha = (data) => {
          console.log(data)
          sessionStorage.setItem('username', this.username)
          Global.token.set(data.token)
          this.$router.push('/home')
        }
        Global.Ajax.post(Global.page.url.Request + InterFace.userlogin, cod, cha, erroo)
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .loginuser
    input
      display: block
      margin:auto
      margin-top:1.2rem
      height:45px
      width: 80%
      border:1px solid #E0E0E0
      border-radius:2rem
      text-indent:1.1rem
      outline:none
    input::-webkit-input-placeholder
      color:#E0E0E0
    input:-moz-placeholder
      color:#E0E0E0
    input::-moz-placeholder
      color:#E0E0E0
    input:-ms-input-placeholder
      color:#E0E0E0
    .forget
      font-size:12px
      color:#4A78E8
      width: 80%
      height: 44px
      line-height: 44px
      margin: auto
      padding-right: 28px
      text-align: right
    .button1,.button2
      display: block
      margin:auto
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
