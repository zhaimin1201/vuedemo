<template>
    <div class="edipersonal">
      <header class="myhead-tab">
        <ul>
          <li class="back-con visodata"><span class="back" @click="$router.back(-1)">返回</span></li>
          <li class="visodata viuser" >
            <span>编辑个人资料</span>
          </li>
          <li class="visoadd visodata" @click="save()">
            保存
          </li>
        </ul>
      </header>
      <scroller  ref="myscroller" style="top: 51px;">
        <div class="scrolmy">
          <div class="mybody">
            <img src="../../images/bg-my@2x.png" alt="" height="165" width="100%">
          </div>
          <div class="headport">
            <input type="file" accept="image/*" class="photomy" @change="headinput($event)">
          <img @click="exitmase()" class="headphone" v-show="!headPortrait" src="../../images/touxiang.png" alt="" width="65" height="65">
          <img @click="exitmase()" v-show="headPortrait" class="headphone" :src="'http://yinlaijinfu.yinlaicaifu.com/'+ this.headPortrait" width="65" height="65">
          </div>
          <div class="edilist">
            <mt-cell class="ediname" title="员工姓名:" @click.native="putmeass('v1')" is-link>
              <span class="edinamespan">{{this.name}}</span>
            </mt-cell>
            <mt-cell class="ediname" title="员工昵称:" @click.native="putmeass(1)" is-link>
              <span class="edinamespan">{{this.surname}}</span>
            </mt-cell>
            <mt-cell class="ediname" title="员工编号:" @click.native="putmeass('v2')" is-link>
              <span class="edinamespan">{{this.userSerialNumber}}</span>
            </mt-cell>
            <mt-cell class="ediname" title="职务:"  @click.native="putmeass(2)" is-link>
              <span class="edinamespan">{{this.postName}}</span>
            </mt-cell>
            <mt-cell class="ediname" title="公司名称:" @click.native="putmeass(3)" is-link>
              <span class="edinamespan">{{this.CorporateName}}</span>
            </mt-cell>
            <mt-cell class="ediname" title="联系方式:" @click.native="putmeass(4)" is-link>
              <span class="edinamespan">{{this.tel}}</span>
            </mt-cell>
            <mt-cell class="ediname" title="所在城市:" @click.native="chosecity()"  is-link>
              <span class="edinamespan">{{this.city}}</span>
            </mt-cell>
            <mt-cell title="个人简介"></mt-cell>
            <div class="ediname editextarea">
              <textarea class="texral" id="textra">{{this.PersonalProfile}}</textarea>
            </div>
            <!--<mt-cell title="微信二维码"></mt-cell>-->
            <div class="ediname ediweima" @click="actionSheet">
              <p v-if="!this.ErWeiMa" class="ediweimatext">上传个人二维码</p>
              <img id="upload" class="uploadimg" :src="'http://yinlaijinfu.yinlaicaifu.com/'+ this.ErWeiMa" alt="" width="100" height="100">
              <!--<v-cropper :headerImage="headerImage"  @getHeaderImage="newHeaderImage"></v-cropper>-->
            </div>
          </div>
        </div>
      </scroller>
      <div v-if="sheetVisible" class="replececode">
        <input type="file" id="fileinput" accept="image/*" @change="fileinput($event)">
      </div>
      <mt-actionsheet
        :actions= "data"
        v-model="sheetVisible">
      </mt-actionsheet>
      <!--城市选择-->
      <div v-show="citymole" class="citysure">
        <span class="rightspan" @click="cityok()">确定</span>
        <span class="leftspan" @click="citycheck()">取消</span>
      </div>
      <mt-picker :slots="myAddressSlots" @change="onMyAddressChange" v-show="citymole"></mt-picker>
      <div class="citymole" @click="citymol()" v-show="citymole"></div>
    </div>
</template>

<script>
import { Cell, Actionsheet } from 'mint-ui'
import { Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import { Picker } from 'mint-ui'
import {Global} from '../../config/golobal'
import {InterFace} from '../../config/userapi'
import cropper from '../../page/my/cropper'
import Vue from 'vue'
import myaddress from '../../config/city'
Vue.component(Cell.name, Cell)
Vue.component(Actionsheet.name, Actionsheet)
export default {
  data () {
    return {
      surname: '',
      headerImage: '',
      picValue: '',
      name: '',//员工姓名
      userSerialNumber: '',//员工编号
      headPortrait: '',//员工头像
      userID: 0,//员工id
      postId: 0,//职务id
      postName: '',//职务
      departmentId: 0,//部门id
      tel: '',//联系电话
      city: '',//所属城市
      PersonalProfile: '',//个人简介
      ErWeiMa: '',//二维码
      CorporateName: '',//公司名称
      data:[{
        name: '删除',
        color: '#0080FF',
        method : this.getCamera	// 调用methods中的函数
      }, {
        name: '更换',
        method: this.getLibrary	// 调用methods中的函数
      }],
      // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
      sheetVisible: false,
      phoneVisible: false,
      //城市选择器
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress),  //省份数组
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot4'
        },
        {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      myAddressProvince:'省',
      myAddressCity:'市',
      myAddresscounty:'区/县',
      sheetCity: true,
      citymole: false
    }
  },
  created () {
    this.init()
  },
  components: {
    'v-cropper': cropper,
    'mt-picker': Picker
  },
  methods: {
    init () {
      console.log(22)
      this.name = this.$route.params.name
      this.userID = this.$route.params.id
      this.headPortrait = this.$route.params.HeadPortrait
      this.surname = this.$route.params.surname
      this.departmentId = this.$route.params.DepartmentId
      this.userSerialNumber = this.$route.params.UserSerialNumber
      this.postName = this.$route.params.postName
      this.postId = this.$route.params.PostId
      this.CorporateName = this.$route.params.CorporateName
      this.tel = this.$route.params.Tel
      this.city = this.$route.params.city
      this.PersonalProfile = this.$route.params.PersonalProfile
      this.ErWeiMa = this.$route.params.ErWeiMa
      console.log(this.ErWeiMa)
    },
    actionSheet () {
      // 打开action sheet
      this.sheetVisible = true
      this.phoneVisible = true
      // $('body').css('overflow', 'hidden')
    },
    getCamera: function () {
      this.ErWeiMa = ''
    },
    getLibrary: function(){
      console.log("打开相册")
    },
    // newHeaderImage (newImg) {
    //   this.headerImage = newImg
    // },
    //头像
    headinput (ev) {
      console.log(ev)
      this.sheetVisible = false
      const file = ev.target.files[0]
      this.imgObj = ev.target.files[0]
      let obj = new FileReader()
      obj.readAsDataURL(file)
      obj.onload = () => {
        this.picReduce(obj.result, 'headPortrait')
      }
    },
    fileinput (ev) {
      console.log(ev)
      this.sheetVisible = false
      const file = ev.target.files[0]
      this.imgObj = ev.target.files[0]
      let obj = new FileReader()
      obj.readAsDataURL(file)
      obj.onload = () => {
        this.picReduce(obj.result, 'ErWeiMa')
      }
    },
    // 图片压缩
    picReduce (picObj,callback) {
      let img = new Image();
      img.src=picObj;
      img.onload = () => {
        const w=img.width
        const h=img.height
        const scale = w/h
        const max_w=w>1080?1080:w
        const max_h=h*max_w/w
        let canvas=document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        canvas.width=max_w;
        canvas.height=max_h;
        ctx.drawImage(img,0,0,max_w,max_h);
        var base64 = canvas.toDataURL('image/jpeg', 0.7);
        //this.ErWeiMa = base64
        if (callback === 'ErWeiMa') {
          this.ErWeiMa = base64
        } else {
          this.headPortrait = base64
        }
      }
    },
    //输入弹框
    putmeass (val) {
      if (val === 'v1') {
        Toast('员工姓名不可更改')
      } else if (val === 'v2') {
        Toast('员工编号不可更改')
      } else {
        MessageBox.prompt('请输入').then(({ value, action }) => {
          console.log(value)
          console.log(action)
          console.log(val)
          switch (val) {
            case 1: this.surname = value
              break
            case 2: this.postName = value
              break
            case 3: this.CorporateName = value
              break
            case 4: this.phonecheck(value)
              break
          }
        })
      }
    },
    phonecheck (val) {
      console.log(val)
      let myreg = /^1[3|4|5|7|8][0-9]{9}$/  //判断是否为手机号
      if (!myreg.test(val)) {
        MessageBox('提示', '请输入正确的手机号')
      } else {
        this.tel = val
      }
    },
    //城市选择
    onMyAddressChange (picker, values) {
      if (myaddress[values[0]]) {  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
        this.myAddressProvince = values[0];
        this.myAddressCity = values[1];
        this.myAddresscounty = values[2];
      }
    },
    chosecity () {
      this.citymole = true
      $('body').css('overflow', 'hidden')
    },
    citymol () {
      this.citymole = false
      $('body').css('overflow', 'auto')
    },
    cityok () {
      this.citymole = false
      $('body').css('overflow', 'auto')
     // this.city = this.myAddressProvince + this.myAddressCity + this.myAddresscounty
      this.city = `${this.myAddressProvince}\/ ${this.myAddressCity}\/ ${this.myAddresscounty}`
    },
    citycheck () {
      this.citymole = false
      $('body').css('overflow', 'auto')
    },
    save () {
      this.PersonalProfile = $('#textra').val()
      console.log(this.PersonalProfile)
      //保存
      let code = {
        Id: this.userID,
        name: this.name,
        PostId: this.postId,
        DepartmentId: this.departmentId,
        Tel: this.tel,
        city: this.city,
        PersonalProfile: $('#textra').val(),
        HeadPortrait: this.headPortrait,
        ErWeiMa: this.ErWeiMa,
        UserSerialNumber: this.userSerialNumber,
        CorporateName: this.CorporateName,
        Surname: this.surname
      }
      let cod = JSON.stringify(code)
      var erroo = (data) => {
        console.log(data)
      }
      var cha = (data) => {
        console.log(data)
      }
      Global.Ajax.post(Global.page.url.Request + InterFace.edituser, cod, cha, erroo)
    }
    // fileinput (e) {
    //   // alert(222)
    //   let files = e.target.files || e.dataTransfer.files
    //   if (!files.length) return
    //   const imgurl = files[0]
    //   //请求失败，提示信息
    //   var erroo = (data) => {
    //     console.log(data)
    //     let instance = Toast(data)
    //     setTimeout(() => {
    //       instance.close()
    //     }, 2000)
    //   }
    //   var cha = (data) => {
    //     console.log(data)
    //   }
    //   Global.Ajax.post(Global.page.url.Request + 'api/YinLaiZhuShow/OperateUploadFile', '', cha, erroo)
    //   console.log(imgurl)
    //   console.log(e)
    // }
  },
  mounted(){
    this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0
      // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
      //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/edipersonal.styl"
  .myhead-tab
    background:#497be9
    line-height: 51px
    ul
      display:flex
      padding: 0 10px 0 10px
      .visodata
        color: #ffffff
      .back-con
        .back
          background:url("../../images/back2.png")
          background-repeat:no-repeat
          background-size:26px
          display: inline-block
          background-position-y: 14px
          text-indent: 29px
      .viuser
        text-align: center
        flex: 1
        padding-right: 5px
  .replececode
    border: 1px solid
    position: fixed
    z-index: 99999
    bottom: 52px
    height: 42px
    width: 100%
    opacity: 0
  .headport
    margin: auto
    text-align: center
    position: relative
    top: -33px
    .photomy
      opacity: 0
      position: fixed
      border: 1px solid
      width: 64px
      height: 63px
    .headphone
      border-radius:50%
  .edilist
    margin-top: -32px
    .ediname
      color: #0B0B0B
      border-1px(#ebebeb)
    .editextarea
      padding-bottom:23px
      .texral
        display:block
        width: 93%
        margin: auto
        height: 111px
        color: #929292
        resize: none
        border:1px solid #DDDDDD
    .ediweima
      background:url("../../images/weixin@1x.png")
      background-repeat: no-repeat
      width: 93%
      height: 155px
      margin: auto
      border:1px solid #ebebeb
      margin-bottom: 29px
      .ediweimatext
        position: fixed
        left: 0
        right: 0
        display: block
        margin: auto
        text-align: center
        height: 157px
        line-height: 157px
      .uploadimg
        width: 100px
        height: 100px
        margin: auto
        display: block
        margin-top: 21px
  .citymole
    background: #000
    position: absolute
    opacity: 0.5
    width: 100%
    height: 100%
    top: 0
  .citysure
    position: fixed;
    z-index: 9;
    bottom: 180px;
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #fff;
    border-bottom:1px solid #ebebeb
    .leftspan
      position: absolute
      left: 41px
      color: #4a78e8
    .rightspan
      position: absolute
      right: 41px
      color: #4a78e8
</style>
