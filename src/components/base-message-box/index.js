import MessageBox from './src/base-message-box.js'
const BaseMessageBox = {}
BaseMessageBox.install = function (Vue) {
  Vue.prototype.$messageBox = MessageBox
}
BaseMessageBox.open = MessageBox
export default BaseMessageBox
