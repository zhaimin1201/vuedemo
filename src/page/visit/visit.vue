<template>
    <div class="visi">
      <div class="visicon">
        <header class="vihead-tab">
          <ul>
            <li class="back-con"><span class="back" @click="back()">返回</span></li>
            <li class="visodata" >
              <a class="visojr" @click="datechose()" v-bind:class = "chosee==true ? 'vida':''"><span>本日</span></a>
              <a class="visoby" @click="clechose()" v-bind:class="clesee==true ? 'vida':''"><span>本月</span></a>
            </li>
            <li class="visimess visithistory" >
              <span class="visithispan" @click="visihistory()">...</span>
            </li>
          </ul>
        </header>
        <div class="visi_tit">
          <div class="tit_ico">
          </div>
          <div class="tit_yj">
            <span @click="performan()">{{this.perforname}} &nbsp; (万元)</span>
          </div>
          <div class="visi_tit">
            <span class="image-com" @click="ranking()"><i class="visihg image-com"></i>查看排名</span>
          </div>
        </div>
        <div class="visi_num">{{this.interestRateTest}}<mt-spinner v-show="this.wait" type="fading-circle"></mt-spinner></div>
        <div class="visi_time">数据统计截止至&nbsp;{{this.now}}</div>
        <div class="visi_sp">
          <ul class="">
            <li>
              <span class="my_num">{{this.customerGrowthNum}}<mt-spinner v-show="this.wait" type="fading-circle"></mt-spinner></span>
              <span class="my-uu">新客增长</span>
            </li>
            <div class="myline"></div>
            <li>
              <span class="my_num">{{this.markingRateText}}<mt-spinner v-show="this.wait" type="fading-circle"></mt-spinner></span>
              <span class="my-uu">续投率(%)</span>
            </li>
            <div class="myline"></div>
            <li>
              <!--<span class="my_num">{{this.markinRrate}}<mt-spinner type="fading-circle"></mt-spinner></span>-->
              <span class="my_num">{{this.markinRrate}}<mt-spinner v-show="this.wait" type="fading-circle"></mt-spinner></span>
              <span class="my-uu">折标率(%)</span>
            </li>
          </ul>
        </div>
        <div class="char_title">
          <ul>
            <li v-for="item in charlist" :key="item.name">
              <span :class="{active : active == item.name}" @click="selected(item.name)">{{item.name}}</span>
            </li>
          </ul>
          <div>
            <i></i>
            <span>最近七天趋势图</span>
          </div>
        </div>
        <!--图表-->
        <div class="echa">
          <div class="echar_con" id="myChart"></div>
        </div>
        <div class="description">
          <p class="description_tit">数据显示规则</p>
          <p class="description_p1 description_pt">报表功能：</p>
          <p class="description_p1 description_p2">
            此版本报表的目标是取代原手工日报表，向各层级管理者实时提供预期数据支持。以在MIS/银来助手中成功提交为起点，如后期因各种原因产生异常，报表数据以相关流程节点的有效触发而发生改变。全维度多区间等其他拓展性数据功能通过后续版本迭代实现，相关更新以公告为准。
          </p>
          <p class="description_p1 description_pt">数据范围：</p>
          <p class="description_p1 description_p2">此版本含银来资产、银来基金普惠业绩数据，暂时不含基金数据，相关更新以公告为准</p>
          <p class="description_p1 description_pt">数据时效：</p>
          <p class="description_p1 description_p2">实时性。以提交为起点，一经成功提交即体现在报表相关数据上，包含业务流程中除作废之外的所有状态。</p>
          <p class="description_p1 description_pt">数据计入：</p>
          <p class="description_p1 description_p2">本日/月订单数据以员工自行录入系统的数据为准（订单一经提交则计入数据），若当日未及时录入的订单数据延后几天录入的可在最近七日趋势图中查看。</p>
          <p class="description_p1 description_pt">特殊状态订单：</p>
          <p class="description_p1 description_p2">订单一经作废等特殊情况下，数据会实时刷新显示。</p>
          <p class="description_p1 description_pt">数据计算规则：</p>
          <p class="description_p1 description_p2">年化业绩=规模业绩*期限/12；<br/>
            折标率=年化业绩/规模业绩；<br/>
            当期续投率=当期续投单数/当期到期单数；<br/>
            当期无到期单子时，续投率数据显示为——；<br/>当期有到期单但无续投时，续投率数据显示为0；<br/>
            当期人均产能=当期规模业绩/当期在职业务人员
          </p>
          <p class="description_p1 description_pt">业绩排名：</p>
          <p class="description_p1 description_p2">排名分为四种类型<br/>
            每日的年化业绩排名 <br/>
            每日的规模业绩排名 <br/>
            每月的年化业绩排名 <br/>
            每月的规模业绩排名
          </p>
          <p class="description_p1 description_pt">排名名次：</p>
          <p class="description_p1 description_p2">
            个人的排名显示业绩前30名；<br/>
            团队的排名显示业绩前10名。<br/>
            业绩相同的以姓名的首字母排序为主<br/>
          </p>
          <p class="escription_pt">&nbsp;</p>
        </div>
      </div>
      <div class="popshow" v-if="popupShow" @click="tohistryreport()">
        <router-link to="/histryreport">
          <div class="showmain">
            <p class="showmain_b image-com">查看历史报表</p>
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
import Vue from 'vue'
import {Indicator, Popup} from 'mint-ui'
import {Global} from '../../config/golobal'
import {InterFace} from '../../config/userapi'
import {Spinner} from 'mint-ui'
Vue.component(Spinner.name, Spinner)
Vue.component(Popup.name, Popup)
export default {
  data () {
    return {
      echary: ' 金额 (万元)',
      charlist: [
        {
          name: '规模业绩'
        },
        {
          name: '年化业绩'
        },
        {
          name: '新客增长'
        },
        {
          name: '续投率'
        },
        {
          name: '折标率'
        }
      ],
      chart:  "",
      cod: "",
      now: "",
      params: 0,
      active: '规模业绩',
      chosee: true,
      weektime: [],//最近七天的日期
      investmentnum: [0, 0, 0, 0, 0, 0, 0],//最近七天规模业绩数据
      option: {},
      nowtime: '',//个人当天当日数据统计截止时间
      interestRateTest: '',//个人当天年化业绩 or 规模业绩
      intersYear: '',//个人当天年化业绩
      scaleYear: '',//个人当天规模业绩
      choseper: true,
      clesee: false,
      perforname: '规模业绩',
      markinRrate: '',//个人当天折标率
      markingRateText: '',//个人当天续投率
      customerGrowthNum: '',//个人当天新客增长
      wait: true,
      interface: {
        scallinter: InterFace.scallinter,//个人当天规模业绩，年化业绩，折标率
        investmenter: InterFace.investmenter,//个人当天续投率
        newrater: InterFace.newrater,//个人当天新客增长
        scallinter2: InterFace.scallinter2,//个人当月规模业绩，年化业绩，折标率
        investmenter2: InterFace.investmenter2,
        newrater2: InterFace.newrater2,
        weekscallinter: InterFace.weekscallinter,//一周规模业绩，年化业绩，折标率
        weeknewadd: InterFace.weeknewadd,//一周新客增长
        weekinvestmenter: InterFace.weekinvestmenter,//续投率
      },
      interestRateTest_today: '',
      intersYear_today: '',
      scaleYear_today: '',
      markinRrate_today: '',
      interestRateTest_month: '',
      intersYear_month: '',
      scaleYear_month: '',
      markinRrate_month: '',
      markingRateText_today: '',
      markingRateText_month: '',
      customerGrowthNum_today: '',
      customerGrowthNum_month: '',
      popupShow: false
    }
  },
  watch: {
    //观察data的变化
    investmentnum: {
      handler (newVal, oldVal) {
        if (this.chart) {
          for (let i = 0; i < this.investmentnum.length; i++) {
            if (oldVal[i] != newVal[i] || newVal[i] === 0) {
              this.option = {
                //echarts
                tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b} : {c}'
                },
                legend: {
                  right: 'right'
                },
                xAxis: {
                  type: 'category',
                  name: 'x',
                  splitLine: {show: false},
                  data : this.weektime,
                  //设置坐标轴字体颜色
                  axisLine: {
                    lineStyle: {
                      color: '#4a78e8',
                      width: 1,//这里是为了突出显示加上的
                    }}
                },
                grid: {
                  left: '1%',
                  right: '1%',
                  bottom: '3%',
                  containLabel: true
                },
                yAxis: {
                  type: 'value',
                  name: this.echary,
                  splitLine: {
                    lineStyle: {
                      // 使用深浅的间隔色
                      color: ['#60bee9']
                    }
                  },
                  nameTextStyle: {
                    color: ['#4a78e8']
                  },
                  axisLine: {
                    lineStyle: {
                      color: '#4a78e8',
                      width: 1,//这里是为了突出显示加上的
                    }
                  },
                  axisLabel: {
                    color: "#7e8c8d" //刻度线标签颜色
                  }
                },
                series: [
                  {
                    //name: '金额',
                    type: 'line',
                    // smooth: true,
                    data: this.investmentnum,
                    itemStyle : {
                      normal : {
                        color:'red',
                        lineStyle: {
                          color:'#4a78e8'
                        },
                        label: {
                          show: true
                        }
                      }
                    }
                  }
                ]
              }
              this.chart.setOption(this.option)
            }
          }
        } else {
          this.init()
        }
      },
      deep: true //对象内部属性的监听，关键。
    },
    '$route' (to, from) {
      if (to.name == 'visirank2' || from.name == 'visirank2') {

      } else {
        //需要缓存
        this.common()
        this.weekscale(this.interface.weekscallinter)//一周规模业绩，年化业绩，折标率
        this.scale(this.interface.scallinter)//个人当天规模业绩，年化业绩，折标率
        this.investment(this.interface.investmenter)//个人当天续投率
        this.newrate(this.interface.newrater) //个人当天新客增长
      }
    }
  },
  mounted () {
    let myChart = this.$echarts.init(document.getElementById('myChart'))
    this.option = {
      //echarts
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
      },
      legend: {
        right: 'right'
        // data: ['金额'],
       // data: [{name:'金额',textStyle:{color:'#4a78e8'}}
       // ]
      },
      xAxis: {
        type: 'category',
        name: 'x',
        splitLine: {show: false},
        data : this.weektime,
        //设置坐标轴字体颜色
        axisLine: {
          lineStyle: {
            color: '#4a78e8',
            width: 1,//这里是为了突出显示加上的
          }}
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        name: this.echary,
        splitLine: {
          lineStyle: {
            // 使用深浅的间隔色
            color: ['#60bee9']
          }
        },
        nameTextStyle: {
          color: ['#4a78e8']
        },
        axisLine: {
          lineStyle: {
            color: '#4a78e8',
            width: 1,//这里是为了突出显示加上的
          }
        },
        axisLabel: {
          color: "#7e8c8d" //刻度线标签颜色
        },
        min: 0
      },
      series: [
        {
          //name: '金额',
          type: 'line',
          // smooth: true,
          data: this.investmentnum,
          itemStyle : {
            normal : {
              color:'red',
              lineStyle: {
                color:'#4a78e8'
              },
              label: {
                show: true
              }
            }
          }
        }
      ]
    }
    myChart.setOption(this.option)
    this.init()
  },
  created () {
    this.common()
    this.weekscale(this.interface.weekscallinter)//一周规模业绩，年化业绩，折标率
    this.scale(this.interface.scallinter)//个人当天规模业绩，年化业绩，折标率
    this.investment(this.interface.investmenter)//个人当天续投率
    this.newrate(this.interface.newrater) //个人当天新客增长
  },
  methods: {
    init () {
      this.chart = this.$echarts.init(document.getElementById('myChart'))
      this.chart.setOption(this.option)
      this.option = {
        //echarts
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          right: 'right',
          // data: ['金额'],
         // data: [{name:'金额',textStyle:{color:'#4a78e8'}}
        //  ]
        },
        xAxis: {
          type: 'category',
          name: 'x',
          splitLine: {show: false},
          data : this.weektime,
          //设置坐标轴字体颜色
          axisLine: {
            lineStyle: {
              color: '#4a78e8',
              width: 1,//这里是为了突出显示加上的
            }}
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          name: '   金额 (万元)',
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#60bee9']
            }
          },
          nameTextStyle: {
            color: ['#4a78e8']
          },
          axisLine: {
            lineStyle: {
              color: '#4a78e8',
              width: 1,//这里是为了突出显示加上的
            }
          },
          axisLabel: {
            color: "#7e8c8d" //刻度线标签颜色
          }
        },
        series: [
          {
           // name: '金额',
            type: 'line',
            // smooth: true,
            data: this.investmentnum,
            itemStyle : {
              normal : {
                color:'red',
                lineStyle: {
                  color:'#4a78e8'
                },
                label: {
                  show: true
                }
              }
            }
          }
        ]
      }
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let strhours = date.getHours()
      let strmin = date.getMinutes()
      let strseconds = date.getSeconds()
      this.now = year + "-" + month + "-" + strDate + "  " + strhours + ":" + strmin + ":" + strseconds
    },
    common () {
      if (this.$route.params.code) {
        //用户id
        this.params = this.$route.params.code
      } else {
        //let visicode = sessionStorage.getItem('visticode')
        this.params = 0
      }
      let code = {
        UsersId: this.params
      }
      this.cod = JSON.stringify(code)
    },
    selected (name) {
      //点击对应标签出现高亮
      this.active = name
      //请求不同的数据接口
      if (name === '规模业绩') {
        this.echary = " 金额 (万元)"
        Indicator.open({
          //等待
          text: 'Loading...',
          spinnerType: 'fading-circle'
        })
        this.weekscale(this.interface.weekscallinter)
      } else if (name === '年化业绩') {
        this.echary = " 金额 (万元)"
        Indicator.open({
          //等待
          text: 'Loading...',
          spinnerType: 'fading-circle'
        })
        this.yearscale(this.interface.weekscallinter)
      } else if (name === '新客增长') {
        this.echary = "人数"
        Indicator.open({
          //等待
          text: 'Loading...',
          spinnerType: 'fading-circle'
        })
        this.newdata(this.interface.weeknewadd)
      } else if (name === '续投率') {
        this.echary = "比率(%)"
        Indicator.open({
          //等待
          text: 'Loading...',
          spinnerType: 'fading-circle'
        })
        this.weekmenter(this.interface.weekinvestmenter)
      } else {
        this.echary = " 比率(%)"
        Indicator.open({
          //等待
          text: 'Loading...',
          spinnerType: 'fading-circle'
        })
        this.discount(this.interface.weekscallinter)
      }
    },
    datechose () {
      this.chosee = true
      this.clesee = false
      this.wait = true
      this.interestRateTest = ''
      this.customerGrowthNum = ''
      this.markingRateText = ''
      this.markinRrate = ''
      //判断有无数据，没有数据重新请求接口
      if (this.interestRateTest_today && this.intersYear_today) {
        this.wait = false
        this.interestRateTest = this.interestRateTest_today
        this.intersYear = this.intersYear_today
        this.scaleYear = this.scaleYear_today
        this.markinRrate = this.markinRrate_today
        this.markingRateText = this.markingRateText_today
        this.customerGrowthNum = this.customerGrowthNum_today
      } else {
        //点击本日时重新请求数据
        this.scale(this.interface.scallinter)//个人当天规模业绩，年化业绩，折标率
        this.investment(this.interface.investmenter)//个人当天续投率
        this.newrate(this.interface.newrater) //个人当天新客增长
      }
      //
    },
    clechose () {
      this.chosee = false
      this.clesee = true
      this.wait = true
      this.interestRateTest = ''
      this.customerGrowthNum = ''
      this.markingRateText = ''
      this.markinRrate = ''
      //判断有无数据，没有数据重新请求接口
      if (this.interestRateTest_month && this.intersYear_month) {
        this.wait = false
        this.interestRateTest = this.interestRateTest_month
        this.intersYear = this.intersYear_month
        this.scaleYear = this.scaleYear_month
        this.markinRrate = this.markinRrate_month
        this.markingRateText = this.markingRateText_month
        this.customerGrowthNum = this.customerGrowthNum_month
      } else {
        //点击本月时重新请求数据
        this.scale(this.interface.scallinter2)
        this.investment(this.interface.investmenter2)
        this.newrate(this.interface.newrater2)
      }
    },
    back () {
      this.$router.go(-1)
    },
    scale (scallinter) {
      //个人当天
      var cha = (data) => {
        Indicator.close() //请求成功关闭loding
        this.wait = false
        let condata = data.result
        let time = condata.calulationDateTest
        if (time) {
          let timer = time.replace(/\//g, '-')
          this.nowtime = timer
        }else {
          this.nowtime = "--"
        }
        //默认显示规模业绩
        this.interestRateTest = condata.investmentAmountSumTest
        //年化业绩
        this.intersYear = condata.interestRateTest
        //规模业绩
        this.scaleYear = condata.investmentAmountSumTest
        //折标率
        this.markinRrate = condata.markinRrate
      }
      Global.Ajax.post(Global.page.url.Request + scallinter, this.cod, cha)
    },
    performan () {
      //切换年化与规模业绩
      this.choseper = !this.choseper
      if (this.choseper == true) {
        this.perforname = "规模业绩"
        this.interestRateTest = this.scaleYear
      } else {
        this.perforname = "年化业绩"
        this.interestRateTest = this.intersYear
      }
    },
    investment (investmenter) {
      let url_1 = 'api/services/app/userReport/apiGetPersonalMarkingRate'
      var cha = (data) => {
        this.markingRateText = data.result.markingRateText
        if (investmenter === url_1) {
          this.markingRateText_today = data.result.markingRateText
        } else {
          this.markingRateText_month = data.result.markingRateText
        }
      }
      Global.Ajax.post(Global.page.url.Request + investmenter, this.cod, cha)
    },
    newrate (newrater) {
      let url_1 = 'api/services/app/userReport/apiGetNewCustomerToDay'
      var cha = (data) => {
        this.customerGrowthNum = data.result.customerGrowthNum
        if (newrater === url_1) {
          this.customerGrowthNum_today = data.result.customerGrowthNum
        } else {
          this.customerGrowthNum_month = data.result.customerGrowthNum
        }
      }
      Global.Ajax.post(Global.page.url.Request + newrater, this.cod, cha)
    },
    weekscale (weekscallin) {
      let days = ''
      let dayslist = []
      let daycon
      var cha = (data) => {
        let investment = []
        for (var i = 0; i < data.result.length; i++) {
          days = data.result[i].calulationDate
          daycon = days.slice(5, 10).replace(/\b(0+)/gi,"")
          dayslist.push(daycon)
          if (data.result[i].investmentAmountSumTest === '--') {
            investment.push(0.00)
          } else {
            if (data.result[i].investmentAmountSumTest.length > 3) {
              investment.push(parseFloat(data.result[i].investmentAmountSumTest).toFixed(2))
            } else {
              investment.push(data.result[i].investmentAmountSumTest)
            }
          }
        }
        this.weektime = dayslist
        this.investmentnum = investment
        this.chart.setOption(this.option)
        setTimeout(()=>{
          Indicator.close()
        },1000)
      }
      Global.Ajax.post(Global.page.url.Request + weekscallin, this.cod, cha)
    },
    yearscale (yearscale) {
      var cha = (data) => {
        let investment = []
        for (var i = 0; i < data.result.length; i++) {
          if (data.result[i].interestRateTest === '--') {
            investment.push(0.00)
          } else {
            if (data.result[i].interestRateTest.length > 3) {
              investment.push(parseFloat(data.result[i].interestRateTest).toFixed(2))
            } else {
              investment.push(data.result[i].interestRateTest)
            }
          }
        }
        this.investmentnum = investment
        this.chart.setOption(this.option)
        setTimeout(()=>{
          Indicator.close()
        },1000)
      }
      Global.Ajax.post(Global.page.url.Request + yearscale, this.cod, cha)
    },
    newdata (weeknewadd) {
      var cha = (data) => {
        let investment = []
        for (var i = 0; i < data.result.length; i++) {
          if (data.result[i].customerGrowthNum === '--') {
            investment.push(0)
          } else {
            investment.push(data.result[i].customerGrowthNum)
          }
        }
        this.investmentnum = investment
        this.chart.setOption(this.option)
        setTimeout(()=>{
          Indicator.close()
        },1000)
      }
      Global.Ajax.post(Global.page.url.Request + weeknewadd, this.cod, cha)
    },
    weekmenter (weekmentt) {
      var cha = (data) => {
        let investment = []
        for (var i = 0; i < data.result.length; i++) {
          if (data.result[i].markingRateText === '--') {
            investment.push(0.00)
          } else {
            if (data.result[i].markingRateText.length > 3) {
              investment.push(parseFloat(data.result[i].markingRateText).toFixed(2))
            } else {
              investment.push(data.result[i].markingRateText)
            }
          }
        }
        this.investmentnum = investment
        this.chart.setOption(this.option)
        setTimeout(()=>{
          Indicator.close()
        },1000)
      }
      Global.Ajax.post(Global.page.url.Request + weekmentt, this.cod, cha)
    },
    discount (weekdiscount) {
      var cha = (data) => {
        let investment = []
        for (var i = 0; i < data.result.length; i++) {
          if (data.result[i].markinRrate === '--') {
            investment.push(0.00)
          } else {
            if (data.result[i].markinRrate.length > 3) {
              investment.push(parseFloat(data.result[i].markinRrate).toFixed(2))
            } else {
              investment.push(data.result[i].markinRrate)
            }
          }
        }
        this.investmentnum = investment
        this.chart.setOption(this.option)
        setTimeout(()=>{
          Indicator.close()
        },1000)
      }
      Global.Ajax.post(Global.page.url.Request + weekdiscount, this.cod, cha)
    },
    ranking () {
      //1.本日年化业绩排名 2.本日规模业绩排名  3.本月年化业绩排名  4.本月规模业绩排名
      if (this.chosee === true) {
        if (this.choseper === true) {
          //本日年化业绩排名
          this.$router.push({ name: 'visirank2', params: {codtype: 2, visicod: this.params}})
        }
        if (this.choseper == false) {
          //本日年化业绩排名
          this.$router.push({ name: 'visirank2', params: {codtype: 1, visicod: this.params}})
        }
      }
      //this.$router.push('/visiranking')
      if (this.chosee === false) {
        if (this.choseper === true) {
          //规模业绩排名
          this.$router.push({ name: 'visirank2', params: {codtype: 4, visicod: this.params}})
        } else {
          //本月年化业绩排名
          this.$router.push({ name: 'visirank2', params: {codtype: 3, visicod: this.params}})
        }
      }
    },
    visihistory () {
      //查看历史报表
      this.popupShow = !this.popupShow
      //alert(123)
    },
    tohistryreport () {
      this.popupShow = false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .visi
    position:absolute
    width: 100%
    height: 100%
    background:#fff
    .visicon
      /*background-image: url("../../../static/images/bgbg@2x.png");*/
      bg-image('../../images/02bg')
      height:322px
      background-size: 100% 100%
      .vihead-tab
        height: 51px
        line-height: 51px
        margin-bottom: 16px
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
            flex: 2
            margin-left: 6px
            margin-top: 10px
            a
              font-size 15px
              display:inline-block
              border:1px solid
              height:28px
              line-height:28px
              width:64px
              color:#fff
            .visojr
              border-radius:8px 0px 0px 8px
            .visoby
              border-radius: 0px 8px 8px 0px
              border-left: none
            .vida
              background: #fff
              span
                color:#4a78e8
          .back
            background:url("../../images/back2.png")
            background-repeat:no-repeat
            background-size:25px
            text-indent: 29px
            display: inline-block
            background-position-y: 14px
          .visimess
            img
              display: inline-block
              width:20px
              height:20px
              position: absolute
              right: 12px
              margin-top: 17px
          .visithistory
            font-size:15px
            font-weight: blod
            text-align: right
            position: relative
            right: 12px
            .visithispan
              font-size: 20px
              font-weight: bold
              display: inline-block
    .visi_tit
      display: flex
      div
        text-align: center
        flex:1
        color: #fff
      .tit_ico
        span
          display:inline-block
          font-size: 15px
          border-radius: 12px
          bg-image('../../images/02per')
          background-size: 12px
          background-position-x: 8px
          background-position-y: 5px
          background-color: rgb(89, 142, 248)
          width: 71px
          height: 25px
          line-height: 25px
          text-indent: 4px
      .tit_yj
        span
          display: inline-block
          height: 25px
          line-height: 25px
          font-size: 12px
          bg-image('../../images/05')
          background-size: 4%
          background-repeat: no-repeat
          background-position-y: 9px
          background-position-x: 96px
          padding-right: 11px
      .visi_tit
        span
          position: absolute
          right: 0
          height: 25px
          line-height: 25px
          text-indent: 11px
          width: 100px
          background: rgb(154,156,255)
          border-radius: 14px 0 0 14px
          font-size: 15px
          background-image: url(../../images/rightjt.png)
          background-size: 12px
          background-repeat: no-repeat
          background-position-x: 85px
          background-position-y: 6px
          .visihg
            width: 21px
            height: 16px
            display: inline-block
            background-size:20px
            bg-image('../../images/03rank')
            position: absolute
            background-size: 80%
            left: 5px
            top: 6px
    .visi_num
      text-align: center
      height: 85px
      line-height: 86px
      font-size: 48px
      color: #fff
    .visi_time
      text-align: center
      font-size: 12px
      color: #fff
    .visi_sp
      ul
        display:flex
        color:#ffffff
        margin-top:30px
        li
          flex:1
          text-align: center
          span
            height: 2rem
            line-height: 2rem
            display:block
            text-align:center
            font-size:12px
          .my_num
            font-size: 24px
        .myline
          border-right: 1px solid #ebebeb
          height: 3rem
          margin: auto
    .char_title
      margin-top:50px
      ul
        display:flex
        border-1px(#ebebeb)
        li
          flex:1
          font-size:14px
          color: #7e8c8d
          text-align:center
          .active
            border-bottom: 2px solid #4a78e8
            display: inline-block
            padding-bottom: 6px
            margin-bottom: 1px
            color:#4a78e8
      div
        height: 45px
        line-height: 45px
        text-indent: 10px
        font-size:14px
        color: #7e8c8d
        i
          display:inline-block
          border:2px solid #4A78E8
          height 10px
          position: absolute
          margin-top: 16px
        span
          margin-left: 6px
    .description
      text-align:center
      border-1px(#E0E3E5)
      height: 25px
      line-height:25px
      color: #333
      margin-top: 8px
      font-size: 14px
      padding-left: 10px
      padding-right: 10px
      .description_tit
        margin-bottom: 8px
      .description_p1
        text-align: left
        line-height: 18px
      .description_pt
        font-size: 12px
        color: #878585
        font-weight: bold
        margin-top: 10px
      .description_p2
        text-align: left
        font-size: 12px
        color: #9E9E9E
    .echa
      background: #fff
      .echar_con
        overflow: hidden
        margin:auto
        max-width: 350px
        width: 94%
        height: 300px
        border-width: 0px
        cursor: default
  .mint-popup-right
    top: 8%
    right: 10px
  .popshow
    border-radius: 5px
    position: fixed
    z-index:2008
    top: 52px
    right: 5px
    .showmain
      margin: auto
      width: 120px
      display: block
      font-size: 12px
      text-align: center
      position: relative
      background: rgb(255,255,255)
      border-radius: 5px
      padding-top: 8px
      padding-bottom: 8px
      padding-right: 8px
      padding-left: 8px
      .showmain_b
        bg-image('../../images/02')
        height: 23px
        line-height: 23px
        background-size: 20px
        text-indent: 26px
        width: 100%
        background-position-x: 5px;
        background-position-y: 1px;
        font-size: 14px
        color: #333
    .showmain:before
      content: ''
      border-bottom: 5px solid rgb(255,255,255)
      border-left: 5px solid transparent
      border-right: 5px solid transparent
      position: absolute
      right: 10px
      top: -5px
</style>
