import Vue from 'vue'
let LoggerViewConstructor = Vue.extend(require('./logger-view.vue').default)
let instance = new LoggerViewConstructor({
  el: document.createElement('div')
})
let LoggerView = (options = {}) => {
  instance.content = options.content || []
  if (instance.show !== null) return instance
  instance.title = options.title || ''
  instance.success = options.success || function () {}
  instance.cancelText = options.cancelText || '取消'
  instance.confirmText = options.confirmText || '确定'
  document.body.appendChild(instance.$el)
  Vue.nextTick(function () {
    if (options.firstShow)instance.show = true
  })
  return instance
}
export default LoggerView
