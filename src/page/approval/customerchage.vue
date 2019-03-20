<template>
    <div>
      <v-header :title="title" :showspan="showright"></v-header>
      <scroller class="approgo_scroller">
        <!-- @click.native="putmeass('v1')"-->
        <mt-cell class="ediname" title="选择客户" @click.native="chosecouster('v1')" is-link>
          <span class="edinamespan"></span>
        </mt-cell>
        <mt-cell class="ediname" title="原客户经理">
          <span class="edinamespan">客户姓名</span>
        </mt-cell>
        <mt-cell class="ediname" title="新客户经理">
          <span class="edinamespan"></span>
        </mt-cell>
        <mt-cell class="ediname" title="备注">
          <span class="edinamespan"></span>
        </mt-cell>
      </scroller>
    </div>
</template>

<script>
import header from '../../common/header/header'
export default {
  data () {
    return {
      title: '客户归属变更审批',
      showspan: true,
      showright: true,
      // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
      phoneVisible: false,
      imgurl: '',
      imgshow: false,
      startDate: new Date(),
      dateTime: ''
    }
  },
  components: {
    'v-header': header
  },
  methods: {
    chosecouster () {
      this.$router.push('/chosecustomer')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .approgo_scroller
    background: #ecf0f8
    margin-top:51px
    .ediname
      color: #777
      margin-top: 12px
      font-weight: bold
</style>
