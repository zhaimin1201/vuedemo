<template>
    <div>
      <select class="yearsele" v-if="yearshow"  @change="changeProduct($event)">
        <option value="" v-for="item in yeardata" :value="item.name">{{item.name}}</option>
      </select>
      <select class="yearsele monthsele" v-if="monthshow">
        <option value="" v-for="item in month">{{item}}</option>
      </select>
      <select class="yearsele season" v-if="seasonshow">
        <option value="" v-for="intem in season">{{intem}}</option>
      </select>
    </div>
</template>

<script>
export default {
  props: {
    monthshow: {
      type: Boolean,
      default: 'monthshow'
    },
    yearshow: {
      type: Boolean,
      default: 'yearshow'
    },
    seasonshow: {
      type: Boolean,
      default: 'seasonshow'
    }
  },
  data () {
    return {
      month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      yeardata: [
        {
          indexId: 1,
          name: '2018年'
        },
        {
          indexId: 2,
          name: '2017年'
        }
      ],
      season: ['第一季度', '第二季度', '第三季度', '第四季度'],
      value: '2018年'
    }
  },
  methods: {
    changeProduct (event) {
      this.value = event.target.value
      this.$emit('listenToChildEvent', this.value)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .yearsele
    border: none
    outline: none
    font-size: 17px
    color: #6793fe
    padding: 4px
    padding-bottom: 6px
    border-radius: 15px
    margin-left: 22px
    margin-top: 10px
    background: #ffffff
  .monthsele
    padding-left: 32px
    margin-left: 12px
  .season
    margin-left: 12px
</style>
