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
  instance.cancelText = cancelText
  instance.confirmText = confirmText
  instance.messageContent = messageContent || {}
  instance.succ = succ || function () {}
  instance.fail = fail || function () {}
  if (instance.visible === null) document.body.appendChild(instance.$el)
  return instance
}

export default messageBox
