/**
 * 公共api
 */
import Vue from 'vue'
import {$getType} from '../extend/helper'
import LoggerView from '../../packages/logger-view'
const DbyPublic = class dbyPublic {
  constructor (sign) {
    this.onLoad(sign)
  }
  onLoad (sign) {
    let data = this.loadData()
    for (let i in data) {
      this[i] = data[i]
    }
    this.apiRequire(sign)
    Vue.prototype.logList = []
  }
  loadData () {
    return {
      debug: 'openView', // 开启log的debug close关闭 openView打开在视图上 openLog打开在浏览器上
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
      if (this.debug === 'close') return
      if ($getType(value, 'object')) value = JSON.stringify(value)
      else if ($getType(value, ['function', 'number', 'error'])) value = value.toString()
      let json = {
        type,
        value
      }
      this.logList.push(json)
      LoggerView({
        title: '控制台',
        content: this.logList,
        success: () => {},
        firstShow: false
      })
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
    switch (this.debug) {
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
