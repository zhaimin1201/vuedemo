<template>
    <div>
      <header class="asset">
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
      <div class="assetcon">
        <div class="echarbox">
          <div class="echartile">
            <span class="echartspan">资产项目构成图</span>
          </div>
          <div class="echarcon" id="myChart"></div>
        </div>
      </div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
import {Echartcon} from '../../config/echartcon'
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
    }
  },
  created () {
    setTimeout(() => {
      this.init()
    }, 100)
  },
  methods: {
    init () {
      var myChart = this.$echarts.init(document.getElementById('myChart'))
      let option = {
        grid: {
          left: '2%',
          right: '2%',
          bottom: '1%',
          top:'3%',
          containLabel: false
        },
        xAxis: [{
          show: 'false',
          type: 'value',
          name: '低压（舒张压）',
          boundaryGap: false,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function () {
              return ''
            }
          },
          min: 50,
          "axisLine":{       //y轴
            "show":false

          }
        }],
        yAxis: [

          {
            type: 'value',
            nameLocation: 'end',
            show: 'false',
            splitLine: {
              show: false
            },
            axisLine: {       //y轴
              show: false

            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: function () {
                return ''
              }
            },
            min: 60

          }
        ],
        series: [
          {
            type: 'line',
            symbol: 'none',
            name: '正常高值',
            lineStyle: {
              normal: {
                width: 0,
                color: '#7cedc4'
              }
            },
            areaStyle: {
              normal: {
                color: '#087EE0'
              }
            },
            z: 9,
            data: [
              [0, 150],  //0, 7.5
              [90, 150]  //4.5, 7.5
            ]
          },
          {
            type: 'line',
            name: '危险',
            symbol: 'none',
            lineStyle: {
              normal: {
                width: 0,
                color: '#e21b1b'
              }
            },
            areaStyle: {
              normal: {
                color: '#C4D5FF'
              }
            },
            z: 1,
            data: [
              [0, 240],
              [120, 240]
            ]
          },
          {
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 36,
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,.0)',
                label: {
                  show: true,
                  formatter: function () {
                    var data2 = 80 + '%'
                    return data2
                  },
                  textStyle: {color: '#fff'}
                }
              }
            },
            z: 20,
            data: [
              [70, 108] // 2/7   5/27
            ]
          },
          {
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 36,
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,.0)',
                label: {
                  show: true,
                  formatter: function () {
                    var data2 = '89' + '%'
                    return data2
                  },
                  textStyle: {color: '#fff'}
                }
              }
            },
            z: 20,
            data: [
              // [70, 118],
              [105, 150]
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    showMsgFromChild (data) {
      console.log(data)
    },
    back () {
      this.$router.push('/histryreport')
    }
  },
  components: {
    'v-select': choselect
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .asset
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
  .assetcon
    min-height:100px
    background: #f5f5f7
    height: 100%
    position: absolute
    width: 100%
    .echarbox
      width: 90%
      height: 350px
      margin: auto
      background: white
      margin-top: 30px
      .echartile
        text-align: center
        color:#6088EB
        .echartspan
          background:url("../../images/11@2x.png")
          background-repeat:no-repeat
          background-size: 18px
          background-position: right
          display: inline-block
          width: 143px
          text-align: left
          margin-top: 19px
          margin-bottom: 24px
    .echarcon
        width: 80%
        height: 200px
        margin:auto
        margin-top: 20px
</style>
