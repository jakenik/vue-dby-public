/*
 * @Author: jake
 * @Date: 2019-01-21 11:50:33
 * @Last Modified by: jake
 * @Last Modified time: 2019-01-26 14:04:12
 * 配置编译环境和线上环境之间的切换
 */
import '../../style/index.css'
function getUrlData () {
  let url = decodeURIComponent(location.href) // 获取url中"?"符后的字串
  const index = url.indexOf('?')
  const theRequest = {}
  if (index !== -1) {
    url = url.substring(index, url.length)
    const str = url.substr(1)
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}
const env = {
  version: 'prod/' // 当前版本
}
const urlJson = getUrlData()

if (urlJson.apiver) {
  env.version = urlJson.apiver
}
env.host = window.location.host
env.protocol = document.location.protocol + '//'
if (window.localStorage.getItem('NODE_ENV_DEVELOPMENT') === 'true') {
  env.host = 'admin.91duobaoyu.com'
  env.protocol = 'https://'
}

env.apiBffAdmin = `${env.protocol}${env.host}/api_bff_admin`
env.apiBff = `${env.protocol}${env.host}/api_bff`
env.apiChat = `${env.protocol}${env.host}/api_chat`
env.apiH5Wss = `wss://${env.host}/api_h5/websocket`
env.apiH5 = `${env.protocol}${env.host}/api_h5`
env.res = `${env.protocol}${env.host}/res`
env.h5Official = `${env.protocol}${env.host}/h5_official/#`
env.h5Userchat = `${env.protocol}${env.host}/h5_userchat/#`
env.business = `${env.protocol}${env.host}/gateway/business`
env.htmlRoute = `${env.protocol}${env.host}/`
env.local = 'http://127.0.0.1:7001'
env.install = function (Vue) {
  Vue.prototype.$env = env
}
export default env
