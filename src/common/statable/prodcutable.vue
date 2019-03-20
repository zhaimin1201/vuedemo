<template>
    <div>
      <table class="stat_table" v-if="this.index === 0">
        <tr class="stat_tr">
          <td class="stat_td"><span class="stat_custor"></span>按月分配（单数）</td>
          <td class="stat_td stat_right">30265</td>
        </tr>
        <tr class="stat_tr">
          <td class="stat_td "><span class="stat_custor star_num"></span>半年分配（单数）</td>
          <td class="stat_td stat_right">30265</td>
        </tr>
        <tr class="stat_tr">
          <td class="stat_td"><span class="stat_custor sum_add"></span>到期分配（单数）</td>
          <td class="stat_td stat_right">30265</td>
        </tr>
      </table>
      <table class="stat_table" v-if="this.index === 1">
        <tr class="stat_tr">
          <td class="stat_td"><span class="stat_custor sum_add"></span>3个月</td>
          <td class="stat_td stat_right">30265</td>
        </tr>
        <tr class="stat_tr">
          <td class="stat_td "><span class="stat_custor"></span>6个月</td>
          <td class="stat_td stat_right">30265</td>
        </tr>
        <tr class="stat_tr">
          <td class="stat_td"><span class="stat_custor star_year"></span>24个月</td>
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
        background: #79ADF9
        display: inline-block
        width: 9px
        height: 9px
        margin-right: 11px
      .star_num
        background: #087EE0
      .star_year
        background: #077FDE
      .sum_add
        background: #C4D5FF
    .stat_right
      text-align: right
      color: #333333
      font-size:14px
</style>
