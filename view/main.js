import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { MessageBottom, ReponeFont, Request, Logger, WxApi, ErrorHandler, MessageCase, CircleView, Radio, Checkbox, SocketApi } from '../src/index.js'
ReponeFont.init()
Vue.component(MessageBottom.name, MessageBottom)
Vue.component(MessageCase.name, MessageCase)
Vue.component(CircleView.name, CircleView)
Vue.component(Radio.name, Radio)
Vue.component(Checkbox.name, Checkbox)
Vue.prototype.$request = Request
Vue.prototype.$logger = Logger.logger('openLog')
Vue.prototype.$webSocket = SocketApi
Vue.prototype.$wxApi = WxApi
Vue.config.errorHandler = ErrorHandler
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
