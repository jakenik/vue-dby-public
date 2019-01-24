/*
 * @Author: jake
 * @Date: 2019-01-21 11:50:33
 * @Last Modified by: jake
 * @Last Modified time: 2019-01-24 17:44:51
 * 配置编译环境和线上环境之间的切换
 */
import { getUrlData } from '../extend/helper'
const env = {
  version: 'prod/' // 当前版本
}
const urlJson = getUrlData()

if (urlJson.apiver) {
  env.version = urlJson.apiver
}
env.host = window.location.host
env.protocol = document.location.protocol + '//'
if (process.env.NODE_ENV === 'development' || window.localStorage.getItem('NODE_ENV') === 'true') {
  env.host = 'admin.91duobaoyu.com'
  env.protocol = 'https://'
}

env.apiBffAdmin = 'https://<host>/api_bff_admin'.replace('<host>', env.host).replace('<version>', env.version)
env.apiBff = 'https://<host>/api_bff'.replace('<host>', env.host).replace('<version>', env.version)
env.apiChat = 'https://<host>/api_chat'.replace('<host>', env.host).replace('<version>', env.version)
env.apiH5Wss = 'wss://<host>/api_h5/websocket/'.replace('<host>', env.host).replace('<version>', env.version)
env.apiH5 = 'https://<host>/api_h5'.replace('<host>', env.host).replace('<version>', env.version)
env.res = 'https://<host>/res'.replace('<host>', env.host)
env.h5Official = 'https://<host>/h5_official/#'.replace('<host>', env.host).replace('<version>', env.version)
env.h5Userchat = 'https://<host>/h5_userchat/#/'.replace('<host>', env.host).replace('<version>', env.version)
env.business = 'https://<host>/gateway/business'.replace('<host>', env.host).replace('<version>', env.version)
env.htmlRoute = 'https://<host>/'.replace('<host>', env.host).replace('<version>', env.version)
env.url = 'https://' + env.host
export default env
