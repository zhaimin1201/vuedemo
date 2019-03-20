<template>
    <div class="work">

      <mt-search cancel-text="取消"
                   placeholder="输入客户姓名或合同编号">
        </mt-search>
        <!--订单与用户切换-->
        <div class="butt">
          <mt-navbar class="butcon">
            <mt-button size="small"
             @click.native.prevent="active = 'tab-container1'"
             @click="order()" v-bind:class="chos1==true ? 'order-one':'order-two'" id="ord">订单
            </mt-button>
            <mt-button size="small" @click.native.prevent="active = 'tab-container2'"
             @click="user()" v-bind:class="chos2==true?'order-one':'order-two'" id="uss">客户
            </mt-button>
          </mt-navbar>
        </div>
      <scroller  ref="myscroller">
        <div class="page-tab-container">
          <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
            <mt-tab-container-item id="tab-container1">
              <!-- cell组件 -->
              <!--<mt-cell v-for="n in 10" title="tab-container 1"></mt-cell>-->
              <ul class="ul-container">
                <li class="code-ht">
                  <span class="ht-coo">合同编号：</span>
                  <span>YSY2939939</span>
                  <span class="code-status">未提交</span>
                </li>
                <li>
                  <span>客户姓名：</span>
                  <span>刘德华</span>
                </li>
                <li>
                  <span>产品名称：</span>
                  <span>YSY2939939</span>
                </li>
                <li>
                  <span>年化收益：</span>
                  <span>10%</span>
                </li>
                <li>
                  <span>起息日期：</span>
                  <span>YSY2939939</span>
                </li>
                <li class="code-ht code-btn">
                  <button class="code-delet">删除</button>
                  <button class="code-edit">编辑</button>
                </li>
              </ul>

              <ul class="ul-container">
                <li class="code-ht">
                  <span class="ht-coo">合同编号：</span>
                  <span>YSY2939939</span>
                  <span class="code-status">审批通过</span>
                </li>
                <li>
                  <span>客户姓名：</span>
                  <span>刘德华</span>
                </li>
                <li>
                  <span>产品名称：</span>
                  <span>YSY2939939</span>
                </li>
                <li>
                  <span>年化收益：</span>
                  <span>10%</span>
                </li>
                <li>
                  <span>起息日期：</span>
                  <span>YSY2939939</span>
                </li>
                <li class="code-ht code-btn">
                  <button class="code-delet">删除</button>
                  <button class="code-edit">编辑</button>
                </li>
              </ul>
              <div class="investment"><span>续投</span></div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
              <ul class="ul-container">
                <li class="code-ht">
                  <span class="ht-coo">客户姓名：</span>
                  <span>刘德华</span>
                  <span class="code-status">客户类型</span>
                </li>
                <li>
                  <span>客户编号：</span>
                  <span>刘德华</span>
                </li>
                <li>
                  <span>性别：</span>
                  <span>女</span>
                </li>
                <li>
                  <span>证件类型：</span>
                  <span>身份证</span>
                </li>
                <li>
                  <span>证件号码：</span>
                  <span>YSY2939939</span>
                </li>
                <li class="code-ht code-btn">
                  <button class="code-delet">删除</button>
                  <button class="code-edit code-cc">变更</button>
                  <button class="code-edit code-cc">预约</button>
                  <button class="code-edit">+基金订单</button>
                  <button class="code-edit">订单</button>
                </li>
              </ul>
              <div class="investment"><span>添加客户</span></div>
              <!-- cell组件 -->
              <!--<mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>-->
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </scroller>
      <r></r>
    </div>
</template>

<script>
import footer from '../../common/footer/footer'
import Vue from 'vue'
import { Search, Navbar, TabItem, TabContainer, TabContainerItem, Cell, Button } from 'mint-ui'
Vue.component(Search.name, Search)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Cell.name, Cell)
Vue.component(Button.name, Button)
export default {
  name: 'page-tab-container',
  data () {
    return {
      active: 'tab-container1',
      chos1: true,
      chos2: false
    }
  },
  watch: {
    active: function (newValue) {
      console.log(newValue)
      if (newValue == "tab-container1") {
        this.chos1 = true
        this.chos2 = false
      }else {
        this.chos1 = false
        this.chos2 = true
      }
      // active即为mt-tab-container的参数，这里监听它的改变并可以做相关操作：
      // 在你的tabBar组件点击的时候更改active的值
      // 滑动mt-tab-container-item组件即更改active的值，监听newValue的变化并操作你的tabBar，使得点击切换和滑动切换相关联
    }
  },
  methods: {
    order: function () {
      this.chos2 = false
      this.chos1 = true
    },
    user: function () {
      this.chos2 = true
      this.chos1 = false
    }
  },
  components: {
    'v-footer': footer
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  import '../../assets/my-mint'
  .work
    width: 100%
    height: 100%
    background:#ECF0F8
  .code-btn
    text-align:right
    button
      margin-right: 12px
    .code-delet
      color: #929292
      padding: 3px 14px 3px 14px
      border-radius: 5px
      border: 1px solid
      background: #fff
    .code-edit
      color: #4A78E8
      padding: 3px 14px 3px 14px
      border-radius: 5px
      border: 1px solid
      background: #fff
</style>
