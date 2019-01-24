import Vue from 'vue'

const MessageBoxConstructor = Vue.extend(require('./message-box.vue').default)

let getAnInstance = () => {
  return new MessageBoxConstructor({
    el: document.createElement('div')
  })
}
let instance = getAnInstance()
let messageBox = (options = {}) => {
  let {cancelText, confirmText, messageContent, succ, fail} = options
  instance.cancelText = cancelText || '取消'
  instance.confirmText = confirmText || '确定'
  instance.messageContent = messageContent || {}
  instance.succ = succ || function () {}
  instance.fail = fail || function () {}
  if (instance.visible === null) document.body.appendChild(instance.$el)
  Vue.nextTick(function () {
    instance.visible = true
  })
  return instance
}

export default messageBox
