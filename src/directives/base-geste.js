import baseGeste from '../components/base-geste'
let $helper
const geste = {
  name: 'base-geste',
  install (Vue) {
    $helper = Vue.prototype.$helper
    Vue.directive('base-geste', this)
  },
  methods: {
    onmousedown (e) {
      $helper.addClass(this, this.selectClass)
      this.instance = baseGeste({el: this, left: e.offsetX, top: e.offsetY})
    },
    onmouseup () {
      $helper.removeClass(this, this.selectClass)
      if (this.instance) this.instance.close()
    },
    ontouchstart (e) {
      $helper.addClass(this, this.selectClass)
      this.instance = baseGeste({el: this, left: e.touches[0].pageX - this.offsetLeft, top: e.touches[0].pageY - this.offsetTop})
    },
    ontouchend () {
      $helper.removeClass(this, this.selectClass)
      this.instance.close()
    }
  },
  bind (el, binding) {
    const methods = geste.methods
    if (binding.value.$helper) $helper = binding.value.$helper
    if (!$helper) return false
    $helper.append(el, '<div style="position: absolute;width: 100%;height: 100%;z-index: 10;left: 0;top: 0;" ></div>')
    if ($helper.browser().isPc) {
      el.start = 'mousedown'
      el.end = 'mouseup'
    } else {
      el.start = 'touchstart'
      el.end = 'touchend'
    }
    el.selectClass = binding.value.selectClass
    $helper.on(el, el.start, methods[`on${el.start}`])
    $helper.on(el, el.end, methods[`on${el.end}`])
  },
  unbind (el) {
    const methods = geste.methods
    if (!$helper) return false
    $helper.off(el, el.start, methods[`on${el.start}`])
    $helper.off(el, el.end, methods[`on${el.end}`])
  }
}
export default geste
