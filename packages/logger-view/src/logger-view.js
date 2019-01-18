import Vue from 'vue'
let LoggerViewConstructor = Vue.extend(require('./logger-view.vue').default)
let getTance = () => {
  return new LoggerViewConstructor({
    el: document.createElement('div')
  })
}
let LoggerView = (options = {}) => {
  let instance = getTance()

  instance.title = options.title || ''
  instance.content = options.content || []
  instance.success = options.success || function () {}
  instance.cancelText = options.cancelText || '取消'
  instance.confirmText = options.confirmText || '确定'
  document.body.appendChild(instance.$el)
  Vue.nextTick(function () {
    instance.show = true
  })
  return instance
}
export default LoggerView
