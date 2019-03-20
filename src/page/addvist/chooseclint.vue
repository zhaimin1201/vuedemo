<template>
    <div>
      <v-header :title="title" :showspan="showright"></v-header>
      <form action="" target="frameFile">
        <button @click="search()">搜索</button>
        <mt-search
          autofocus
          v-model="value"
          cancel-text="取消"
          placeholder="输入客户编号查询"
          @keyup.enter.native="search(value)"
        >
        </mt-search>

      </form>
      <scroller class="lint_scoll" :on-refresh="refresh" :on-infinite="infinite" ref="scrollerBottom">
        <div class="listview">
          <div class="viewcon" v-for="item in items">
            <div class="viewcon_name">
              <!--<span class="viewconchose viewconchos2"></span>-->
              <label><input type="checkbox" name="abc" @click="Usermessage(item.customerName,item, item.id)" v-model="item.state"><i >✓</i></label>
              <span class="vistspan">{{item.customerName}}</span>
            </div>
            <div class="viewcon_name viewcon">
              <span class="vistspan vispan1">证件号码:</span>
              <span class="vistspan">{{item.identityId}}</span>
            </div>
          </div>
        </div>
      </scroller>
      <div class="chosbotn">
        <ul class="botn_ul">
          <li class="ul_li btn_chose">
            <span>已选择</span>
            <!--<p class="username" v-for="item in custorname">-->
              <!--<span class="username_span">{{item}}</span>-->
            <!--</p>-->
            <p class="username">
              {{this.strcustname}}
            </p>
          </li>
          <li class="ul_li btn_sure">
            <button @click="suer()">确定</button>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import header from '../../common/header/header'
import Vue from 'vue'
import {Global} from '../../config/golobal'
import {RELoad} from '../../config/load'
import {InterFace} from '../../config/userapi'
import { Search, Radio } from 'mint-ui'

Vue.component(Search.name, Search)
Vue.component(Radio.name, Radio)
export default {
  data () {
    return {
      title: '选择客户',
      showright: false,
      scrollshow: true,
      value: '',
      defaultResult2: [],
      custorlist: [],
      items: [],
      MaxResultCount: 6,//每页显示用户的个数
      PageIndex: 1, //第几页
      SearchCustomerCode: '',
      SearchCustomerName: '',
      identityId: '',
      cod: '',
      custorname: [],
      strcustname: '',
      cusnameid: []
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to)
      console.log(from)
    }
  },
  created () {
    this.init()
  },
  computed: {
  },
  methods: {
    common () {
      let code = {
        PageIndex: this.PageIndex,
        MaxResultCount: this.MaxResultCount,
        SearchCustomerCode: this.SearchCustomerCode,
        SearchCustomerName: this.SearchCustomerName
      }
      this.cod = JSON.stringify(code)
    },
    init (done) {
      this.common()
      var cha = (data) => {
        this.items = data.result.items
        this.defaultResult2 = data.result.items
        this.identityId = data.result.items.identityId
        console.log(this.items)
        setTimeout(() => {
          setTimeout(() => {
            done && done(true)
          }, 1000)
        })
        // this.defaultResult2 = data.result.items
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.apiGetUser, this.cod, cha)
    },
    refresh (done) {
      //刷新
      this.PageIndex = 1
      this.init(done)
    },
    infinite (done) {
      this.PageIndex++
      this.nextpage(done)
      //加载
      if (this.defaultResult2) {
        //当没有更多数据的时候结束加载
        this.loadingTips ="无更多数据"
        setTimeout(() => {
          setTimeout(() => {
            done && done(true)
          }, 1000)
        })
      }
    },
    nextpage () {
      this.common()
      var cha = (data) => {
        this.defaultResult2 = data.result.items
        console.log(this.items)
        console.log(data.result.items)
        let len = data.result.items.length
        for (var i = 0; i < len; i++) {
          this.items.push(data.result.items[i])
        }
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.apiGetUser, this.cod, cha)
    },
    search () {
      this.SearchCustomerCode = 'CM4784'
      this.PageIndex = 1
      this.init()
    },
    Usermessage (name, item, id) {
      console.log(name)
      console.log(id)
      let nameuser = name + ' '
      item.state = !item.state
      if (item.state === true) {
        this.custorname.push(nameuser)
        console.log(this.custorname)
        let name2 = this.custorname
        this.strcustname = name2.join('')
       // this.cusnameid.add(custorObj)
        //选择客户的id
        this.cusnameid.push(id)
        console.log(this.cusnameid)
      } else {
        this.custorname.remove(nameuser)
        let name2 = this.custorname
        this.strcustname = name2.join('')
        //删除用户id
        this.cusnameid.remove(id)
        console.log(this.cusnameid)
      }

    },
    suer () {
      if (this.strcustname) {
        sessionStorage.setItem('custorname', this.strcustname)
        this.cusnameid = JSON.stringify(this.cusnameid)
        console.log(this.cusnameid)
        sessionStorage.setItem('custor', this.cusnameid)
      }
      this.$router.push('/addvist')
    }
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/chose2.css'
  @import "../../common/stylus/mixin.styl"
  .lint_scoll
    margin-top: 105px
    background-color: #ecf0f8
    .listview
      margin-top: 12px
      background: #eff0f4
      margin-bottom:10px
      .viewcon
        background: #ffffff
        margin-bottom: 10px
        .viewcon_name
          height: 43px
          line-height: 43px
          border-1px(#E0E3E5)
          padding-left:16px
          text-indent: 10px
          display: block
          .vistspan
            font-size:15px
            text-indent: 9px
            display: inline-block
          .vispan1
            text-indent:32px
          .viewconchose
            border:1px solid #9d9d9d
            display: inline-block
            width:11px
            height:11px
          .viewconchos2
            border:1px solid #4a78e8
            background:#4a78e8
      .viewcon
        text-indent: 26px
  .chosbotn
    border-top: 1px solid #eff0f4
    position: fixed
    width: 100%
    bottom: 0
    background:#ffffff
    height:44px
    .botn_ul
      display:flex
      height: 42px
      line-height: 42px
      .ul_li
        flex:1
        font-size:15px
      .btn_sure
        text-align:right
        padding-right:15px
        button
          font-size: 13px
          color:#4a78e8
          width:60px
          height 30px
          border:1px solid #4a78e8
          border-radius: 8px
          background: #ffffff
      .btn_chose
        flex: 5
        padding-left:15px
        .username
          display:inline-block
          color:#4a78e8
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          float: right
          width: 80%
          .username_span
            margin-right:4px
</style>
