import $ from 'jquery'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './app.vue'
import Routers from './router'

import moment from 'moment';


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)

const router = new VueRouter({
  routes: Routers
});

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
