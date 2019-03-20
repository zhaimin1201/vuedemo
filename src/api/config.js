export const commmonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}
//(jsonpCallback: jsonp1)与后端协议返回的名称
export const options = {
  param: 'jsonpCallback'
}
//jsonp1({"code":0,"subcode":0,"ret":1,"ip":"101.93.146.41:100.113.48.27:10.223.148.45"})
//"code":0表示成功
export const ERR_OK = 0
