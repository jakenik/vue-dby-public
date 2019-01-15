import PayPop from '../packages/pay-pop'
import Toast from '../packages/toast'
const version = '1.1.7'
const install = function (Vue) {

}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
};
export {
  version,
  PayPop,
  Toast
}
