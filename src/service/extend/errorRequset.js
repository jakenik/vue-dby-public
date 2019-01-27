/*
 * @Author: jake
 * @Date: 2019-01-27 10:14:25
 * @Last Modified by:   jake
 * @Last Modified time: 2019-01-27 10:14:25
 * 错误捕获通知钉钉群
 */
import request from '../api/axios/index'
import env from '../env'
let $logger = require('./logger').default
$logger = $logger.logger()
let errorRequsetFaults = false
export default function ({error, errorHttpSrc, errorHttpData, callBackError}) {
  if (errorRequsetFaults || window.localStorage.getItem('NODE_ENV') === 'true') return false
  let errorRequset = (token) => {
    if (callBackError === undefined) callBackError = false
    let json = {
      'msgtype': 'text',
      'text': {
        'content': `错误页面: ${window.location.href}\n错误token:${token}\n错误捕获：${error}\n错误接口：${errorHttpSrc}\n接口传参:${errorHttpData}\n是否是接口回调出错:${callBackError}`
      },
      'at': {
        'isAtAll': true
      }
    }
    $logger.error(json)
    request.httpRequest({
      path: '/page/error',
      data: {
        content: json
      },
      method: 'post',
      succ () {

      },
      fail () {

      },
      baseURL: env.local,
      notError: true
    })
  }
  request.getToken({
    succ: (res) => {
      let token = res.token
      try {
        errorRequset(token)
      } catch (error) {
        errorRequsetFaults = true
      }
    },
    fail: (res) => {
      try {
        errorRequset(res)
      } catch (error) {
        errorRequsetFaults = true
      }
    },
    notError: true
  })
}
