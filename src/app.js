import $ from 'jquery'
import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './app.vue'
import Routers from './router'
import sdk from './plugin/sdk'

import appConfig from './appConfig'
import configs from './config.coffee'
console.log(configs)

import locale from 'element-ui/lib/locale/lang/en'

Vue.use(sdk)
Vue.use(appConfig)


Vue.use(VueRouter)
Vue.use(ElementUI, { locale })

const router = new VueRouter({
  routes:Routers
});


const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

