<template>
  <div>
    <table class="stat_table" v-if="this.index === 0">
      <tr class="stat_tr">
        <td class="stat_td"><span class="stat_custor"></span>新签（万）</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td "><span class="stat_custor star_num"></span>续投（万）</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td"><span class="stat_custor star_add"></span>重复购买（万）</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td"><span class="stat_custor sum_add"></span>总计环比（%）</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
    </table>
    <table class="stat_table" v-if="this.index === 1">
      <tr class="stat_tr">
        <td class="stat_td"><span class="stat_custor sum_add"></span>续投率（%）</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td "><span class="stat_custor svg_num"></span>平均续投率（%）</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
    </table>
    <table class="stat_table" v-if="this.index === 2">
      <tr class="stat_tr">
        <td class="stat_td"><span class="stat_custor sum_add"></span>折标率（%）</td>
        <td class="stat_td stat_right">30265</td>
      </tr>
      <tr class="stat_tr">
        <td class="stat_td "><span class="stat_custor svg_num"></span>平均折标率（%）</td>
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
      .sum_add
        background: #087EE0
      .svg_num
        background: #8FBCFD
    .stat_right
      text-align: right
      color: #333333
      font-size:14px
</style>
