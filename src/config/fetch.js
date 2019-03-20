/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
function obj2String (obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}
/**
 *将对象转成'{"name":"goatling"}'
 */
function obj3String (obj) {
  return JSON.stringify(obj)
}
/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
function commonFetcdh(url, options, cha, method = 'GET') {
  // const searchStr = obj2String(options)
  // var searchStr = JSON.stringify(options)
  const searchStr = obj3String(options)
  let initObj = {}
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
      credentials: 'include'
    }
  } else {
    /**
     body: JSON.stringify(code)
     * **/
    initObj = {
      method: method,
      // credentials: 'include',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'DataType': 'json'
      }),
      body: searchStr
    }
  }
  fetch(url, initObj, cha).then((res) => {
    console.log(res)
    return res.json()
  }).then((res) => {
    return res
  }).then((res) => {
    if (res.success == false) {
      return res.error.message
    } else {
      let res = true
      return res
    }
  }).then((res) => {
    //判断是否是方法
    return cha(res)
  }).catch(function (err) {
    console.log(err)
  })
}

/**
 * GET请求
 * @param url 请求地址
 * @param options 请求参数
 */
function GET (url, options) {
  return commonFetcdh(url, options, 'GET')
}

/**
 * POST请求
 * @param url 请求地址
 * @param options 请求参数
 *   let code = {
          UserName: 'bwx001',
          Password: '000000'
        }
 var sss =  fetch('http://10.0.127.207/api/Account/userLogin', {
         */
function POST (url, options, cha) {
  return commonFetcdh(url, options, cha, 'POST')
}

export {
  POST,
  GET
}
