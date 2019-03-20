try {
  var Echartcon = {
    //  柱状图和折线
    Columnar: function (xAxidata, nowcustor, custorcount,repeat, addnow, sumadd, rotate, cha) {
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          //提示框，鼠标悬浮交互时的信息提示
          trigger: 'hideTip'
        },
        //是否启用拖拽重计算特性，默认关闭(即值为false)
        calculable: true,
        grid: {
          y: 50,
          y2: 55,
          x: 40,
          x2: 40
          // left: 58,
          // right:50
        },
        xAxis: [
          {
            type: 'category',
            splitLine: {show: false},
            axisLabel: {
              color: "#6793fe",//刻度线标签颜色
              interval: 0, //X轴文字全部显示
              rotate: rotate  //倾斜角度
            },
            // data: ['4月', '5月', '6月', '7月', '8月']
            data: xAxidata
          },

          {
            type: 'category',
            splitLine: {show: false},
            axisLine: {
              show: false,
              lineStyle: {
                color: '#4a78e8',
                width: 1,//这里是为了突出显示加上的
              }
            }, //是否显示坐标轴轴线

            axisTick: {show: false}, //是否显示坐标轴刻度。

            axisLabel: {show: false}, //坐标轴刻度标签的相关设置

            // data: ['Line', 'Bar', 'Scatter', 'K']
          }

        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {show: false},
            axisLine: {
              show: true,
              lineStyle:{
                color:'#4a78e8',
                width:1,//这里是为了突出显示加上的
              }
            },
            axisLabel: {
              splitLine: {show: false},
              color: "#7e8c8d", //刻度线标签颜色
              formatter: '{value}',
              //设置坐标轴字体颜色
              axisLine: {
                lineStyle: {
                  color: '#0087ED',
                  width: 1,//这里是为了突出显示加上的
                }}
            }
          },
          {
            type: 'value',
            splitLine: {show: false},
            axisLine: {
              show: true,
              lineStyle:{
                color:'#4a78e8',
                width:1,//这里是为了突出显示加上的
              }
            }, //是否显示坐标轴轴线
            axisLabel: {
              formatter: '{value}',
              color: "#7e8c8d", //刻度线标签颜色
            }
          }
        ],
        series: [
          {
            name: '客户总数',
            type: 'bar',
            barWidth: 35,
            itemStyle: {normal: {color: 'rgba(100,146,252,0.4)', label: {show: true, formatter: '{c}%', textStyle: {color: '#fff'}}}},
            stack: '概率',
            data: custorcount
          },
          {
            name: '在投客户',
            type: 'bar',
            itemStyle: {normal: {color: 'rgba(100,146,252,.9)', label: {show: true, formatter: '{c}%', textStyle: {color: '#fff'}}}},
            stack: '概率',
            data: nowcustor
          },
          {
            name:'重复购买',
            type:'bar',
            itemStyle: {normal: {color: '#077FE0', label: {show: true, formatter: '{c}%', textStyle: {color: '#fff'}}}},
            stack: '概率',
            data:repeat
          },
          {
            name:'在投客户增长比',
            type:'line',
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#5185fd",
                lineStyle: {
                  color: "#5185fd"
                }
              }
            },
            data: addnow
          },
          {
            name:'客户新增环比',
            type:'line',
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#CCDBFE",
                lineStyle: {
                  color: "#CCDBFE"
                }
              }
            },
            data: sumadd
          }
        ]
      }
      if (typeof (cha) === 'function') {
        cha(option)
      }
    },
    // 饼状图
    Piechart: function (agecount, cha) {
      console.log(agecount[0].name)
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            startAngle: 180,
            data: [
              {
                value: agecount[0].data,
                name: agecount[0].name,
                itemStyle: { normal: {color: agecount[0].color} }
              },
              {
                value: agecount[1].data,
                name: agecount[1].name,
                itemStyle: { normal: {color: agecount[1].color} }
              },
              {
                value: agecount[2].data,
                name: agecount[2].name,
                itemStyle: { normal: {color: agecount[2].color} }
              },
              {
                value: agecount[3].data,
                name: agecount[3].name,
                itemStyle: { normal: {color: agecount[3].color} }
              }
            ],
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{c}%'
              }
            }
          }
        ]
      }
      if (typeof (cha) === 'function') {
        cha(option)
      }
    },
    //半圆饼状图
    Semicircle: function (data, cha) {
      var option = {
        series : [
          {
            name: '产品分配方式',
            type: 'pie',
            startAngle:-180,
            radius : '55%',
            center: ['50%', '60%'],
            data:data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{c}%'
              }
            }
          }
        ]
      }
      if (typeof (cha) === 'function') {
        cha(option)
      }
    },
    //圆环图
    Ring: function (data, cha) {
      var option = {
        series: [
          {
            name:'访问来源',
            type:'pie',
            radius: ['35%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{c}%'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data
          }
        ]
      }
      if (typeof (cha) === 'function') {
        cha(option)
      }
    },
    //小圆折线图
    Circlechart: function (xAxidata, continued, avercontinued, rotate, cha) {
      var option = {
        xAxis: {
          type: 'category',
          data: xAxidata,
          axisLabel: {
            color: "#4a78e8",//刻度线标签颜色
            interval: 0, //X轴文字全部显示
            rotate: rotate  //倾斜角度
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#4a78e8',
              width: 1,//这里是为了突出显示加上的
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: "#A0A4AA",//刻度线标签颜色
            formatter: '{value}'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#4a78e8',
              width: 1,//这里是为了突出显示加上的
            }
          }
        },
        series: [
          {
            name: '经期天数',
            type: 'line',
            symbolSize: 35,
            symbol: 'circle',
            data: continued,
            itemStyle: {
              normal: {
                color: '#087EE0',
                borderType: 'solid'
              }
            },
            label: {
              normal: {
                show: true,
                formatter: '{c}%',
                position: 'inside' //值显示
              }
            }
          },
          {
            name: '经期天数',
            type: 'line',
            symbolSize: 35,
            symbol: 'circle',
            data: avercontinued,
            itemStyle: {
              normal: {
                color: '#8FBCFF',
                borderType: 'solid'
              }
            },
            label: {
              normal: {
                show: true,
                formatter: '{c}%',
                position: 'inside' //值显示
              }
            }
          }
        ]
      }
      if (typeof (cha) === 'function') {
        cha(option)
      }
    }
  }
} catch (e) {
  console.log(e)
}
export {
  Echartcon
}
