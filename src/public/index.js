/**
 * 公共api
 */
import Vue from 'vue'
// import LoggerView from '../../packages/logger-view'
const DbyPublic = class dbyPublic {
  constructor (sign) {
    this.onLoad(sign)
  }
  onLoad (sign) {
    this.data = this.loadData()
    this.apiRequire(sign)
    Vue.prototype.logList = []
  }
  loadData () {
    return {
      debug: 'openLog', // 开启log的debug close关闭 openView打开在视图上 openLog打开在浏览器上
      logList: [] // log查询的所有数据
    }
  }
  apiRequire (sign) { // 引入所需模块
    const set = new Set(sign)
    if (set.has('wxApi')) {
      this['wxApi'] = require('../unit/wx/index').default(DbyPublic)
    }
  }
  logger () {
    // 公共输出log方法
    let _push = (value, type) => {
      if (this.data.debug === 'close') return
      let json = {
        type,
        value
      }
      this.data.logList.push(json)
      Vue.prototype.logList = this.data.logList
    }
    let callBack = {
      log: value => {
        _push(value, 'log')
      },
      info: value => {
        _push(value, 'info')
      },
      warn: value => {
        _push(value, 'warn')
      },
      error: value => {
        _push(value, 'error')
      }
    }
    switch (this.data.debug) {
      case 'openLog':
        return console
      case 'openView':
        return callBack
      default:
        return callBack
    }
  }
  isArray (obj) {
    return obj && typeof obj === 'object' && obj.length
  }
}
export default DbyPublic
