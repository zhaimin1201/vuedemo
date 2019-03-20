<template>
    <div class="hist_main">
      <div class="histrycon">
        <header class="histyhead-tab">
          <ul>
            <li class="back-con"><span class="back" @click="$router.go(-1)">返回</span></li>
            <li class="visodata" >
            </li>
            <li class="visimess" >
            </li>
          </ul>
        </header>
      </div>
      <div style="position: absolute; width: 100%; height: 74%; background: #f5f5f7;">
        <div class="chosehist">
          <div class="custormer">
            <router-link to="/custerreport">
              <ul class="custormer_ul">
                <li class="custormer_li custormers">
                  <img class="custor_img" src="../../images/04@2x.png">
                </li>
                <li class="custormer_li custmiddle">
                  <span class="custor_ch">客户</span><br>
                  <span class="custor_zn">Customer</span>
                </li>
                <li class="custormer_li custormers">
                  <img class="custor_go" src="../../images/08@2x.png" alt="">
                </li>
              </ul>
            </router-link>
          </div>
          <div class="custormer">
            <router-link to="/performance">
              <ul class="custormer_ul">
                <li class="custormer_li custormers">
                  <img class="custor_img" src="../../images/yj.png">
                </li>
                <li class="custormer_li custmiddle">
                  <span class="custor_ch">业绩</span><br>
                  <span class="custor_zn">Performance</span>
                </li>
                <li class="custormer_li custormers performance">
                  <img class="custor_go" src="../../images/08@2x.png" alt="">
                </li>
              </ul>
            </router-link>
          </div>
          <div class="custormer">
            <router-link to="/asset">
              <ul class="custormer_ul">
                <li class="custormer_li custormers">
                  <img class="custor_img" src="../../images/zichan.png">
                </li>
                <li class="custormer_li custmiddle">
                  <span class="custor_ch">资产</span><br>
                  <span class="custor_zn">Asset</span>
                </li>
                <li class="custormer_li custormers">
                  <img class="custor_go" src="../../images/08@2x.png" alt="">
                </li>
              </ul>
            </router-link>
          </div>
          <div class="custormer">
            <router-link to="/reportduct">
              <ul class="custormer_ul">
                <li class="custormer_li custormers">
                  <img class="custor_img" src="../../images/product.png">
                </li>
                <li class="custormer_li custmiddle">
                  <span class="custor_ch">产品</span><br>
                  <span class="custor_zn">Product</span>
                </li>
                <li class="custormer_li custormers">
                  <img class="custor_go" src="../../images/08@2x.png" alt="">
                </li>
              </ul>
            </router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      showright: false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .hist_main
    height: 100%
    /*position: absolute*/
    width: 100%
    background: #F5F5F7
    .histrycon
      bg-image('../../images/03')
      height:290px
      background-size: 100% 100%
      @media (max-width: 325px)
        height:225px
      @media (max-width: 365px)
        height:247px
      @media (max-width: 375px)
        height:270px
      .histyhead-tab
        height: 51px
        line-height: 51px
        margin-bottom: 16px
        ul
          display:flex
          li
            font-size:16px
            color:#fff
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
    .chosehist
      /*position: fixed*/
      /*z-index: 99*/
      width: 300px
      height: 500px
      left: 0px
      right: 0
      margin: auto
      position: inherit
      top: -79px
      .custormer
        height: 80px
        margin-bottom: 20px
        .custormer_ul
          display: flex
          .custormer_li
            display: inline-block
            background: #ffffff
            flex: 1
            height: 86px
            .custor_img
              width: 39px
              margin-top: 23px
              margin-left: 20px
            .custor_ch
              color: #4E79E8
              font-size: 19px
              margin-top: 18px
              margin-bottom: 5px
              text-indent: 22px
              display: inline-block
            .custor_zn
              font-size: 27px
              color: #E8F2FE
              text-indent: 22px
              display: inline-block
            .custor_go
              display: inline-block
              margin-top: 35px
              margin-right: 19px
              width: 7px
          .custmiddle
            flex: 2
          .custormers
            text-align: right
            flex: 0.5
          .performance
            flex: 0.5
</style>
