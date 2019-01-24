import request from '../api/axios/index'
import { getTime } from '../extend/helper'
let $logger = require('../extend/logger').default
$logger = $logger.logger()
class ErrorHandler {
  errorHandler (error, vm) {
    console.error(error)
    let token = null
    let time = getTime('YYYY-MM-DD')
    request.getToken({
      succ: (res) => {
        token = res.token
        $logger.error('全局捕获错误',
          '时间=' + time,
          'token=' + token,
          'error=' + error,
          '当前页面=' + vm.$route.path
        )
      },
      fail: (res) => {
      }
    })
  }
}

export default new ErrorHandler().errorHandler
