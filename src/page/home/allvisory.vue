<template>
    <div class="allviso">
      <header class="head-tab">
        <ul>
          <li class="back-con"><span class="back" @click="$router.back(-1)">返回</span></li>
          <li class="visodata" >
            <span @click="aa()">{{this.title}}</span>
          </li>
          <li class="visoadd" >
            <img src="../../images/add.png" alt="" @click="addOrder()">
          </li>
        </ul>
        <!--用selectStatus判断显示与隐藏-->
        <transition  name="slide-down">
          <ul class="select-options" v-show="selectStatus">
            <li class="select-option-item" v-if="this.allcount>0" @click="select(11)">全部日程（{{this.allcount}}）</li>
            <li class="select-option-item" v-if="this.birthcoutn>0" @click="select(0)">客户生日提醒（{{this.birthcoutn}}）</li>
            <li class="select-option-item" v-if="this.expected>0" @click="select(1)">预到期订单提醒（{{this.expected}}）</li>
            <li class="select-option-item" v-if="this.maturity>0" @click="select(2)">到期订单提醒（{{this.maturity}}）</li>
            <li class="select-option-item" v-if="this.customize>0" @click="select(3)">自定义日程（{{this.customize}}）</li>
          </ul>
        </transition>
        <div v-show="selectStatus" class="mode"></div>
      </header>
      <scroller  ref="myscroller" class="allviso_scroll">
        <ul v-if="carousor">
          <li v-for="item in allcarous">
            <mt-cell-swipe
              :right="[
              {
                content: '删除',
                style: { background: 'red', color: '#fff' },
                handler: () => deleteSection(item.id)
              }
            ]">
              <div style="position: absolute;left: 0px;">
                <p class="all_title"><span class="point">●</span>{{item.calenderName}}</p>
                <p class="all_content">{{item.calenderContent}}</p>
              </div>
            </mt-cell-swipe>
          </li>
        </ul>
        <!--暂无日程-->
        <div class="noallviso" v-show="boll">
          <img src="../../images/zanwuricheng@2x.png">
          <p>暂无日程</p>
        </div>
        <div style="height: 30px;"></div>
      </scroller>
      <!--新建日程-->
      <div class="newData" v-if="newdata">
        <div class="newData_md">
          <p class="newdata_tit">新建日程</p>
          <p class="newdata_tit newdata" @click="openPicker()">
            <span class="chosespan1">选择时间：</span>
            <span class="chosespan2">{{this.dateTime}}</span>
            <img src="../../images/rijiantou.png"/>
          </p>
          <textarea class="texral" id="textra"></textarea>
          <a class="btnsure" @click="Sure()">确定</a><a class="btnback" @click="Back()">取消</a>
        </div>
      </div>
      <!--时间插件-->
      <mt-datetime-picker
        type="date"
        ref="picker"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm"
        :startDate="startDate"
      >
      </mt-datetime-picker>
    </div>
</template>
<script>
import {Global} from '../../config/golobal'
import {InterFace} from '../../config/userapi'
import {DatetimePicker, Toast} from 'mint-ui'
import moment from 'moment' //格式化时间
import Vue from 'vue'
import { CellSwipe } from 'mint-ui'
Vue.component(CellSwipe.name, CellSwipe) //不可以合并，否则报错
Vue.component(DatetimePicker.name, DatetimePicker)
export default {
  data () {
      return {
        boll: true,
        allcarous: '', //日程
        Allcarous: '', //全部日程
        allcount: '', //全部日成条数
        carousor: true, //是否有日程
        newdata: false, //新建日程
        title: '全部日程',
        selectStatus: false, //日程下拉框是否隐藏
        birthcoutn: 0,//客户生日条数
        expected: 0,//预到期单条数
        maturity: 0,//到期订单条数
        customize: 0,//自定义
        dateTime: '',//日程转换之后时间
        startDate: new Date(),
        calenderContent:'',//日程内容
        calenderType:3,//日程类型
        entryTime:'',
        startX:0,   //触摸位置
        endX:0,     //结束位置
        moveX: 0,   //滑动时的位置
        disX: 0,    //移动距离
        deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
      }
    },
  created () {
    this.entryTime = this.$route.params.timer
    this.allviso()
  },
  methods: {
    //全部日程
    allviso () {
        //let entime = sessionStorage.getItem("timer")
        let entime = this.$route.params.timer
        let timer = entime.split('-')
        this.dateTime = timer[0] + "年" + timer[1] + "月" + timer[2] + "日"
        var code = {
          EntryTime: this.entryTime
        }
        let cod = JSON.stringify(code)
        var cha = (data) => {
          this.allcarous = data.result
          this.Allcarous = data.result
          //判断有无日程
          if (data.result.length <=0) {
            this.carousor = false
            console.log(this.boll)
            this.boll = true
          } else {
            this.allcount = data.result.length
            this.carousor = true
            this.boll = false
          }
          //遍历全部日程的类型
          this.birthcoutn = 0
          this.expected = 0
          this.maturity = 0
          this.customize = 0
          let count = this.allcarous
          for (var i = 0; i < count.length; i++) {
            if (count[i].calenderType === 0) {
              this.birthcoutn++
            } else if (count[i].calenderType === 1) {
              this.expected++
            } else if (count[i].calenderType === 2) {
              this.maturity++
            } else if (count[i].calenderType === 3) {
              this.customize++
            }
          }
        }
        var erroo = (data) => {
          console.log(data)
        }
        Global.Ajax.post(Global.page.url.Request + InterFace.allviso, cod, cha, erroo)
      },
    aa () {
        this.selectStatus = !this.selectStatus
        if (this.selectStatus === true) {
          $("body").css("overflow","hidden")
        }else {
          $("body").css("overflow","auto")
        }
      },
    select (data) {
        $("body").css("overflow","auto")
        this.selectStatus = !this.selectStatus
        if (data === 11) {
          this.title = "全部日程"
        } else if (data === 0) {
          this.title = "客户生日提醒"
        } else if (data === 1) {
          this.title = "预到期订单提醒"
        } else if (data === 2 ) {
          this.title = "到期订单提醒"
        } else if (data === 3) {
          this.title = "自定义日程"
        }
        if(data === 11) {
          this.allviso()
        } else {
          //重新请求数据
          var code = {
            EntryTime: this.entryTime,
            CalenderType: data
          }
          let cod = JSON.stringify(code)
          var cha = (data) => {
            this.allcarous = data.result
            console.log(data)
          }
          var erroo = (data) => {
            console.log(data)
          }
          Global.Ajax.post(Global.page.url.Request + InterFace.choseallviso, cod, cha, erroo)
        }
      },
    selectALL () {
        this.selectStatus = !this.selectStatus
        if (this.selectStatus === true) {
          $("body").css("overflow","hidden")
        } else {
          $("body").css("overflow","auto")
        }
        this.allcarous = this.Allcarous
      },
    //新建日程
    addOrder () {
        this.newdata = !this.newdata
        if (this.newdata === true) {
          $("body").css("overflow","hidden")
        }else {
          $("body").css("overflow","auto")
        }
      },
    Sure () {
        this.calenderContent = $('#textra').val()
        if (this.calenderContent) {
          this.newdata = !this.newdata
          this.createCalender()
        } else {
          Toast('请输入信息')
        }
      },
    //请求增加日程接口
    createCalender () {
        var code = {
          calenderContent: this.calenderContent,
          calenderType: this.calenderType,
          EntryTime: sessionStorage.getItem("timer")
        }
        let cod = JSON.stringify(code)
        //请求失败，提示信息
        var erroo = (data) => {
          console.log(data)
        }
        var cha = (data) => {
          this.allviso ()
        }
        Global.Ajax.post(Global.page.url.Request + InterFace.createcalender, cod, cha, erroo)
      },
    //删除日程
    deleteSection (id) {
      console.log(id)
      console.log(typeof(id))
      var code = {
        Id: id
      }
      let cod = JSON.stringify(code)
      //请求失败，提示信息
      var erroo = (data) => {
        console.log(data)
      }
      var cha = (data) => {
        console.log(data)
        this.customize -= 1
        this.allviso ()
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.deletesection, cod, cha, erroo)
    },
    Back () {
      this.newdata = !this.newdata
    },
    openPicker () {
      this.$refs.picker.open()
    },
    handleConfirm (data) {
      console.log(data)
      let date = moment(data).format('YYYY.MM.DD')
      let tim = date.split('.')
      let nowtime = tim[0] + "年" + tim[1] + "月" + tim[2] + "日"
      this.dateTime = nowtime
    }
  }
}
</script>

<style scoped lang="stylus"  rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .allviso
    position: absolute
    width: 100%
    height:100%
    .head-tab
      height: 51px
      background: #fff
      line-height: 51px
      border-1px(#E0E3E5)
      ul
        display:flex
        li
          font-size:16px
          color:#424242
          flex:1
          text-align: center
        .back-con
          text-indent: 0.4rem
          text-align: left
        .back
          background:url("../../images/back.png")
          background-repeat:no-repeat
          background-size:25px
          text-indent: 29px
          display: inline-block
          background-position-y: 14px
        .visodata
          color:#000000
          font-size:17px
        .visoadd
          margin:auto
          display: inherit
          img
            width: 27px
            height: 27px
            position: absolute
            right: 0.4rem
            top: 12px
      .slide-down-enter-active,.slide-down-leave
        transition: all .3s ease-in-out
        transform-origin:0 top
        transform: scaleY(1)
      .slide-down-enter
        transform: scaleY(0)
      .slide-down-leave-active
        transition: all .3s ease-in-out
        transform-origin:0 top
        transform: scaleY(0)
      .select-options
        position: absolute
        border-radius: 5
        top: 51px
        position: fixed
        z-index: 999
        display: flow-root
        width: 100%
        background: #fff
        .select-option-item
          cursor: pointer
          transition-duration: 300ms
          border-1px(#E0E3E5)
        .select-option-item:hover,.select-option-active
          color: #4A78E8
      .mode
        position: fixed
        width: 100%
        height: 100%
        background: rgba(0, 0, 0, 0.4)
        z-index: 998
        overflow: hidden
    .allviso_scroll
      position: absolute
      height: 100%
      background: #ffffff
      margin-top: 53px
      ul
        li
          color: #3677f7
          text-indent: 1rem
          border-1px(#E0E3E5)
          padding-bottom: 0.2rem
          z-index: 100
          span
            color: #565D66
            display:block
          .all_title
            color: #565D66
            margin-top:0.3rem
            font-size:16px
          .point
            padding-right: 23px
            display: inline
            font-size: 11px
            color: #3677F7
          .all_content
            color:#A1A1A1
            font-size:13px
            margin-top:0.2rem
            text-align: left
            text-indent: 0px
            margin-left: 45px
            line-height:24px
          .remove
            display: inline-block
            position: absolute
            background:red
            color:#fff
            right: 0
            top: -0.3rem
            height: 3.1rem
            line-height: 3.1rem
            text-indent: 0;
            width: 5rem
            text-align: center
        .content
          transition:0.3s
    .noallviso
      text-align:center
      margin-top: 129px
      img
        width:50px
      p
        color: #BBBBBB
        font-size: 16px
        margin-top:15px
    .newData
      position: fixed
      width: 100%
      height: 100%
      top:0
      background: rgba(0,0,0,0.4)
      z-index: 998
      overflow: hidden
      .newData_md
        margin:auto
        margin-top:135px
        /*width: 275px*/
        width:78%
        height: 290px
        border-radius:12px
        background-color: #FFFFFF
        opacity: 0.88
        .newdata_tit
          font-size: 17px
          border-1px(#E0E3E5)
          text-align: center
          height: 48px
          line-height: 48px
        .newdata
          height: 34px
          line-height: 34px
          margin-bottom: 8px
          text-align: left
          padding-left: 15px
          .chosespan1
            color: #999999
            font-size: 16px
            margin-right: 27px
          .chosespan2
            font-size: 16px
            color: #666666
          img
            margin-top: 10px
            position: absolute
        .chosetime
          height:34px
          line-height:34px
          text-align: center
          font-size: 16px
        .texral
          resize: none
          width: 240px
          height:117px
          margin: auto
          border:1px solid #DDDDDD
          display:block
          height: 117px
        a
          border:1px solid #DDDDDD
          display:inline-block
          text-align:center
          width 49%
          height:51px
          line-height:51px
          margin-top:24px
          color:#0074FF
          border-right:none
        .btnsure
          border-radius:0 0 0 12px
        .btnback
          width: 49.92%
          border-radius:0 0 12px 0
</style>
