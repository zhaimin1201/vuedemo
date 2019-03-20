<template>
  <div>
    <div class="bigmain" id="myChart">
    </div>
    <img class="colose" src="../../images/15@2x.png" alt="" @click="chose()">
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
import {Echartcon} from '../../config/echartcon'
import Bus from '../../assets/evenBus'
export default {
  data () {
    return {
      option: {}
    }
  },
  created () {
    Bus.$on('option', (message) => {
      let optionm = JSON.stringify(message)
      sessionStorage.setItem('optionc', optionm)
    })
    setTimeout(() => {
     // this.init()
    }, 100)
  },
  methods: {
    init () {
      let option2 = sessionStorage.getItem('optionc')
      let option3
      if (typeof (option2) === 'string') {
        option3 = JSON.parse(option2)
        console.log(option3)
      }
      var myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption(option3)
    },
    chose () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .bigmain
    @media (max-width: 375px)
      height:375px
      width: 667px
    @media (max-width: 320px)
      height:320px
      width: 568px
    @media (height: 812px)
      height:375px
      width: 812px
    position: absolute
    width: 100vh
    height: 100vw
    top: 0;
    left: 100vw;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    transform-origin: 0% 0%;
  .colose
    position: fixed
    right: 3px
    bottom: 20px
    width: 30px
</style>
