<template>
  <div>
    <table class="stat_table" v-if="this.index === 0">
      <tr class="stat_tr">
        <td class="stat_td"><span class="stat_custor"></span>客户总数</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td "><span class="stat_custor star_num"></span>在投客户数</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td"><span class="stat_custor star_add"></span>在投客户增长环比</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
    </table>
    <table class="stat_table" v-if="this.index === 1">
      <tr class="stat_tr">
        <td class="stat_td"><span class="stat_custor stat2_custor"></span>新增客户量</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td "><span class="stat_custor star2_num"></span>客户整体新增率</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td"><span class="stat_custor star_add"></span>客户新增环比（%）</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
    </table>
    <table class="stat_table" v-if="this.index === 2">
      <tr class="stat_tr">
        <td class="stat_td"><span class="stat_custor stat2_custor"></span>普通客户</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td "><span class="stat_custor star2_num"></span>VIP客户</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td "><span class="stat_custor star3_num"></span>SVIP客户</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td"><span class="stat_custor star_add"></span>尊享客户</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
    </table>
    <table class="stat_table" v-if="this.index === 3">
      <tr class="stat_tr">
        <td class="stat_td"><span class="stat_custor stat2_custor"></span>年轻 (%)</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td "><span class="stat_custor star2_num"></span>青年 (%)</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td "><span class="stat_custor star3_num"></span>中年 (%)</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td"><span class="stat_custor star_add"></span>老年 (%)</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 'index'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .stat_table
    margin:auto
    width: 76%
    margin-top: 33px
    font-size: 12px
    color: #9b9a9a
    .stat_td
      padding-bottom: 26px
      .stat_custor
        background: #C4D5FF
        display: inline-block
        width: 9px
        height: 9px
        margin-right: 11px
      .stat2_custor
        background: #739CF9
      .star2_num
        background: #CCDBFE
      .star3_num
        background: #034F83
      .star_num
        background: #6BA7FF
      .star_add
        background: #077FE0
    .stat_right
      text-align: right
      color: #333333
      font-size:14px
</style>
