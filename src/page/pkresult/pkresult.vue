<template>
    <div class="pksresult">
      <header>
        <ul>
          <li class="back-con">
            <span class="back" @click="back()">返回</span>
          </li>
          <li>PK结果</li>
          <li class="visimess" >
          </li>
        </ul>
      </header>
      <ul class="tab-head">
        <li class="tab-head-item">兴趣爱好</li>
        <li class="tab-head-item">兴趣爱好</li>
        <li class="tab-head-item">兴趣爱好</li>
        <li class="tab-head-item">兴趣爱好</li>
        <li class="tab-head-item">兴趣爱好</li>
        <li class="tab-head-item">兴趣爱好</li>
        <li class="tab-head-item">兴趣爱好</li>
        <li class="tab-head-item">兴趣爱好</li>
        <li class="tab-head-item">兴趣爱好</li>
        <li class="tab-head-item">兴趣爱好</li>
        <li class="tab-head-item">兴趣爱好</li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: "pkresult"
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .pksresult
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
        .visimess
          text-align: right
          margin-right: 0px
          position: relative
          left: -13px
        .back
          background:url("../../images/back2.png")
          background-repeat:no-repeat
          background-size:25px
          text-indent: 29px
          display: inline-block
          background-position-y: 14px
    .tab-head
      list-style-type: none
      display:-webkit-box
      display:-webkit-flex
      display:-ms-flexbox
      display:flex
      -webkit-flex-wrap:nowrap
      -ms-flex-wrap:nowrap
      flex-wrap:nowrap
      -webkit-box-pack:justify
      -webkit-justify-content:space-between
      -ms-flex-pack:justify
      justify-content:space-between
      background:#FF4878
      padding:0
      overflow:auto
    .tab-head-item
      -webkit-box-flex:1
      -webkit-flex:1 0 auto
      -ms-flex:1 0 auto
      flex:1 0 auto
      color:white
      padding:0 5px
</style>
