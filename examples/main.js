import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './style/mixins.scss'
// 引入组件
import Base from '../src'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入demo-block
import DemoBlock from './components/demoBlock'
// 引入项目样式入口
import './assets/less/index.less'
Vue.use(Base)
Vue.use(ElementUI)
Vue.component('demo-block', DemoBlock)

// 引入路由
const routes = require('./route')
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
/* eslint-disable no-new */
new Vue({
  render (createElement) {
    return createElement(App)
  },
  router
}).$mount('#app')
