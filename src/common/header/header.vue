<template>
    <div>
      <header class="head-tab">
        <ul class="head-ul">
          <li class="head-li back-con"><span class="back" @click=" $router.back(-1)">返回</span></li>
          <li class="head-li" style="font-weight: 700; flex: 2" >
            {{this.title}}
          </li>
          <li class="head-li visimess">
            <span class="visispan" v-show="this.showspan">
              确定
            </span>
          </li>
        </ul>
      </header>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title'
    },
    showspan: {
      type: Boolean,
      default: 'showspan'
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mint.styl"
  .head-tab
    height: 51px
    line-height: 50px
    background: #ffffff
    color: #000000
    border-bottom:1px solid #E0E3E5
    .head-ul
      display:flex
      border-1px(#E0E3E5)
      .head-li
        flex:1
        font-size:16px
        text-align: center
      .back-con
        text-indent: 0.4rem
        text-align: left
      .back
        background:url("../../images/back.png")
        background-repeat:no-repeat
        background-size:25px
        text-indent: 29px
        display: inline-block
        background-position-y: 14px
        color: #4A78E8
      .visimess
        color:#4a78e8
        .visispan
          position: absolute
          right: 14px
</style>
