<template>
    <div>
      <v-header :title="title" :showspan="showright"></v-header>
      <scroller class="approgo_scroller">
        <!-- @click.native="putmeass('v1')"-->
        <mt-cell class="edichose" title="选择被续投订单" @click.native="putmea('v1')"  is-link>
          <span>YS123434</span>
        </mt-cell>
        <div class="applist">
          <mt-cell class="ediname" title="出借人">
            <span class="edinamespan">客户姓名</span>
          </mt-cell>
          <mt-cell class="ediname" title="合同金额">
            <span class="edinamespan"></span>
          </mt-cell>
          <mt-cell class="ediname" title="到期金额">
            <span class="edinamespan"></span>
          </mt-cell>
          <mt-cell class="ediname" title="到期日期">
            <span class="edinamespan" @click="openPicker()"></span>
          </mt-cell>
          <mt-cell class="ediname" title="应支付利息">
            <span class="edinamespan"></span>
          </mt-cell>
          <mt-cell class="ediname" title="还款日期">
            <span class="edinamespan"></span>
          </mt-cell>
        </div>
        <div class="go_img">
          <mt-cell class="ediname" title="上传续约申明">
          </mt-cell>
          <div class="img_add">
              <img class="add_an" src="../../images/add2.png"/>
              <input type="file" id="fileinput" class="fileinput" accept="image/*" @change="fileinput($event)">
              <img v-if="imgshow" id="upload" class="uploadimg" :src="this.imgurl" alt="" width="100" height="100">
          </div>
        </div>
      </scroller>
    </div>
</template>

<script>
import header from '../../common/header/header'
import {Cell} from 'mint-ui'
import Vue from 'vue'
Vue.component(Cell.name, Cell)
export default {
  name: "approval_go",
  data () {
    return {
      title: '订单续投申请',
      showspan: true,
      showright: true,
      // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
      phoneVisible: false,
      imgurl: '',
      imgshow: false,
      startDate: new Date(),
      dateTime: ''
    }
  },
  components: {
    'v-header': header
  },
  methods: {
    fileinput (ev) {
      console.log(ev)
      this.imgshow = true
      const file = ev.target.files[0]
      this.imgObj = ev.target.files[0]
      let obj = new FileReader()
      obj.readAsDataURL(file)
      obj.onload = () => {
        this.picReduce(obj.result, 'imgurl')
      }
    },
    // 图片压缩
    picReduce (picObj, callback) {
      let img = new Image()
      img.src = picObj
      img.onload = () => {
        const w = img.width
        const h = img.height
        const scale = w/h
        const max_w=w>1080?1080:w
        const max_h = h*max_w/w
        let canvas = document.createElement("canvas")
        let ctx = canvas.getContext('2d')
        canvas.width = max_w
        canvas.height = max_h
        ctx.drawImage(img, 0, 0, max_w, max_h)
        var base64 = canvas.toDataURL('image/jpeg', 0.7)
        if (callback === 'imgurl') {
          this.imgurl = base64
        } else {
          this.headPortrait = base64
        }
      }
    },
    openPicker () {
      this.$refs.picker.open()
    },
    putmea () {
      //选择被续投订单
      this.$router.push('/visitlist')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .approgo_scroller
    margin-top:51px
    background:#ecf0f8
    .ediname
      color: #0B0B0B
      border-1px(#ebebeb)
    .edichose
      margin-top:12px
      margin-bottom:12px
    .applist
      .ediname
        .edinamespan
          padding-right: 23px
          width: 100px
          height: 17px
          text-align: right
    .go_img
      margin-top:12px
      .img_add
        border-1px(#ebebeb)
        height:150px
        background:#ffffff
        .add_an
          width: 80px
          display: block
          margin: auto
          padding-top: 32px
        .fileinput
          position: absolute
          width: 80px
          height: 80px
          display: block
          top: 0
          left: 0
          right: 0
          margin: auto
          margin-top: 28px
          opacity: 0
        .uploadimg
          position: absolute
          width: 100px
          height: 100px
          display: block
          top: 0
          left: 0
          right: 0
          margin: auto
          margin-top: 28px
</style>
