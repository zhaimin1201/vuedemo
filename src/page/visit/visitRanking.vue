<template>
  <!--团队排名-->
  <div class="virank">
    <header class="head-tab">
      <ul class="head-ul">
        <li class="head-li back-con"><span class="back" @click="rankback()">返回</span></li>
        <li class="head-li back-on2" >
          {{this.paraname}}-团队排名
        </li>
        <li class="head-li">
          <img alt="" src="../../images/06@2x.png" class="image-com" @click="prompt()">
        </li>
      </ul>
    </header>
    <div class="visit-mc">团队排名：{{this.interestRateRanking}}</div>
    <div class="visi-table">
      <table class="vitable">
        <thead class="visthead">
          <tr>
            <td class="vithead-td">排名</td>
            <td class="vithead-td">主管团队名称</td>
            <td class="vithead-td">所属分公司</td>
            <td class="vithead-td">团队负责人</td>
            <td class="vithead-td">{{this.paraname}}(万元)</td>
          </tr>
        </thead>
        <tbody class="visitbody" v-if="this.paramstype==1">
         <!--日年化业绩排名-->
          <tr class="visibody-tr" v-for="item in rankdateyear">
            <td><span class="visibody-span">{{item.interestRateRanking}}</span></td>
            <td>{{item.departmentName}}</td>
            <td>{{item.branchName}}</td>
            <td>{{item.leaderName}}</td>
            <td>{{item.interestRateTest}}</td>
          </tr>
        </tbody>
        <tbody class="visitbody" v-if="this.paramstype==2">
          <!--日规模业绩排名-->
          <tr class="visibody-tr" v-for="item in rankdateyear">
            <td><span class="visibody-span">{{item.investmentAmountSumRanking}}</span></td>
            <td>{{item.departmentName}}</td>
            <td>{{item.branchName}}</td>
            <td>{{item.leaderName}}</td>
            <td>{{item.investmentAmountSumTest}}</td>
          </tr>
        </tbody>
        <tbody class="visitbody" v-if="this.paramstype==3">
          <!--本月年化业绩排名 -->
          <tr class="visibody-tr" v-for="item in rankdateyear">
            <td><span class="visibody-span">{{item.interestRateRanking}}</span></td>
            <td>{{item.departmentName}}</td>
            <td>{{item.branchName}}</td>
            <td>{{item.leaderName}}</td>
            <td>{{item.interestRateTest}}</td>
          </tr>
        </tbody>
        <tbody class="visitbody" v-if="this.paramstype==4">
        <!--本月规模业绩排名-->
        <tr class="visibody-tr" v-for="item in rankdateyear">
          <td><span class="visibody-span">{{item.investmentAmountSumRanking}}</span></td>
          <td>{{item.departmentName}}</td>
          <td>{{item.branchName}}</td>
          <td>{{item.leaderName}}</td>
          <td>{{item.investmentAmountSumTest}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {Global} from '../../config/golobal'
import {InterFace} from '../../config/userapi'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      params: 0,
      cod: '',
      cod2: '',
      rankdateyear: [],
      paraname: '',//业绩类型名称
      paramstype: 1, //排名类型
      interestRateRanking:'',//本业绩排名
      interface: {
        dataYear: InterFace.dataYear,//本日年化业绩排名
        apiGetPerFormanceRateTeamRank: InterFace.apiGetPerFormanceRateRanks,//团队年化业绩前10名
        apiGetPerFormanceTeamRank: InterFace.apiGetPerFormanceTeamRank2,//团队规模业绩前10名
        apiGetPerFormanceTeamRankToMonth: InterFace.apiGetPerFormanceTeamRankToMonth2//团队当月规模业绩，年化业绩排名
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(to)
    console.log(from)
    if(from.name === 'Visteam') {
      from.meta.keepAlive = true
    }
    next()
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.$route.params.visicod) {
        this.params = this.$route.params.visicod
      } else {
        this.params = 0
      }
      let code = {
        DepartmentId: this.params
      }
      this.cod = JSON.stringify(code)
      this.paramstype = this.$route.params.codtype //排名类型
      if (this.paramstype === 1) {
        this.paraname = '年化业绩'
        var cha = (data) => {
          this.interestRateRanking = data.result.interestRateRanking
        }
        Global.Ajax.post(Global.page.url.Request + this.interface.dataYear, this.cod, cha)

        //团队年化业绩前10名
        let code2 = {
          DepartmentId: this.params,
          Type: 0
        }
        this.cod2 = JSON.stringify(code2)
        var cha2 = (data) => {
          this.rankdateyear = data.result
          console.log(this.rankdateyear)
        }
        Global.Ajax.post(Global.page.url.Request + this.interface.apiGetPerFormanceRateTeamRank, this.cod2, cha2)
      }
      if (this.paramstype === 2) {
        this.paraname = '规模业绩'
        var cha = (data) => {
          this.interestRateRanking = data.result.investmentAmountSumRanking
        }
        Global.Ajax.post(Global.page.url.Request + this.interface.dataYear, this.cod, cha)

        //团队规模业绩前10名
        let code2 = {
          DepartmentId: this.params,
          Type: 0
        }
        this.cod2 = JSON.stringify(code2)
        var cha2 = (data) => {
          console.log(222)
          console.log(data)
          this.rankdateyear = data.result
          console.log(this.rankdateyear)
        }
        Global.Ajax.post(Global.page.url.Request + this.interface.apiGetPerFormanceTeamRank, this.cod2, cha2)
      }
      if (this.paramstype === 3) {
        this.paraname = '年化业绩'
        var cha = (data) => {
          this.interestRateRanking = data.result.interestRateRanking
        }
        Global.Ajax.post(Global.page.url.Request + this.interface.apiGetPerFormanceTeamRankToMonth, this.cod, cha)

        //团队年化业绩前10名
        let code2 = {
          DepartmentId: this.params,
          Type: 1
        }
        this.cod2 = JSON.stringify(code2)
        var cha2 = (data) => {
          this.rankdateyear = data.result
          console.log(this.rankdateyear)
        }
        Global.Ajax.post(Global.page.url.Request + this.interface.apiGetPerFormanceRateTeamRank, this.cod2, cha2)
      }
      if (this.paramstype === 4) {
        this.paraname = '规模业绩'
        var cha = (data) => {
          this.interestRateRanking = data.result.investmentAmountSumRanking
        }
        Global.Ajax.post(Global.page.url.Request + this.interface.apiGetPerFormanceTeamRankToMonth, this.cod, cha)

        //团队规模业绩前10名
        let code2 = {
          DepartmentId: this.params,
          Type: 1
        }
        this.cod2 = JSON.stringify(code2)
        var cha2 = (data) => {
          console.log(222)
          console.log(data)
          this.rankdateyear = data.result
          console.log(this.rankdateyear)
        }
        Global.Ajax.post(Global.page.url.Request + this.interface.apiGetPerFormanceTeamRank, this.cod2, cha2)
      }
    },
    prompt () {
      MessageBox('', '个人的年化业绩/规模业绩，只显示前30名。团队的年化业绩/规模业绩，只显示团队前10名。排名根据录入系统的业绩实时变化')
    },
    rankback () {
      this.$router.goBack()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .virank
    position:absolute
    height: 100%
    width: 100%
    background: #ffffff
    .head-tab
      height: 50px
      line-height: 50px
      background: #497be9
      color: #fff
      .head-ul
        display:flex
        .head-li
          font-size:16px
          text-align: center
          .image-com
            display: inline-block
            width:20px
            height:20px
            position: absolute
            right: 12px
            margin-top: 17px
        .back-con
          flex:1
          text-indent: 0.4rem
          text-align: left
        .back-on2
          flex:2
          text-align: left
        .back
          background:url("../../images/back2.png")
          background-repeat:no-repeat
          background-size:25px
          text-indent: 29px
          display: inline-block
          background-position-y: 14px
        .visimess
          .image-com
            display: inline-block
            width:20px
            height:20px
            position: absolute
            right: 12px
            margin-top: 17px
    .visit-mc
      text-align: center
      height: 35px
      line-height: 35px
      font-size: 13px
      color:#7e8c8d
    .visi-table
      background: #ffffff
      .vitable
        width: 95%
        margin: auto
        color: #ffffff
        font-size:12px
        .visthead
          text-align:center
          line-height:18px
          background:#497be9
          .vithead-td
            border:1px solid
            min-width: 50px
            vertical-align: middle
            padding-top: 3px
            padding-bottom: 3px
            padding-right: 6px
            padding-left: 6px
          .thead-td1
            padding-left: 4px
            padding-right: 4px
          .thead-td3
            padding-left: 10px
            padding-right: 10px
        .visitbody
          color:#7e8c8d
          text-align:center
          .visibody-tr
            height:18px
            line-height:18px
            border-bottom: 1px solid #e0e3e5
            td
              vertical-align: middle
              padding-bottom: 5px
              padding-top: 5px
              .visibody-span
                display: inline-block
                width: 17px
                height: 17px
                line-height: 17px
                border-radius: 50%
                background: #497be9
                color: #fff
</style>
