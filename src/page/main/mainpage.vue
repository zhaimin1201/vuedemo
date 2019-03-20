<template>
  <div>
    <header class="logo">
      <span></span>
    </header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/loginuser" class="item border-1px">用户名登录</router-link>
      </div>
      <div class="tab-item">
        <router-link to="loginnumber" class="item border-1px">手机号登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default{

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .logo
    & span
      display: block
      margin:auto
      margin-top: 3rem
      width:5rem
      height:5rem
      bg-image('images/LOGO')
      -webkit-background-size: 100%
      background-size: 100%
      background-repeat:no-repeat
    .tab
      display:flex
      margin:auto
      margin-top: 2.5rem
      width: 89%
      height:50px
      line-height:50px
      .tab-item
        flex:1
        text-align: center
        .item
          display: inline-block
          height:3rem
          line-height:3rem
          width:8rem
          color:#9D9D9D
        .item.active
          color: #4A78E8
          border-1px(#4A78E8)
</style>
