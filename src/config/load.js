try {
  var RELoad = {
    refresh: function () {
      console.log("refresh")
    },
    infinite: function (done, pageIndex, Lnext) {
      //加载当前页数+1
      console.log(2222)
      console.log
      let pageIndex2 = 0
      pageIndex2 = pageIndex + 1
      //翻页重新请求
      console.log(typeof(Lnext))
      if (typeof (Lnext) === 'function') {
        Lnext(pageIndex2)
      }
    }
  }
} catch (e) {
  console.log(e)
}
export {
  RELoad
}
