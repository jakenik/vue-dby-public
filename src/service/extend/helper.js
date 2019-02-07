/*
 * @Author: jake
 * @Date: 2019-01-20 11:51:30
 * @Last Modified by: jake
 * @Last Modified time: 2019-01-26 15:33:34
 * 工具类型的封装都放在这里
 */
/**
 * @export
 * @param {查询对象} object
 * @returns
 */
import '../../style/index.css'
class Helper {
  install (Vue) {
    Vue.prototype.$helper = this
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
  /**
   * @export
   * @param {当前判断的参数} parame
   * @param {是否包含类型} type
   * @returns
   */
  getType (parame, _type) {
    switch (typeof _type) {
      case 'string':
        return this.type(parame) === _type
      case 'object':
        return _type.indexOf(this.type(parame)) !== -1
    }
    return false
  }
  /**
   * 获取页面url参数 无传参直接调用
   */
  getUrlData () {
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

  /**
   * @export
   * @param {检查字符串是数组还是josn} str
   */
  getStringType (str) {
    if (str) {
      try {
        let type
        JSON.parse(str).length === undefined
          ? (type = 'object')
          : (type = 'array')
        return type
      } catch (error) {
        return false
      }
    }
  }

  getHash () {
    let hash = window.location.hash
    let index = hash.indexOf('?')
    if (index === -1) index = hash.length
    return hash.substring(hash.indexOf('#') + 1, index)
  }

  getStore (name) {
    if (!name) name = this.getHash()
    let data = window.localStorage.getItem(name)
    if (!data) {
      return false
    }
    try {
      data = JSON.parse(data)
    } catch (error) {
      return data
    }
    return data
  }

  setStore (content) {
    let name = this.getHash()
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  }

  removeStore (name) {
    if (!name) return false
    window.localStorage.removeItem(name)
    return true
  }

  /**
   * 存储sessionStorage
   */
  setSessionStorage (content) {
    let name = this.getHash()
    const data = window.sessionStorage.getItem(name)
    try {
      content = {
        ...JSON.parse(data),
        ...content
      }
    } catch (error) {}
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.sessionStorage.setItem(name, content)
  }
  /**
   * 得到sessionStorage
   */
  getSessionStorage (name) {
    if (!name) return
    let data = window.sessionStorage.getItem(name)
    if (!data) {
      return false
    }
    try {
      data = JSON.parse(data)
    } catch (error) {}
    return data
  }
  /**
   * 删除sessionStorage
   */
  removeSessionStorage (name) {
    if (!name) return false
    window.sessionStorage.removeItem(name)
    return true
  }
  /**
   * 挂载监听
   */
  on (obj, sev, fn) {
    if (typeof obj === 'object' && obj.length > 0) {
      obj.forEach(value => {
        this.on(value, sev, fn)
      })
      return
    }
    if (obj.addachEvent) {
      obj.addachEvent('on' + sev, fn, false)
    } else {
      obj.addEventListener(sev, fn, false)
    }
  }

  off (obj, sev, fn) {
    if (obj.removeEventListener) {
      obj.removeEventListener(sev, fn)
    } else if (obj.detachEvent) {
      obj.detachEvent(`on${sev}`, fn)
    }
  }

  browser () {
    let ua = navigator.userAgent
    let isWindowsPhone = /(?:Windows Phone)/.test(ua)
    let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
    let isAndroid = /(?:Android)/.test(ua)
    let isFireFox = /(?:Firefox)/.test(ua)
    let isChrome = /(?:Chrome|CriOS)/.test(ua)
    let isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
    let isPhone = /(?:iPhone)/.test(ua) && !isTablet
    let isPc = !isPhone && !isAndroid && !isSymbian
    return {
      isTablet: isTablet,
      isPhone: isPhone,
      isAndroid: isAndroid,
      isPc: isPc,
      isChrome
    }
  }

  getTime (mode) {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    switch (mode) {
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`
      case 'YYYY-MM-DD HH:mm:ss':
        return `${year}-${month}-${day} ${h}:${m}:${s}`
      default:
        break
    }
  }

  hasClass (el, cls) {
    if (!el || !cls) return false
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
    if (el.classList) {
      return el.classList.contains(cls)
    } else {
      return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
    }
  }

  addClass (el, cls) {
    if (!el) return
    var curClass = el.className
    var classes = (cls || '').split(' ')

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i]
      if (!clsName) continue

      if (el.classList) {
        el.classList.add(clsName)
      } else {
        if (!this.hasClass(el, clsName)) {
          curClass += ' ' + clsName
        }
      }
    }
    if (!el.classList) {
      el.className = curClass
    }
  }

  removeClass (el, cls) {
    if (!el || !cls) return
    var classes = cls.split(' ')
    var curClass = ' ' + el.className + ' '

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i]
      if (!clsName) continue

      if (el.classList) {
        el.classList.remove(clsName)
      } else {
        if (this.hasClass(el, clsName)) {
          curClass = curClass.replace(' ' + clsName + ' ', ' ')
        }
      }
    }
    if (!el.classList) {
      el.className = curClass ? curClass.trim() : curClass
    }
  }

  append (el, node) {
    let div = document.createElement('div')
    div.innerHTML = node
    for (let i = 0; i < div.children.length; i++) {
      el.appendChild(div.children[i])
    }
  }
}
export default new Helper()
