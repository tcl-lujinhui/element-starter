import $ from 'jquery'
import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './app.vue'
import Routers from './router'
import sdk from './plugin/sdk'
import { units, vuex } from './common'

import appConfig from './appConfig'

import locale from 'element-ui/lib/locale/lang/en'

Vue.use(sdk)
Vue.use(appConfig)

Vue.use(VueRouter)
Vue.use(ElementUI, { locale })


Vue.filter('bytesToSize', function(bytes) {
  var i, k, sizes;
  if (bytes === 0) {
    return '0';
  }
  k = 1024;
  sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];

})

Vue.filter('res', function(value) {
  if (vuex.res[value]) {
    return vuex.res[value];
  } else {
    return value;
  }

})

const router = new VueRouter({
  routes: Routers
});

/*router.beforeEach((to, from, next) => {
  vuex.loginName = to.name;

  if (to.name != 'login') {
    Vue.sdk.get('GetLoginState', null, (res) => {
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
vuex.initRes(() => {
  const app = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
})

vuex.initLoginState();
