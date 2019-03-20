<template>
  <!--个人排名-->
  <div class="virank">
    <header class="head-tab">
      <ul class="head-ul">
        <li class="head-li back-con"><span class="back" @click="rankback()">返回</span></li>
        <li class="head-li" >
          {{this.paraname}}-精英排名
        </li>
        <li class="head-li">
          <img alt="" src="../../images/06@2x.png" class="image-com" @click="prompt()">
        </li>
      </ul>
    </header>
    <div class="visit-mc">本人排名：{{this.interestRateRanking}}</div>
    <div class="visi-table">
      <table class="vitable">
        <thead class="visthead">
        <tr>
          <td class="vithead-td thead-td1">排名</td>
          <td class="vithead-td">隶属分公司</td>
          <td class="vithead-td thead-td3">姓名</td>
          <td class="vithead-td">{{this.paraname}}(万元)</td>
        </tr>
        </thead>
        <tbody class="visitbody" v-if="this.paramstype==1">
        <!--年化业绩排名-->
        <tr class="visibody-tr" v-for="item in rankdateyear">
          <td>{{item.interestRateRanking}}</td>
          <td>{{item.branchName}}</td>
          <td>{{item.name}}</td>
          <td>{{item.interestRateTest}}</td>
        </tr>
        </tbody>
        <tbody class="visitbody" v-if="this.paramstype==2">
        <!--年化业绩排名-->
          <tr class="visibody-tr" v-for="item in rankdateyear">
            <td>{{item.investmentAmountSumRanking}}</td>
            <td>{{item.branchName}}</td>
            <td>{{item.name}}</td>
            <td>{{item.investmentAmountSumTest}}</td>
          </tr>
        </tbody>
        <tbody class="visitbody" v-if="this.paramstype==3">
          <!--月规模业绩排名-->
          <tr class="visibody-tr" v-for="item in rankdateyear">
            <td>{{item.interestRateRanking}}</td>
            <td>{{item.branchName}}</td>
            <td>{{item.name}}</td>
            <td>{{item.interestRateTest}}</td>
          </tr>
        </tbody>
        <tbody class="visitbody" v-if="this.paramstype==4">
          <!--月规模业绩排名-->
          <tr class="visibody-tr" v-for="item in rankdateyear">
            <td>{{item.investmentAmountSumRanking}}</td>
            <td>{{item.branchName}}</td>
            <td>{{item.name}}</td>
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
        dataYear: InterFace.datayear,//个人当天规模业绩，年化业绩排名
        apiGetPerFormanceRateTeamRank: InterFace.apiGetPerFormanceRateTeamRank,//个人年化业绩前30名
        apiGetPerFormanceTeamRank: InterFace.apiGetPerFormanceTeamRank ,//团队规模业绩前10名
        apiGetPerFormanceTeamRankToMonth: InterFace.apiGetPerFormanceTeamRankToMonth//团队当月规模业绩，年化业绩排名
      }
    }
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
        UsersId: this.params
      }
      this.cod = JSON.stringify(code)
      this.paramstype = this.$route.params.codtype //排名类型
      if (this.paramstype === 1) {
        this.paraname = '年化业绩'
        var cha = (data) => {
          console.log(data)
          this.interestRateRanking = data.result.interestRateRanking
        }
        Global.Ajax.post(Global.page.url.Request + this.interface.dataYear, this.cod, cha)

        //年化业绩前10名
        let code2 = {
          UsersId: this.params,
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
          UsersId: this.params,
          Type: 0
        }
        this.cod2 = JSON.stringify(code2)
        var cha2 = (data) => {
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
          UsersId: this.params,
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
          UsersId: this.params,
          Type: 1
        }
        this.cod2 = JSON.stringify(code2)
        var cha2 = (data) => {
          this.rankdateyear = data.result
          console.log(this.rankdateyear)
        }
        Global.Ajax.post(Global.page.url.Request + this.interface.apiGetPerFormanceTeamRank, this.cod2, cha2)
      }
    },
    rankback () {
      this.$router.go(-1)
    },
    prompt () {
      MessageBox('', '个人的年化业绩/规模业绩，只显示前30名。团队的年化业绩/规模业绩，只显示团队前10名。排名根据录入系统的业绩实时变化')
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
          flex:1
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
          text-indent: 0.4rem
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
        margin-bottom: 85px
        .visthead
          text-align:center
          height:36px
          line-height:36px
          background:#497be9
          .vithead-td
            border:1px solid
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
            height:35px
            line-height:35px
            border-bottom: 1px solid #e0e3e5;
</style>
