/*
 * @Author: jake
 * @Date: 2019-01-20 11:52:22
 * @Last Modified by: jake
 * @Last Modified time: 2019-01-24 17:45:03
 * 对log进行封装
 */
import LoggerView from '../../components/logger-view'
const Logger = class logger {
  constructor () {
    this.onLoad()
  }
  install (Vue, options) {
    let debug = options.debug
    Vue.prototype.$logger = this.logger(debug)
  }
  onLoad () {
    let data = this.loadData()
    for (let i in data) {
      this[i] = data[i]
    }
  }
  loadData () {
    return {
      debug: null, // 开启log的debug close关闭 openView打开在视图上 openLog打开在浏览器上
      logList: [] // log查询的所有数据
    }
  }
  type (object) {
    let class2type = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Object]': 'object',
      '[object Error]': 'error'
    }
    return class2type[Object.prototype.toString.call(object)]
  }
  getType (parame, _type) {
    switch (typeof _type) {
      case 'string':
        return this.type(parame) === _type
      case 'object':
        return _type.indexOf(this.type(parame)) !== -1
    }
    return false
  }
  logger (debug) {
    // 公共输出log方法
    if (debug) this.debug = debug
    let that = this
    let _push = function (type, array) {
      if (that.debug === 'close') return
      let value = []
      for (let index = 0; index < array.length; index++) {
        let element = array[index]
        if (that.getType(element, ['error'])) element = element.toString()
        value.push(element)
      }
      value = JSON.stringify(value).replace(/^\[|\]$/g, '')
      let json = {
        type,
        value
      }
      that.logList.push(json)
      if (!that.debug) return
      let log = LoggerView({
        title: '控制台',
        content: that.logList,
        success: () => {},
        firstShow: false
      })
      that.debug === 'openView' ? log.open() : log.close()
    }
    let callBack = {
      log () {
        _push('log', arguments)
      },
      info () {
        _push('info', arguments)
      },
      warn () {
        _push('warn', arguments)
      },
      error () {
        _push('error', arguments)
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
}
export default new Logger()
