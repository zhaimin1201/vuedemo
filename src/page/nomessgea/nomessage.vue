<template>
    <div>
      <header>
        <ul>
          <li class="back-con">
            <span class="back" @click="back()">返回</span>
          </li>
          <li></li>
          <li class="visimess" >
            <!--<img alt="" src="../../images/06@2x.png" class="image-com" @click="prompt()">-->
          </li>
        </ul>
      </header>
      <img src="../../images/nopage.jpg" alt="" style="display: block; margin: auto; margin-top: 11rem;">
    </div>
</template>

<script>
export default {
  name: "nomessage",
  methods: {
    back () {
      this.$router.go(-1)
      // if (this.lastparme!= 0) {
      //   this.$router.push({ name: 'visichose2', params: {code: this.lastparme} })
      // } else {
      //   this.$router.push('/my')
      // }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  header
    height: 50px
    line-height: 50px
    background: #497be9
    color: #fff
    ul
      display:flex
      li
        flex:1
        text-align: center
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
</style>
