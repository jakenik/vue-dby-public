import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { PayPop, ReponeFont, Request, Logger, WxApi, ErrorHandler } from '../src/index'
ReponeFont.init()
Vue.component(PayPop.name, PayPop)
Vue.prototype.$request = Request
Vue.prototype.$logger = Logger
Vue.prototype.$wxApi = WxApi
Vue.config.errorHandler = ErrorHandler
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
