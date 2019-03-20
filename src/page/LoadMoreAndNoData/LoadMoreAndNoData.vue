<template>
  <div>
    <div>Load More  No Data</div>
    <scroller :on-infinite="infinite" ref="my_scroller">
      <div style="height: 44px;"></div>
      <div  style="height: 44px;" v-for="(item, index) in items"
           class="row" :class="{'grey-bg': index % 2 == 0}">
        {{ item }}
      </div>
    </scroller>
  </div>
</template>

<script>
export default {
  name: "LoadMoreAndNoData",
  data () {
    return {
      items: []
    }
  },
  mounted () {
    for (let i = 1; i <= 20; i++) {
      this.items.push(i + ' - keep walking, be 2 with you.')
    }
    this.top = 1
    this.bottom = 20
  },

  methods: {
    infinite (done) {
      if (this.bottom >= 30) {
        setTimeout(() => {
          done(true)
        }, 1500)
        return
      }

      setTimeout(() => {
        let start = this.bottom + 1
        for (let i = start; i < start + 10; i++) {
          this.items.push(i + ' - keep walking, be 2 with you.')
        }
        this.bottom = this.bottom + 10
        setTimeout(() => {
          done()
        })
      }, 1500)
    }
  }
}
</script>

<style scoped>

</style>
