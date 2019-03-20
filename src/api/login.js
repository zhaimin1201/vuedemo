import jsonp from 'common/js/jsonp'
import {commmonParams, options} from './config'

export function getLogin (username, password) {
  const url = 'http://10.0.127.207/api/Account/userLoginByTel'
  //assign  用于将所有可枚举属性的值从一个或者多个对象复制到目标对象
  const data = Object.assign({}, commmonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
