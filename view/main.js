import Vue from 'vue'
import App from './App.vue'
import { PayPop } from '../src/index'

Vue.component(PayPop.name, PayPop)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App)
})
