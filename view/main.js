import Vue from 'vue'
import App from './App.vue'
import { PayPop, ReponeFont, DbyPublic } from '../src/index'
ReponeFont.init()
Vue.component(PayPop.name, PayPop)
Vue.prototype.$dbyPublic = new DbyPublic(['wxApi'])
Vue.prototype.$logger = Vue.prototype.$dbyPublic.logger()
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App)
})
