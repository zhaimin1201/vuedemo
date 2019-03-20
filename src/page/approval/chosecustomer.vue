<template>
  <div>
    <v-header :title="title" :showspan="showright"></v-header>
    <mt-search
      autofocus
      v-model="value"
      :result="filterResult">
    </mt-search>
    <scroller class="addvist_scoll">
      <div class="listcon">
        <div style="margin-top: 10px">
          <div class="listcon_div">
            <div class="check-area" v-show="items.length!=0">
              <ul>
                <li class="border-1px" v-for="(item,index) in items">
                  <div class="customername">
                    <input class="self-checkbox" type="checkbox"
                           :id="'checkbox-'+item.id"
                           :data-id="'food-'+item.id" name="radio"
                           :value="item.value"
                           v-model="checkValues"
                           @click="setCheckValue($event,item)">
                    <label :for="'checkbox-'+item.id"></label>
                    <span>客户姓名</span>
                  </div>
                  <span class="zjnumber">证件号码: </span>
                  <span>{{item.value}}</span>
                </li>
              </ul>
              <p>您选择了：<span v-show="checkValues.length">{{filterCheckValues}}</span></p>
              <!--<div class="btn">-->
                <!--<button @click="showCheck(checkIds)">按钮</button>-->
                <!--<span v-show="checkIds.length">{{checkIds}}</span>-->
              <!--</div>-->
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import header from '../../common/header/header'
import Vue from 'vue'
import {Search} from 'mint-ui'
Vue.component(Search.name, Search)
var itemData = [
  {id: '20170811001', value: '香蕉'},
  {id: '20170811002', value: '苹果'},
  {
    id: '20170811003',
    value: '梨子'
  }, {id: '20170811004', value: '葡萄'}]
//itemData = [];
export default {
  data () {
    return {
      title: '选择客户',
      showright: false,
      value: '',
      // 默认数据
      defaultResult: [
        'Apple',
        'Banana',
        'Orange',
        'Durian',
        'Lemon',
        'Peach',
        'Cherry',
        'Berry',
        'Core',
        'Fig',
        'Haw',
        'Melon',
        'Plum',
        'Pear',
        'Peanut',
        'Other'
      ],
      scrollshow: true,
      items: '',
      checkValues: [],
      checkIds: []
    }
  },
  computed: {
    filterResult () {
      let filvalue = this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value))
      if (filvalue.length > 0) {
        //搜到到结果展示在页面
        console.log(this.scrollshow)
        return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value))
        this.scrollshow = !this.scrollshow
      } else {
        this.listview = false
        alert('没有更多数据')
      }
      // console.log(filvalue)
    },
    //多选
    filterCheckValues: function () {
      var value = this.checkValues
      var reValue = ''
      for (var i = 0; i < value.length; i++) {
        reValue += value[i] + '、'
      }
      reValue = reValue.substring(0, reValue.length - 1)
      return reValue
    }
  },
  components: {
    'v-header': header
  },
  methods: {
    initData: function () {
      var self = this;
      self.items = itemData;
      if (itemData.length != 0) {
//   self.checkValues[0] = self.items[0].value;
//   self.checkIds[0] = 'food-' + self.items[0].id;
      }
    },
    setCheckValue: function (ev, item) {
      var id = 'food-' + item.id;
      if (ev.target.checked) {
        this.checkIds.push(id);
      } else if (this.checkIds.indexOf(id) > -1) {
        this.checkIds.remove(id);
      }
    }
    ,
    showCheck: function () {
      console.log(this.checkIds)
    }
  },
  filter: {},
  mounted: function () {
    this.initData();
  }
}
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
}
</script>

<style scoped lang="stylus"  rel="stylesheet/stylus">
  @import "../../common/stylus/chose.css"
  @import "../../common/stylus/mixin.styl"
  .addvist_scoll
    margin-top: 105px
    background-color: #ecf0f8
</style>
