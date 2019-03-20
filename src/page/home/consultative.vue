import '../static/js/mui.min'
import '../static/css/mui.min.css'
import '../static/css/zixun.css'
<template>
  <div class="mui-content loading">
    <div class="mui-card">
      <div id="">
        <div class="yl-master">
          <div class="yl-maseter-name">
            <img id="masname">
          </div>
          <div class="yl-maseter-xname">
            <span class="yg-name" id="ygname"></span><br />
            <span class="yg-zw" id="ygzw"></span>
            <span class="yg-zw">&nbsp;|&nbsp;</span>
            <span class="yg-zw" id="ygbh"></span>
          </div>
          <div class="yl-lianxi">
            <span class="yl-weixin" id="wx">微信</span><br />
            <span class="yl-weixin yl-weinxin2" id="pho">联系方式</span>
          </div>
        </div>
      </div>

      <div class="yl-gname">
        <span class="zxname card-bj">公司名称</span><span id="corporateName"></span><br />
        <span class="self card-bj">个人简介</span><span id="personalProfile"></span>
      </div>
    </div>
    <!--图文详情-->
    <div class="mui-card" id="tw">
    </div>
    <!--二维码-->
    <div id="backdrop">
      <img id="erwei" />
    </div>
    <!--电话号码-->
    <div id="ylphone">
      <div class="callphone">
        <h2>提示</h2>
        <span id="qrphone"></span><br />
        <button class="butt butt1" id="phonone">取消</button>
        <a id="call"><button class="butt butt2">呼叫</button></a>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../static/css/zixun.css'
import {InterFace} from '../../config/userapi'
import {Global} from '../../config/golobal'
export default {
  created () {
    this.newcon()
  },
  methods: {
    newcon () {
      let username = sessionStorage.getItem('username')
      let id = parseInt(this.$route.query.id)
      let code = {
        UserSerialNumber: username,
        Id: id
      }
      let cod = JSON.stringify(code)
      //请求失败，提示信息
      var erroo = (data) => {

      }
      var cha = (data) => {
        this.markingRateText = data.result.markingRateText
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.newcon, cod, cha, erroo)
      console.log(username)
    }
  }
}
</script>

<style lang="stylus">
  .mui-content{
    border: 1px solid #efeff4;
    height: 100%;
    position: absolute;
    width: 100%;
    background: #efeff4;
    overflow: hidden;
  }
  .mui-card{
    background: #fff;
    width: 94%;
    margin: auto;
  }
</style>
