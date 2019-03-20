<template>
    <div style="background: #ffffff">
      <header class="cusreport">
        <ul>
          <li class="back-con"><span class="back" @click="back()">返回</span></li>
          <li class="visodata" >
            <a class="visojr" @click="monthchose()" v-bind:class = "chosee==true ? 'vida':''"><span>月</span></a>
            <a class="visoby2" @click="seasonchose()" v-bind:class="clesee==true ? 'vida':''"><span>季</span></a>
            <a class="visoby" @click="nearchose()" v-bind:class="clesenear==true ? 'vida':''"><span>年</span></a>
          </li>
        </ul>
        <select class="yearsele" v-if="yearshow"  @change="changeProduct($event)">
          <option value="" v-for="item in yeardata" :value="item.name">{{item.name}}</option>
        </select>
        <select class="yearsele monthsele" v-if="monthshow">
          <option value="" v-for="item in month">{{item}}</option>
        </select>
        <select class="yearsele season" v-if="seasonshow">
          <option value="" v-for="intem in season">{{intem}}</option>
        </select>
      </header>
      <div class="reportcon">
        <mt-swipe :auto='0'  :continuous='false' class="reposwipte" @change="handleChange">
          <mt-swipe-item>
            <div class="reportile">
              <span class="report_span">客户统计图</span>
              <span class="report_right">
                <img v-if="bigecharshow" src="../../images/12@2x.png" alt="" width="27px" @click="bigchar()">
              </span>
            </div>
            <div class="echarpic" id="myChart"></div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="reportile">
              <span class="report_span">新增客户量</span>
              <span class="report_right">
                <img v-if="bigecharshow" src="../../images/12@2x.png" alt="" width="27px" @click="bigchar()">
              </span>
            </div>
            <div class="echarpic" id="myChart2"></div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="reportile">
              <span class="report_span">在投客户等级明细图</span>
              <span class="report_right">
                <img v-if="bigecharshow" src="../../images/12@2x.png" alt="" width="27px" @click="bigchar()">
              </span>
            </div>
            <div class="echarpic" id="myChart3"></div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="reportile">
              <span class="report_span">在投客户年龄分布图</span>
              <span class="report_right">
                <img v-if="bigecharshow" src="../../images/12@2x.png" alt="" width="27px" @click="bigchar()">
              </span>
            </div>
            <div class="echarpic" id="myChart4"></div>
          </mt-swipe-item>
        </mt-swipe>
        <div class="statistics">
          <v-table :index="index"></v-table>
        </div>
      </div>
      <div class="myCharpop" v-show="bigcharshow">
        <div class="bigmain" id="myChart5">
        </div>
        <img class="colose" src="../../images/15@2x.png" alt="" @click="chose()">
      </div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
import vtable from '../../common/statable/statable'
import { Swipe, SwipeItem } from 'mint-ui'
import {Echartcon} from '../../config/echartcon'
import Vue from 'vue'
import Bus from '../../assets/evenBus'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
  data () {
    return {
      chosee: true,
      clesee: false,
      clesenear: false,
      monthshow: true,
      seasonshow: false,
      yearshow: true,
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
      xAxidata: [],
      index: 0,
      value: '2018年',
      nowcustor: [9, 15, 8, 18, 10], //在投客户(月)
      custorcount: [30, 30, 87, 30, 50], //客户总数 (月)
      addnow: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2], //在投客户新增率 (月)
      sumadd: [3.0, 4.2, 8.3, 9.5, 6.3, 10.2, 40.3, 23.4, 2.0, 16.5, 1.0, 16],//客户整体新增率 (月)
      addpeople: [9, 15, 8, 18, 10],//新增客户量 (月)
      agecount: [
        {
          data: 50,
          name: '老年',
          color: '#087EE0'
        },
        {
          data: 25,
          name: '青年',
          color: '#79ADF9'
        },
        {
          data: 13,
          name: '年轻',
          color: '#C4D5FF'
        },
        {
          data: 12,
          name: '中年',
          color: '#034F83'
        }
      ], //(月)
      seaxidata: ['2018/1季度', '2018/2季度', '2018/3季度', '2018/4季度'], //月
      seanowcustor: [9, 15, 8,18],//在投客户(季)
      seacustorcount: [30, 30, 87,20], //客户总数 (月)
      nearxidata: ['2017年', '2018年'],
      nearnowcustor: [9, 15],//在投客户(季)
      nearcustorcount: [30, 30], //客户总数 (月)
      bigecharshow: true,//是否显示放大
      option1: {},
      bigcharshow: false
    }
  },
  created () {
    setTimeout(() => {
      this.init()
      // this.test()
    }, 100)
  },
  beforeDestroy () {
    console.log(this.option1)
    Bus.$emit('option', this.option1)
    // if (this.monthshow === true) {
    //   if (this.index === 0) {
    //     Bus.$emit('option', this.option1)
    //   } else if (this.index === 1) {
    //     Bus.$emit('option', this.option1)
    //   }
    // } else if (this.seasonshow === false && this.monthshow === false) {
    //   if (this.index === 0) {
    //     Bus.$emit('option', this.option1)
    //   } else if (this.index === 1) {
    //     Bus.$emit('option', this.option1)
    //   }
    // }
  },
  methods: {
    init () {
      var myChart = this.$echarts.init(document.getElementById('myChart'))
      //获取月份
      let data = new Date()
      let month = data.getMonth() + 1
      let option2
      let rotate = 0 //x 轴文字得倾斜度
      for (var i = month; i > month - 5; i--) {
        let data = i + '月'
        this.xAxidata.unshift(data)
        console.log(this.xAxidata)
      }
      var cha = function (data) {
        option2 = data
      }
      Echartcon.Columnar(this.xAxidata, this.nowcustor, this.custorcount, '', this.addnow, '', rotate, cha)
      myChart.setOption(option2)
      this.option1 = option2
      console.log(this.option1)
    },
    back () {
      this.$router.push('/histryreport')
      // this.option1 = [123]
      // console.log(this.option1)
    },
    changeProduct (event) {
      console.log(event.target.value)
      this.value = event.target.value
      let newvalue = []
      for (var i = 1; i <= 4; i++) {
        newvalue.unshift(this.value + '/' + i + '季度')
      }
      this.seaxidata = newvalue
      console.log(newvalue)
      if (this.seasonshow === true) {
        this.seasonchose()
      }
    },
    handleChange (index) {
      this.index = index
      if (this.monthshow === true) {
        this.monthchose()
      } else if (this.seasonshow === true) {
        this.seasonchose()
      } else if (this.seasonshow === false && this.monthshow === false) {
        this.nearchose()
      }
    },
    monthchose () {
      this.chosee = true
      this.clesee = false
      this.clesenear = false
      this.monthshow = true
      this.seasonshow = false
      let rotate = 0
      if (this.index === 0) {
        this.bigecharshow = true
        var myChart = this.$echarts.init(document.getElementById('myChart'))
        let option
        var cha = (data) => {
          this.option1 = data
          option = data
        }
        Echartcon.Columnar(this.xAxidata, this.nowcustor, this.custorcount, '', this.addnow, '', rotate, cha)
        myChart.setOption(option)
      } else if (this.index === 1) {
        this.bigecharshow = true
        let option2
        let rotate = 0  //x 轴文字得倾斜度
        var myChart = this.$echarts.init(document.getElementById('myChart2'))
        var cha = (data) => {
          option2 = data
          this.option1 = data
        }
        Echartcon.Columnar(this.xAxidata, this.addpeople, '', '', this.addnow, this.sumadd, rotate, cha)
        myChart.setOption(option2)
      } else if (this.index === 2) {
        this.bigecharshow = false
        var myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        let option3
        var cha2 = function (data) {
          console.log(data)
          option3 = data
        }
        Echartcon.Piechart(this.agecount, cha2)
        myChart3.setOption(option3)
      } else if (this.index === 3) {
        this.bigecharshow = false
        var myChart4 = this.$echarts.init(document.getElementById('myChart4'))
        let option4
        var cha3 = function (data) {
          console.log(data)
          option4 = data
        }
        Echartcon.Piechart(this.agecount, cha3)
        myChart4.setOption(option4)
      }
    },
    seasonchose (index) {
      this.chosee = false
      this.clesee = true
      this.clesenear = false
      this.monthshow = false
      this.seasonshow = true
      let rotate = -20 //x 轴文字得倾斜度
      if (this.index === 0) {
        this.bigecharshow = true
        let option
        var myChart = this.$echarts.init(document.getElementById('myChart'))
        var cha = (data) => {
          option = data
          this.option1 = data
        }
        Echartcon.Columnar(this.seaxidata, this.seanowcustor, this.seacustorcount, '', this.addnow, '', rotate, cha)
        myChart.setOption(option)
      } else if (this.index === 1) {
        this.bigecharshow = true
        let option2
        var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        var cha2 = (data) => {
          option2 = data
          this.option1 = data
        }
        Echartcon.Columnar(this.seaxidata, this.seanowcustor, this.seacustorcount, '', this.addnow, this.sumadd, rotate, cha2)
        myChart2.setOption(option2)
      } else if (this.index === 2) {
        this.bigecharshow = false
        var myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        let option3
        var cha2 = (data) => {
          option3 = data
        }
        Echartcon.Piechart(this.agecount, cha2)
        myChart3.setOption(option3)
      } else if (this.index === 3) {
        this.bigecharshow = false
        var myChart4 = this.$echarts.init(document.getElementById('myChart4'))
        let option4
        var cha3 = (data) => {
          option4 = data
        }
        Echartcon.Piechart(this.agecount, cha3)
        myChart4.setOption(option4)
      }
    },
    nearchose () {
      this.chosee = false
      this.clesee = false
      this.clesenear = true
      this.monthshow = false
      this.seasonshow = false
      let rotate = 0
      if (this.index === 0) {
        this.bigecharshow = true
        let option
        var myChart = this.$echarts.init(document.getElementById('myChart'))
        var cha = (data) => {
          option = data
          this.option1 = data
        }
        Echartcon.Columnar(this.nearxidata, this.nearnowcustor, this.nearcustorcount, '', this.addnow, '', rotate, cha)
        myChart.setOption(option)
      } else if (this.index === 1) {
        this.bigecharshow = true
        let option2
        var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        var cha2 = (data) => {
          option2 = data
          this.option1 = data
        }
        Echartcon.Columnar(this.nearxidata, this.nearnowcustor, this.nearcustorcount, '', this.addnow, this.sumadd, rotate, cha2)
        myChart2.setOption(option2)
      } else if (this.index === 2) {
        this.bigecharshow = false
        var myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        let option3
        var cha2 = (data) => {
          option3 = data
        }
        Echartcon.Piechart(this.agecount, cha2)
        myChart3.setOption(option3)
      } else if (this.index === 3) {
        this.bigecharshow = false
        var myChart4 = this.$echarts.init(document.getElementById('myChart4'))
        let option4
        var cha3 = (data) => {
          option4 = data
        }
        Echartcon.Piechart(this.agecount, cha3)
        myChart4.setOption(option4)
      }
    },
    bigchar () {
      //this.$router.push('/bigechart')
      // this.$router.push('/bigechart')
      this.bigcharshow = true
      var myChart = this.$echarts.init(document.getElementById('myChart5'))
      myChart.setOption(this.option1)
    },
    chose () {
      this.bigcharshow = false
    }
  },
  components: {
    'v-table': vtable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  body
    background: #f5f5f7
  .cusreport
    height: 108px
    line-height: 44px
    margin-bottom: 4px
    background: #F5F5F7
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
      .visodata
        font-size:0
        text-align: left
        flex: 3
        margin-left: 6px
        margin-top: 10px
        a
          font-size 15px
          display:inline-block
          border:1px solid
          height:28px
          line-height:28px
          width:64px
          color:#6793FE
          text-align: center
        .visojr
          border-radius:8px 0px 0px 8px
        .visoby
          border-radius: 0px 8px 8px 0px
          border-left: none
        .visoby2
          border-left:none
        .vida
          background: #6392FE
          span
            color:#ffffff
      .back
        color: #000
        background:url("../../images/backh.png")
        background-repeat:no-repeat
        background-size:25px
        text-indent: 29px
        display: inline-block
        background-position-y: 14px
        line-height: 51px;
    .yearsele
      background: #ffffff
      border: none
      outline: none
      font-size: 17px
      color: #6793fe
      padding: 4px
      padding-bottom: 6px
      border-radius: 15px
      margin-left: 22px
      margin-top: 10px
    .monthsele
      padding-left: 32px
      margin-left: 12px
    .season
      margin-left: 12px
  .reportcon
    min-height:100px
    background: #f5f5f7
    height: 100%
    position: absolute
    width: 100%
    .reportile
      margin-top: 21px
      text-align: center
      background: #fff
      padding-top: 26px
      width: 90%
      margin: auto
      margin-top: 14px
      /*padding-bottom: 20px*/
    .report_span
        color: #4A78E9
        background: url("../../images/11@2x.png")
        background-repeat: no-repeat
        background-size: 20px
        background-position: right
        display: inline-block
        text-align: left
        height: 22px
        line-height: 22px
        padding-right: 27px
      .report_right
        position: absolute
        right: 38px
    .reposwipte
      height: 446px
      border-1px(#ebebeb)
      .echarpic
        max-width: 500px
        margin: auto
        height: 350px
        width: 90%
        background: #ffffff
  .statistics
    background: #f5f5f7
  .myCharpop
    position: fixed
    width: 100%
    height: 100%
    top: 0
    background: #fff
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
  .mint-swipe-indicator
    width: 8px
    height: 8px
    display: inline-block
    border-radius: 100%
    background: #fff !important
    margin: 0 3px
    border: 1px solid #5E71EA !important
  .mint-swipe-indicator.is-active
    background: #5E71EA
</style>
