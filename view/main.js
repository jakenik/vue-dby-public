import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { PayPop, MessageBottom, ReponeFont, Request, Logger, WxApi, ErrorHandler, MessageCase, CircleView, Radio, RadioBeat } from '../src/index'
ReponeFont.init()
Vue.component(PayPop.name, PayPop)
Vue.component(MessageBottom.name, MessageBottom)
Vue.component(MessageCase.name, MessageCase)
Vue.component(CircleView.name, CircleView)
Vue.component(Radio.name, Radio)
Vue.component(RadioBeat.name, RadioBeat)
Vue.prototype.$request = Request
Vue.prototype.$logger = Logger.logger('openView')
Vue.prototype.$wxApi = WxApi
Vue.config.errorHandler = ErrorHandler
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
