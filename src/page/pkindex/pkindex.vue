<template>
    <div class="visichose">
      <header>
        <ul>
          <li class="back-con">
            <span class="back" @click="back()">返回</span>
          </li>
          <li>选择PC指标</li>
          <li class="visimess" >
            取消
          </li>
        </ul>
      </header>
      <div class="vitit" >请选择PK指标</div>
      <div class="pkindex_con1">
        <div class="content1">
          <span class="content1_icon">1</span> 客户指标
        </div>
      </div>
      <table class="contable">
        <tr>
          <td>
            <a class="butn">客户总数<span class="butncire"> ✓</span></a>
          </td>
          <td>
            <a class="butn">在投客户数</a>
          </td>
          <td>
            <a class="butn">新增客户数</a>
          </td>
        </tr>
        <tr>
          <td><a class="butn">客户新增率</a></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <div class="pkindex_con1">
        <div class="content1">
          <span class="content1_icon">1</span> 客户指标
        </div>
      </div>
      <table class="contable">
        <tr>
          <td>
            <a class="butn">规模业绩总量<span class="butncire"> ✓</span></a>
          </td>
          <td>
            <a class="butn">在投客户数</a>
          </td>
          <td>
            <a class="butn">新增客户数</a>
          </td>
        </tr>
        <tr>
          <td><a class="butn">客户新增率</a></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <div class="visnext"  @click="buttpk()">开始PK</div>
    </div>
</template>

<script>
export default {
  methods: {
    buttpk () {
      this.$router.push('/pkresult')
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

    .vitit
      color: #808FEC
      background: #F7F9F8
      font-size:12px
      height:30px
      line-height: 30px
      text-indent: 20px
    .pkindex_con1
      border-1px(#EDEFEE)
      width: 100%
      margin: auto
      .content1
        padding-top: 8px
        padding-bottom: 8px
        width: 90%
        margin:auto
        .content1_icon
          display: inline-block
          width: 3px
          height: 15px
          line-height: 14px
          background: #4b76f8
          color: white
          text-indent: 3px

    .contable
      text-align: center
      margin: auto
      margin-top: 3px
      margin-top: 20px
      width: 100%
      tr
        height: 49px
        td
          .butn
            width: 99px
            height: 28px
            line-height: 28px
            display: inline-block
            border-radius: 15px
            background: #fff
            border: 1px solid #626262   //#669DFD
            color: #626262
            position: relative
            font-size: 14px
            .butncire
              border-radius: 50%
              width: 16px
              height: 16px
              line-height: 16px
              font-size: 12px
              color: white
              position: absolute
              top: -7px
              right: 2px
              background: #679DFF
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
