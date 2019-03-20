<template>
    <div>
      <header class="cusreport">
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
      <div class="producon">
        <mt-swipe :auto='0'  :continuous='false' class="reposwipte" @change="handleChange">
          <mt-swipe-item class="mtswip">
            <div class="reportile">
              <span class="report_span">产品分配方式构成图</span>
              <span class="report_right">
                <!--<img v-if="bigecharshow" src="../../images/12@2x.png" alt="" width="27px" @click="bigchar()">-->
              </span>
            </div>
            <div class="echarpic" id="myChart"></div>
          </mt-swipe-item>
          <mt-swipe-item class="mtswip">
            <div class="reportile">
              <span class="report_span">产品期限构成图</span>
              <span class="report_right">
                <!--<img v-if="bigecharshow" src="../../images/12@2x.png" alt="" width="27px" @click="bigchar()">-->
              </span>
            </div>
            <div class="echarpic" id="myChart2"></div>
          </mt-swipe-item>
        </mt-swipe>
        <div class="statistics">
          <v-table :index="index"></v-table>
        </div>
      </div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
import prodcutable from '../../common/statable/prodcutable'
import {Echartcon} from '../../config/echartcon'
import choselect from '../../common/choseselect/choseselect'
import {Swipe, SwipeItem } from 'mint-ui'
import Vue from 'vue'
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
      index: 0
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
      let option
      let data = [
        {
          value: 57,
          name: '半年分配',
          itemStyle: {
            normal: {
              color: '#087EE0',
              label: {
                show: true,
                formatter: '{c}%',
                textStyle: {color: '#fff'}
              }
            }
          }
        },
        {
          value: 14,
          name: '按月分配',
          itemStyle: {
            normal: {
              color: '#79ADF9',
              label: {
                show: true,
                formatter: '{c}%',
                textStyle: {color: '#fff'}
              }
            }
          }
        },
        {
          value: 29,
          name: '到期分配',
          itemStyle: {
            normal: {
              color: '#C4D5FF',
              label: {
                show: true,
                formatter: '{c}%',
                textStyle: {color: '#fff'}
              }
            }
          }
        }]
      let a = 0
      for (let i = 0; i < data.length; i++) {
        a += data[i].value
      }
      data.push({value: a, name: '__other', itemStyle: {normal: {color: 'rgba(0,0,0,.0)'}}})
      var cha = function (data) {
        console.log(data)
        option = data
      }
      Echartcon.Semicircle(data, cha)
      myChart.setOption(option)
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
    showMsgFromChild (data) {
      console.log(data)
    },
    monthchose () {
      if (this.index === 0) {
        var myChart = this.$echarts.init(document.getElementById('myChart'))
        let option
        let data = [
          {
            value: 57,
            name: '半年分配',
            itemStyle: {
              normal: {
                color: '#087EE0',
                label: {
                  show: true,
                  formatter: '{c}%',
                  textStyle: {color: '#fff'}
                }
              }
            }
          },
          {
            value: 14,
            name: '按月分配',
            itemStyle: {
              normal: {
                color: '#79ADF9',
                label: {
                  show: true,
                  formatter: '{c}%',
                  textStyle: {color: '#fff'}
                }
              }
            }
          },
          {
            value: 29,
            name: '到期分配',
            itemStyle: {
              normal: {
                color: '#C4D5FF',
                label: {
                  show: true,
                  formatter: '{c}%',
                  textStyle: {color: '#fff'}
                }
              }
            }
          }]
        let a = 0
        for (let i = 0; i < data.length; i++) {
          a += data[i].value
        }
        data.push({value: a, name: '__other', itemStyle: {normal: {color: 'rgba(0,0,0,.0)'}}})
        var cha = function (data) {
          console.log(data)
          option = data
        }
        Echartcon.Semicircle(data, cha)
        myChart.setOption(option)
      } else if (this.index === 1) {
        let option
        var myChart = this.$echarts.init(document.getElementById('myChart2'))
        let data = [
          {
            value: 76.92,
            name: '24个月',
            itemStyle: {
              normal: {
                color: '#087EE0',
                label: {
                  show: true,
                  formatter: '{c}%',
                  textStyle: {color: '#fff'}
                }
              }
            }
          },
          {
            value: 15.39,
            name: '6个月',
            itemStyle: {
              normal: {
                color: '#79ADF9',
                label: {
                  show: true,
                  formatter: '{c}%',
                  textStyle: {color: '#fff'}
                }
              }
            }
          },
          {
            value: 7.69,
            name: '3个月',
            itemStyle: {
              normal: {
                color: '#C4D5FF',
                label: {
                  show: true,
                  formatter: '{c}%',
                  textStyle: {color: '#fff'}
                }
              }
            }
          }
        ]
        var cha = (data) => {
          console.log(data)
          option = data
        }
        Echartcon.Ring(data, cha)
        myChart.setOption(option)
      }
    },
    back () {
      this.$router.push('/histryreport')
    }
  },
  components: {
    'v-select': choselect,
    'v-table': prodcutable
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
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
        line-height: 51px
  .producon
    min-height:100px
    background: #f5f5f7
    height: 100%
    position: absolute
    width: 100%
    .reposwipte
      height: 451px
      border-1px(#ebebeb)
      .mtswip
        height: 368px
        width: 92%
        margin: auto
        left: 4%
        background: #fff
        margin-top: 15px
        .reportile
          margin-top: 21px
          text-align: center
          background: #fff
          padding-top: 26px
          width: 90%
          margin: auto
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
      .echarpic
        max-width: 500px
        margin: auto
        height: 316px
    .statistics
      background: #f5f5f7
</style>
