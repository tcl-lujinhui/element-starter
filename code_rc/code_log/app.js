import $ from 'jquery'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './app.vue'
import Routers from './router'
import { units, vuex } from './common'

import locale from 'element-ui/lib/locale/lang/en'


Vue.use(VueRouter)
Vue.use(VueResource)
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

vuex.initRes(() => {
  const app = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
})
