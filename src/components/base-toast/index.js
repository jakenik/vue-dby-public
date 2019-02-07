import Toast from './src/toast.js'
const BaseToast = {}
BaseToast.install = function (Vue) {
  Vue.prototype.$toast = Toast
}
BaseToast.open = Toast
export default BaseToast
