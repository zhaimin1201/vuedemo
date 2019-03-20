<template>
  <div id="app">
    <!--<transition name='transitionName'>-->
      <!--<keep-alive>-->
        <!--&lt;!&ndash;需要被缓存的&ndash;&gt;-->
        <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
      <!--</keep-alive>-->
      <!--&lt;!&ndash;不需要缓存的&ndash;&gt;-->
      <!--<router-view v-if="!@$route.meta.keepAlive"></router-view>-->
    <!--</transition>-->
    <transition name='transitionName'>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name='transitionName'>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    direction () {
      const viewDir = this.$store.state.viewDirection
      let tranName = ''

      if (viewDir === 'left') {
        tranName = 'view-out'
      } else if (viewDir === 'right') {
        tranName = 'view-in'
      } else {
        tranName = 'fade'
      }

      return tranName
    },
  },
  beforeRouteUpdate (to, from, next) {
    let isBack = this.$router.isBack;
    if ( isBack ) {
      this.transitionName = 'slide-right'
    }else{
      this.transitionName = 'slide-left'
    }
    this.$router.isBack = false;
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl"
  @import "common/stylus/transiton.styl"
  @im
  #app
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
