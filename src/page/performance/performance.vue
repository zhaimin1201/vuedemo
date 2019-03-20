<template>
    <div style="background: #ffffff">
      <header class="performace">
        <ul>
          <li class="back-con"><span class="back" @click="back()">返回</span></li>
          <li class="visodata" >
            <a class="visojr" @click="monthchose()" v-bind:class = "chosee==true ? 'vida':''"><span>月</span></a>
            <a class="visoby2" @click="seasonchose()" v-bind:class="clesee==true ? 'vida':''"><span>季</span></a>
            <a class="visoby" @click="nearchose()" v-bind:class="clesenear==true ? 'vida':''"><span>年</span></a>
          </li>
        </ul>
        <v-select
          v-on:listenToChildEvent="showMsgFromChild"
          :monthshow="monthshow"
          :yearshow="yearshow"
          :seasonshow="seasonshow"
        ></v-select>
      </header>
      <div class="reportcon">
        <mt-swipe :auto='0'  :continuous='false' class="reposwipte" @change="handleChange">
          <mt-swipe-item>
            <div class="reportile">
              <span class="report_span">业绩结构图</span>
              <span class="report_right">
                <img v-if="bigecharshow" src="../../images/12@2x.png" alt="" width="27px" @click="bigchar()">
              </span>
            </div>
            <div class="echarpic" id="myChart"></div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="reportile">
              <span class="report_span">业绩指标分析图</span>
              <span class="report_right">
                <img v-if="bigecharshow" src="../../images/12@2x.png" alt="" width="27px" @click="bigchar()">
              </span>
            </div>
            <div class="echarpic" id="myChart2"></div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="reportile">
              <span class="report_span">业绩指标分析图</span>
              <span class="report_right">
                <img v-if="bigecharshow" src="../../images/12@2x.png" alt="" width="27px" @click="bigchar()">
              </span>
            </div>
            <div class="echarpic" id="myChart3"></div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="reportile">
              <span class="report_span">指标雷达图</span>
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
      <div @click="compernay()" class="comptile">
        <span class="comptile_span1">上海银来资产管理有限公司</span>
        <span class="comptile_span2">
          <img :class="selejt==true? 'imgdown': ''" src="../../images/08@2x.png" width="6px">
        </span>
      </div>
      <div class="compernay" v-if="compershow">
        <scroller>
          <ul class="compernay_ul">
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
            <li class="compernay_li">
              <span class="compernay_span"></span>
              <span>汤臣分公司</span>
            </li>
          </ul>
        </scroller>
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
import {Echartcon} from '../../config/echartcon'
import { Swipe, SwipeItem } from 'mint-ui'
import Vue from 'vue'
import custable from '../../common/statable/custable'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
import choselect from '../../common/choseselect/choseselect'
export default {
  data () {
    return {
      chosee: true,
      clesee: false,
      clesenear: false,
      monthshow: true,
      seasonshow: false,
      yearshow: true,
      xAxidata: [],
      index: 0,
      seaxidata: ['2018/1季度', '2018/2季度', '2018/3季度', '2018/4季度'], //月
      nowcustor: [25, 15, 8, 18, 10], //新签(月)
      custorcount: [30, 30, 87, 30, 50], //续投 (月)
      repeat: [45, 40, 90, 60, 70],//重复购买
      seanowcustor: [9, 15, 8, 18],//新签(季)
      seacustorcount: [30, 30, 87, 20], //续投 (月)
      searepeat: [45, 40, 90, 60],//重复购买 (月）
      addnow: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2], //在投客户新增率 (月)
      sumadd: [3.0, 4.2, 8.3, 9.5, 6.3, 10.2, 40.3, 23.4, 2.0, 16.5, 1.0, 16],//客户整体新增率 (月)
      continued: [26, 33, 28, 31, 18],//续投率（月）
      avercontinued: [20, 25, 21, 23, 11], //平均续投率（月）
      nearxidata: ['2017年', '2018年'],
      nearnowcustor: [9, 15],//新签(年）
      nearcustorcount: [30, 30], //续投 (年）
      nearcontinued: [25, 28],
      nearavercont: [20,30],
      newarrepeat: [40, 40],//重复购买 (年）
      bigecharshow: true,//是否显示放大
      option1: {},
      bigcharshow: false,
      compershow: false,
      selejt: false
    }
  },
  created () {
    setTimeout(() => {
     this.init()
    }, 100)
  },
  components: {
    'v-select': choselect,
    'v-table': custable
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
      var cha = (data) => {
        this.option1 = data
        option2 = data
      }
      Echartcon.Columnar(this.xAxidata, this.nowcustor, this.custorcount, this.repeat, this.addnow, '', rotate, cha)
      myChart.setOption(option2)
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
      if (this.index === 0) {
        this.bigecharshow = true
        var myChart = this.$echarts.init(document.getElementById('myChart'))
        let option2
        let rotate = 0 //x 轴文字得倾斜度
        var cha = (data) => {
          this.option1 = data
          option2 = data
        }
        Echartcon.Columnar(this.xAxidata, this.nowcustor, this.custorcount, this.repeat, this.addnow, '', rotate, cha)
        myChart.setOption(option2)
      } else if (this.index === 1) {
        this.bigecharshow = false
        let rotate = 0 //x 轴文字得倾斜度
        let option
        var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        var cha = (data) => {
          this.option1 = data
          option = data
        }
        Echartcon.Circlechart(this.xAxidata, this.continued, this.avercontinued, rotate, cha)
        myChart2.setOption(option)
      } else if (this.index === 2) {
        this.bigecharshow = false
        let rotate = 0 //x 轴文字得倾斜度
        let option
        var myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        var cha2 = (data) => {
          this.option1 = data
          option = data
        }
        Echartcon.Circlechart(this.xAxidata, this.continued, this.avercontinued, rotate, cha2)
        myChart3.setOption(option)
      } else if (this.index === 3) {
        this.bigecharshow = false
        var myChart3 = this.$echarts.init(document.getElementById('myChart4'))
        var dataBJ = [
          [186,142,192,3.88,93,79,18],
          [57,31,54,0.96,32,14,19],
          [22,8,17,0.48,23,10,20],
          [39,15,36,0.61,29,13,21],
          [94,69,114,2.08,73,39,22],
          [99,73,110,2.43,76,48,23],
          [31,12,30,0.5,32,16,24],
          [42,27,43,1,53,22,25],
          [154,117,157,3.05,92,58,26]
        ]
        var lineStyle = {
          normal: {
            width: 1,
            opacity: 0.5
          }
        }
        let option = {
          legend: {
            bottom: 5,
            data: ['北京', '上海', '广州'],
            itemGap: 20,
            textStyle: {
              color: '#fff',
              fontSize: 14
            },
            selectedMode: 'single'
          },
          radar: {
            indicator: [
              {name: '人均产能', max: 200},
              {name: '续投率', max: 250},
              {name: '新客户增长', max: 300},
              {name: '离职率', max: 5},
              {name: '折标率', max:130}
            ],
            shape: 'circle',
            splitNumber: 5,
            name: {
              textStyle: {
                color: 'rgb(238, 197, 102)'
              }
            },
            splitLine: {
              lineStyle: {
                color: [
                  'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                  'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                  'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                ].reverse()
              }
            },
            splitArea: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(238, 197, 102, 0.5)'
              }
            }
          },
          series: [
            {
              // name: '北京',
              type: 'radar',
              lineStyle: lineStyle,
              data: dataBJ,
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#669AFF'
                }
              },
              areaStyle: {
                normal: {
                  // opacity: 0.1
                }
              }
            }
          ]
        }
        myChart3.setOption(option)
      }
    },
    seasonchose () {
      console.log(this.seaxidata)
      this.chosee = false
      this.clesee = true
      this.clesenear = false
      this.monthshow = false
      this.seasonshow = true
      let rotate = -20 //x 轴文字得倾斜度
      if (this.index === 0) {
        let option
        var myChart = this.$echarts.init(document.getElementById('myChart'))
        var cha = (data) => {
          console.log(cha)
          option = data
        }
        Echartcon.Columnar(this.seaxidata, this.seanowcustor, this.seacustorcount, this.searepeat, this.addnow, '', rotate, cha)
        myChart.setOption(option)
      } else if (this.index === 1) {
        let option
        var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        var cha2 = (data) => {
          option = data
        }
        Echartcon.Circlechart(this.seaxidata, this.continued, this.avercontinued, rotate, cha2)
        myChart2.setOption(option)
      } else if (this.index === 2) {
        let option
        var myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        var cha3 = (data) => {
          option = data
        }
        Echartcon.Circlechart(this.seaxidata, this.continued, this.avercontinued, rotate, cha3)
        myChart3.setOption(option)
      }
    },
    nearchose () {
      this.chosee = false
      this.clesee = false
      this.clesenear = true
      this.monthshow = false
      this.seasonshow = false
      let rotate = 0 //x 轴文字得倾斜度
      if (this.index === 0) {
        var myChart = this.$echarts.init(document.getElementById('myChart'))
        let option2
        var cha = function (data) {
          console.log(data)
          option2 = data
        }
        Echartcon.Columnar(this.nearxidata, this.nearnowcustor, this.nearcustorcount, this.newarrepeat, this.addnow, '', rotate, cha)
        myChart.setOption(option2)
      } else if (this.index === 1) {
        let rotate = 0 //x 轴文字得倾斜度
        let option
        var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        var cha = (data) => {
          option = data
        }
        Echartcon.Circlechart(this.nearxidata, this.nearcontinued, this.nearavercont, rotate, cha)
        myChart2.setOption(option)
      } else if (this.index === 2) {
        let rotate = 0 //x 轴文字得倾斜度
        let option
        var myChart3 = this.$echarts.init(document.getElementById('myChart3'))
        var cha = (data) => {
          option = data
        }
        Echartcon.Circlechart(this.nearxidata, this.nearcontinued, this.nearavercont, rotate, cha)
        myChart3.setOption(option)
      }
    },
    showMsgFromChild (data) {
      console.log(data)
      let data2 = data.slice(0, 4)
      let newvalue = []
      for (var i = 1; i <= 4; i++) {
        newvalue.unshift(data2 + '/' + i + '季度')
      }
      this.seaxidata = newvalue
      if (this.seasonshow === true) {
        this.seasonchose()
      }
    },
    bigchar () {
      this.bigcharshow = true
      var myChart = this.$echarts.init(document.getElementById('myChart5'))
      myChart.setOption(this.option1)
    },
    chose () {
      this.bigcharshow = false
    },
    back () {
      this.$router.push('/histryreport')
    },
    compernay () {
      this.compershow = !this.compershow
      this.selejt = !this.selejt
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  html,body
    background: #f5f5f7
  .performace
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
    padding-top: 26px
    min-height:100px
    background: #f5f5f7
    margin-bottom: 18px
    height: 100%
    /*position: absolute*/
    width: 100%
    .reportile
      margin-top: 21px
      text-align: center
      background: #fff
      padding-top: 26px
      width: 90%
      margin: auto
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
      height: 443px
      border-1px(#ebebeb)
      .echarpic
        max-width: 500px
        margin: auto
        height: 358px
        background: #ffffff
        width: 90%
    .statistics
      background: #f5f5f7
  .comptile
    display: flex
    width: 90%
    margin: auto
    margin-bottom: 18px
    .comptile_span1
     flex: 3
    .comptile_span2
      flex: 1
      text-align: right
      .imgdown
        transform:rotate(90deg)
  .compernay
    height: 121px
    width: 90%
    position: absolute
    left: 0
    right: 0
    margin: auto
    .compernay_ul
      width: 95%
      margin: auto
      display: flex
      flex-direction: row
      flex-wrap: wrap
      .compernay_li
        width: 62px
        font-size: 12px
        margin-left: 13px
        text-align: center
        /*float: left*/
        margin-top: 12px
        color: #9b9a9a
        @media (width:414px)
          margin-left: 20px
        @media (width:411px)
          margin-left: 20px
        @media (width:320px)
          margin-left: 20px
        .compernay_span
          background: #DCDEDD
          display: block
          width: 25px
          height: 25px
          border-radius: 50%
          margin: auto
          margin-bottom: 3px
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
</style>
