/**
 * 配置编译环境和线上环境之间的切换
 */
const env = {
  version: 'prod/' // 当前版本
}
const getRequestUrl = () => {
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
const urlJson = getRequestUrl()

if (urlJson.apiver) {
  env.version = urlJson.apiver
}
env.host = window.location.host
env.protocol = document.location.protocol + '//'
// if (process.env.NODE_ENV === 'development') {
env.host = 'admin.91duobaoyu.com'
env.protocol = 'https://'
// }

env.adminBffRoute = 'https://<host>/api_bff_admin'.replace('<host>', env.host).replace('<version>', env.version)
env.bffRoute = 'https://<host>/api_bff'.replace('<host>', env.host).replace('<version>', env.version)
env.chatRoute = 'https://<host>/api_chat'.replace('<host>', env.host).replace('<version>', env.version)
env.wssRoute = 'wss://<host>/api_h5/websocket/'.replace('<host>', env.host).replace('<version>', env.version)
env.httpRoute = 'https://<host>/api_h5'.replace('<host>', env.host).replace('<version>', env.version)
env.htmlRoute = 'https://<host>/'.replace('<host>', env.host).replace('<version>', env.version)
env.resRoute = 'https://<host>/res'.replace('<host>', env.host)
env.vueRoute = 'https://<host>/h5_official/#'.replace('<host>', env.host).replace('<version>', env.version)
env.userchat = 'https://<host>/h5_userchat/#/'.replace('<host>', env.host).replace('<version>', env.version)
env.url = 'https://' + env.host
env.business = 'https://<host>/gateway/business'.replace('<host>', env.host).replace('<version>', env.version)
export default env
