/*
 * @Author: jake
 * @Date: 2019-01-20 11:54:28
 * @Last Modified by:   jake
 * @Last Modified time: 2019-01-20 11:54:28
 * 页面适配
 */
import '../../style/index.css'
function on (obj, sev, fn) {
  if (typeof obj === 'object' && obj.length > 0) {
    obj.forEach(value => {
      on(value, sev, fn)
    })
    return
  }
  if (obj.addachEvent) {
    obj.addachEvent('on' + sev, fn, false)
  } else {
    obj.addEventListener(sev, fn, false)
  }
}

function off (obj, sev, fn) {
  if (obj.removeEventListener) {
    obj.removeEventListener(sev, fn)
  } else if (obj.detachEvent) {
    obj.detachEvent(`on${sev}`, fn)
  }
}
const font = {
  width: 750,
  first: true,
  fontFun: () => {
    var width = font.width
    var winWidth = document.documentElement.clientWidth// 网页的可视宽度
    var htmlNode = document.documentElement// html标签
    var screen = window.screen.width // 屏幕分辨率的宽度
    if (winWidth >= width) {
      htmlNode.style.fontSize = width / 20 + 'px'
    } else if (winWidth > screen) {
      htmlNode.style.fontSize = screen / 20 + 'px'
    } else {
      htmlNode.style.fontSize = winWidth / 20 + 'px'
    }
  },
  install (Vue) {
    Vue.prototype.$reponeFont = this
  },
  onResizeClose () {
    off(window, 'resize', this.fontFun)
  },
  init: function () {
    if (!this.first) return
    this.first = false
    // require('../../style/common.scss')
    this.fontFun()
    on(window, 'resize', this.fontFun)
  }
}
export default font
