import $ from 'jquery'
import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './app.vue'
import Routers from './router'
import sdk from './plugin/sdk'
import {units,vuex} from './common'


import appConfig from './appConfig'
import sideMenu from './sideMenu.vue'
import simState from './views/simState.vue'
import statusIcon from './views/statusIcon.vue'

import locale from 'element-ui/lib/locale/lang/en'

Vue.use(sdk)
Vue.use(appConfig)
Vue.component('sideMenu', sideMenu)
Vue.component('simState', simState)
Vue.component('statusIcon', statusIcon)

Vue.use(VueRouter)
Vue.use(ElementUI, { locale })
vuex.initRes()
Vue.filter('networkType', function (value) {
  return vuex.res[units.networkType(value)]
})

Vue.filter('res', function (value) {
  return vuex.res[value]
})

const router = new VueRouter({
  routes: Routers
});
/*
router.beforeEach((to, from, next) => {
  console.log(to.name)
  if (to.name != 'login') {
    Vue.sdk.get('GetLoginState', null, (res) => {
      console.log(res)
      if (res.State === 1) {
        next()
      } else {
        router.push('login')
      }
    })
  }else{
    next()
  }
})
*/

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
