/*
 * @Author: jake
 * @Date: 2019-01-20 11:54:28
 * @Last Modified by:   jake
 * @Last Modified time: 2019-01-20 11:54:28
 * 页面适配
 */

export default{
  fontFun: function (width) {
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
  init: function () {
    var obj = this
    obj.fontFun(750)
    window.onresize = function () {
      obj.fontFun(750)
    }
  }
}
