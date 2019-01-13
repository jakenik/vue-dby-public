import Vue from 'vue'
import App from './App'
import { toast, chatTextarea } from '@/components/index.js'
Vue.component("toast", toast)
Vue.component("chat-textarea", chatTextarea)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
