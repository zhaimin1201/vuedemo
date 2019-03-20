<template>
    <div>
      <div class="approcon" v-if="this.con">
        <header class="head-tab">
          <ul>
            <li class="back-con"><span class="back" @click="$router.back(-1)">返回</span></li>
            <li class="visodata" >
              <span @click="showTitle()">{{this.title}}</span>
            </li>
            <li class="visoadd" >
              <img src="../../images/add.png" alt="" @click="addOrder()">
            </li>
          </ul>
          <transition  name="slide-down">
            <ul class="select-options" v-show="selectStatus">
              <li class="select-option-item">我提交得申请</li>
              <li class="select-option-item">待审批</li>
              <li class="select-option-item">已审批</li>
            </ul>
          </transition>
        </header>
        <scroller class="approval_scroller">
          <div class="approval_type">
            <ul class="type_ul">
              <li class="type_li">
                <p class="type_title">客户归属变更申请</p>
                <div class="type_con">
                  <p class="type_con_p">
                    <span>申请审批人:</span> <span>朱秋雨</span>
                  </p>
                  <p class="type_con_p">
                    <span>隶属分公司:</span> <span>汤臣分公司</span>
                  </p>
                  <p class="type_con_p">
                    <span>提交时间:</span> <span>2018-09-25 13：12</span>
                  </p>
                </div>
              </li>
            </ul>
            <ul class="type_ul">
              <li class="type_li">
                <p class="type_title">客户归属变更申请</p>
                <div class="type_con">
                  <p class="type_con_p">
                    <span>申请审批人:</span> <span>朱秋雨</span>
                  </p>
                  <p class="type_con_p">
                    <span>隶属分公司:</span> <span>汤臣分公司</span>
                  </p>
                  <p class="type_con_p">
                    <span>提交时间:</span> <span>2018-09-25 13：12</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="nodata" v-if="nodata">
            <img class="nodata_icon" src="../../images/approval.png" width="50">
            <p class="nodata_p">暂时没有相关数据</p>
          </div>
        </scroller>
      </div>
      <div class="process" v-if="this.chose">
        <div class="process_title">
          选择一个审批流程
          <img class="process_imge" src="../../images/close2.png" @click="choses()">
        </div>
        <div class="process_chose">
          <router-link tag="div" class="chose1" to="/approvalgo">订单续投审批</router-link>
          <router-link tag="div" class="chose2" to="/customerchange">客户归属变更审批</router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "approval",
  data () {
    return {
      title: '我提交得申请',
      selectStatus: false,
      nodata: false, //没有相关数据
      con: true,
      chose: false
    }
  },
  methods: {
    showTitle () {
      this.selectStatus = !this.selectStatus
      console.log(this.selectStatus)
    },
    addOrder () {
      this.con = !this.con
      this.chose = !this.chose
    },
    choses () {
      this.con = !this.con
      this.chose = !this.chose
    }
  }
}
</script>

<style scoped lang="stylus"  rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .approcon
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
    .approval_scroller
      margin-top:51px
      background:#ecf0f8
    .nodata
      margin-top: 57%;
      .nodata_icon
        display:block
        margin:auto
      .nodata_p
        color: #bbb
        font-size: 16px
        text-align:center
    .approval_type
      .type_ul
        background: #fff
        margin-top: 12px
        .type_li
          .type_title
            border-1px(#E0E3E5)
            text-indent: 37px
            font-size: 16px
            height: 43px
            line-height: 43px
            color: #333
        .type_con
          padding-bottom:6px
          padding-top:21px
          .type_con_p
            color:#5b5757
            text-indent: 37px
            margin-bottom:15px
  .process
    background:#f5f5f5
    position:fixed
    width: 100%
    height:100%
    .process_title
      color: #4a78e8
      font-weight:bold
      text-align: center
      font-size: 16px
      margin-top: 15px
      .process_imge
        display: inline-block
        width: 20px
        position: absolute
        right: 16px
        top: 12px
    .process_chose
      margin-top:90px
      .chose1, .chose2
        font-size: 15px
        height: 38px
        line-height: 38px
        width: 244px
        margin auto
        border: 1px solid #4a78e8
        border-radius:8px
        text-align: center
        margin-bottom:22px
</style>
