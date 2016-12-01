import $ from 'jquery'
import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './app.vue'
import Routers from './router'
import sdk from './plugin/sdk'

Vue.use(sdk)

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
  routes:Routers
});


const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

