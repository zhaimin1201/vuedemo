import originJsonp from 'jsonp'

//对外暴露一个方法
export default function jsonp (url, data, option) {
  //判断url中是否有？，如有有则后面参数以&拼接，否则第一个以?拼接
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    //resolve  成功调用   reject失败调用
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

//url需要拼接参数调用的方法
function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
