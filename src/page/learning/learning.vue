<template>
    <div class="learn">
      <header class="head-tab">
        <ul class="head-ul">
          <li class="head-li back-con">
            <router-link to="/tool">
              <span class="back">返回</span>
            </router-link>
          </li>
          <li class="head-li" style="font-weight: 700; flex: 2" >
            E-learning
          </li>
          <li class="head-li visimess">
            <span @click="addvistsure()">考试</span>
          </li>
        </ul>
      </header>
      <div class="seach">
        <div class="search_con">
          <form action="" target="frameFile">
            <mt-search
              autofocus
              v-model="value"
              cancel-text="取消"
              placeholder="输入客户编号查询"
              @keyup.enter.native="search(value)"
            >
            </mt-search>
          </form>
        </div>
      </div>
      <div class="content">
        <ul class="content_ul">
          <li class="content_li">
            <div class="img_con">
              <img class="img_tn" height="120px" width="96%" src="http://img4.imgtn.bdimg.com/it/u=240658679,2851772201&fm=26&gp=0.jpg" alt="">
            </div>
            <div class="content_title">
             金融基础知识
            </div>
            <div class="like">
              <span class="like_icon">
                <span class="nolike">
                  <img src="../../images/dianz@2x.png" class="nolike_img">
                </span>
                <span class="like_span dianzan">点赞</span>
              </span>
              <span class="like_icon">
                <span class="nolike">
                  <img src="../../images/dianz@2x.png" class="nolike_img">
                </span>
                <span class="like_span">收藏</span>
              </span>
            </div>
          </li>
          <li class="content_li">
            <div class="img_con">
              <img class="img_tn" height="120px" width="96%" src="http://img4.imgtn.bdimg.com/it/u=240658679,2851772201&fm=26&gp=0.jpg" alt="">
            </div>
            <div class="content_title">
              金融基础知识
            </div>
            <div class="like">
              <span class="like_icon">
                <span class="nolike">
                  <img src="../../images/dianz@2x.png" class="nolike_img">
                </span>
                <span class="like_span dianzan">点赞</span>
              </span>
              <span class="like_icon">
                <span class="nolike">
                  <img src="../../images/dianz@2x.png" class="nolike_img">
                </span>
                <span class="like_span">收藏</span>
              </span>
            </div>
          </li>
          <li class="content_li">
            <div class="img_con">
              <img class="img_tn" height="120px" width="96%" src="http://img4.imgtn.bdimg.com/it/u=240658679,2851772201&fm=26&gp=0.jpg" alt="">
            </div>
            <div class="content_title">
              金融基础知识
            </div>
            <div class="like">
              <span class="like_icon">
                <span class="nolike">
                  <img src="../../images/dianz@2x.png" class="nolike_img">
                </span>
                <span class="like_span dianzan">点赞</span>
              </span>
              <span class="like_icon">
                <span class="nolike">
                  <img src="../../images/dianz@2x.png" class="nolike_img">
                </span>
                <span class="like_span">收藏</span>
              </span>
            </div>
          </li>
          <li class="content_li">
            <div class="img_con">
              <img class="img_tn" height="120px" width="96%" src="http://img4.imgtn.bdimg.com/it/u=240658679,2851772201&fm=26&gp=0.jpg" alt="">
            </div>
            <div class="content_title">
              金融基础知识
            </div>
            <div class="like">
             <span class="like_icon">
                <span class="nolike">
                  <img src="../../images/dianz@2x.png" class="nolike_img">
                </span>
                <span class="like_span dianzan">点赞</span>
              </span>
              <span class="like_icon">
                <span class="nolike">
                  <img src="../../images/dianz@2x.png" class="nolike_img">
                </span>
                <span class="like_span">收藏</span>
              </span>
            </div>
          </li>
         </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: "learning",
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .learn
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
        .visimess
          color: #4a78e8
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
    .seach
      height:63px
      background: #eff0f4
      .search_con
        height: 43px
        background: #ffffff
    .content
      margin-top:21.5px
      background: #ffffff
      .content_ul
        width: 100%
      .content_li
        border: 1px solid #eff0f4
        display: inline-block
        flex: 1
        margin-bottom: 12px
        width: 42%
        max-width: 204px
        height: 180px
        margin-left: 4.4%
        position: relative
        .img_con
          border-bottom: 1px solid #eff0f4
          padding-top: 3px
          padding-bottom: 3px
          .img_tn
            margin: auto
            display: block
        .content_title
          font-size: 12px
          line-height: 26px
          height: 28px
          color: rgb(86,93,107)
          width: 96%
          margin: auto
        .like
          width: 96%
          margin: auto
          .like_icon
            font-size: 14px
            color: rgb(146, 146, 146)
            height: 20px
            line-height: 20px
            display: inline-block
            .nolike
              .nolike_img
                height: 18px
            .like_span
              display: inline-block;
              height: 20px;
              line-height: 12px;
              vertical-align: middle
            .dianzan
              margin-right: 20px
</style>
