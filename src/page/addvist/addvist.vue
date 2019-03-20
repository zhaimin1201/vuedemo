<template>
    <div>
      <header class="head-tab">
        <ul class="head-ul">
          <li class="head-li back-con"><span class="back" @click=" back()">返回</span></li>
          <li class="head-li" style="font-weight: 700; flex: 2" >
            {{this.title}}
          </li>
          <li class="head-li visimess">
            <span @click="addvistsure()">确定</span>
          </li>
        </ul>
      </header>
      <scroller class="addvist_scoll">
        <div class="scoll_content">
          <div class="summary">
            <p class="summary_title">输入拜访总结</p>
          </div>
          <textarea class="textra" ref="input1" v-model="data"></textarea>
        </div>
        <div class="visit_chose">
          <div class="choose_title">
            <span>选择客户</span>
            <span class="city">{{this.cname}}</span>
          </div>
          <span class="choose_right"  @click="client()"></span>
        </div>
        <div class="visit_chose">
          <div class="choose_title">
            <span>拜访时间</span>
          </div>
          <span class="choose_right choose_time" @click="openPicker()">{{this.dateTime}}</span>
        </div>
      </scroller>
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
import header from '../../common/header/header'
import moment from 'moment' //格式化时间
import {Global} from '../../config/golobal'
import {InterFace} from '../../config/userapi'
import { Toast } from 'mint-ui'
import Vue from 'vue'
import {DatetimePicker} from 'mint-ui'
Vue.component(DatetimePicker.name, DatetimePicker)
export default {
  name: "addvist",
  data () {
    return {
      title: '新建拜访纪律',
      showright: true,
      startDate: new Date(),
      dateTime: '',
      textral: '',
      cname: '',//客户姓名
      back_url: 'tool',
      data: '',
      custor: {},
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'tool' || from.name === 'tool') {
        //信息置未空
        this.data = ''
        this.cname = ''
        this.dateTime = ''
      }
      if (to.name === 'clint' || from.name === 'clint') {
        this.data = this.textral
        this.cname = sessionStorage.getItem('custorname')
        let cust = sessionStorage.getItem('custor')
        this.custor = JSON.parse(cust)
        console.log(this.custor)
      }
    }
  },
  components: {
    'v-header': header
  },
  created () {
    console.log(this.$route.params.strcustname)
  },
  mounted () {
    this.cname = this.$route.query.custorname
  },
  methods: {
    back () {
      this.$router.push('/tool')
    },
    client () {
      this.textral = this.$refs.input1.value
      //选择客户
      this.$router.push('/clint')
      setTimeout(() => {
        Global.storage.local.set('openId', '00000')
        Global.storage.local.set('headimgurl', '0000')
        Global.storage.local.set('nickname', 'zhaimin')
      }, 2000)
    },
    openPicker () {
      this.$refs.picker.open()
    },
    handleConfirm (data) {
      let date = moment(data).format('YYYY.MM.DD')
      let tim = date.split('.')
      let nowtime = tim[0] + "-" + tim[1] + "-" + tim[2]
      this.dateTime = nowtime
    },
    addvistsure () {
      var code = {
        CustomerIds: this.custor,
        VisitContent: this.data,
        VisitTime: this.dateTime
      }
      var cod = JSON.stringify(code)
      var cha = (data) => {
        console.log(data)
        if (data.success === true) {
          Toast("添加成功")
          setTimeout(() => {
            this.$router.push('/tool')
          }, 1000)
        } else {
          Toast(data.error)
        }
      }
      if (this.custor && this.data && this.dateTime) {
        Global.Ajax.post(Global.page.url.Request + InterFace.apiInsertCallRecord, cod, cha)
      } else {
        Toast('请输入完整信息')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .head-tab
    height: 51px
    line-height: 50px
    background: #ffffff
    color: #000000
    border-bottom:1px solid #E0E3E5
    .head-ul
      display:flex
      .head-li
        flex:1
        font-size:16px
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
        color: #4A78E8
      .visimess
        color:#4a78e8
        .visispan
          position: absolute
          right: 14px
  .addvist_scoll
    margin-top: 52px
    background-color: #ecf0f8
    .scoll_content
      background:#ffffff
      margin-top:12px
      border: 1px solid #fff
      .summary
        border-1px(#E0E3E5)
        .summary_title
          font-size: 15px
          height: 43px
          line-height: 43px
          color: #867e7e
          width: 80%
          margin: auto
      .textra
        display:block
        margin:auto
        width:80%
        margin-top:21px
        margin-bottom:21px
        border:1px solid #E0E3E5
        height: 7rem
        outline:none
    .visit_chose
      background-color: #ffffff
      margin-top:12px
      height:43px
      line-height:43px
      position: relative
      .choose_title
        width:80%
        margin:auto
        color: #867e7e
        .city
          position: absolute
          right: 39px
          width: 50%
          height: 43px
          text-align: right
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
      .choose_right
        color:#4a78e8
        background-image:url("../../images/rightbule.png")
        background-repeat: no-repeat
        background-size: 23px
        background-position-x: 0px
        background-position-y: 11px
        position: absolute
        right: 16px
        top: 0
        width: 20px
        height: 43px
      .choose_time
        background-position-x:89px
        width:107px
  .v-modal
    background: black
    opacity: 0.5
</style>
