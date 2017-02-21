import $ from 'jquery'
import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './app.vue'
import Routers from './router'
import sdk from './plugin/sdk'
import {vuex} from './common'

import filters from './filters/filters'


import appConfig from './appConfig'
import sideMenu from './sideMenu.vue'
import simState from './views/simState.vue'
import statusIcon from './views/statusIcon.vue'

import smsReport from './views/SMS/smsReport.vue'

import locale from 'element-ui/lib/locale/lang/en'

Vue.use(sdk)
Vue.use(appConfig)
Vue.component('sideMenu', sideMenu)
Vue.component('simState', simState)
Vue.component('statusIcon', statusIcon)
Vue.component('smsReport',smsReport)

Vue.use(VueRouter)
Vue.use(ElementUI, { locale })

$.each(filters,(name,fn)=>{
  Vue.filter(name,fn)
})

const router = new VueRouter({
  routes: Routers
});

router.beforeEach((to, from, next) => {
  vuex.loginName = to.name;

  if (to.name != 'index') {
    Vue.sdk.get('GetLoginState', null, (res) => {
      if (res.State === 1) {
        next()
      } else {
        vuex.loginName = 'index';
        router.push('index');
      }
    })
  }else{
    next()
  }
})

vuex.initRes(()=>{
  const app = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
})

vuex.initLoginState();
