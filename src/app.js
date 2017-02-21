import $ from 'jquery'
import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './app.vue'
import Routers from './router'
import sdk from './plugin/sdk'
import {units,vuex,sys} from './common'


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



Vue.filter('networkType', function (value) {
  if(vuex.res[units.networkType(value)]){
    return vuex.res[units.networkType(value)];
  }else{
    return units.networkType(value);
  }
})
Vue.filter('covertNum', function (value) {
  return units.covertNum(value)
})
Vue.filter('UsedTimes', function (value) {
  return units.getTimePassed(value)
})
Vue.filter('qosService', function (value) {
  return units.qosService(value)
})

Vue.filter('qosPriority', function (value) {
  return units.qosPriority(value)
})

Vue.filter('qosProtocol', function (value) {
  return units.qosProtocol(value);
})

Vue.filter('networkRat', function (value) {
  if(vuex.res[units.networkRat(value)]){
    return vuex.res[units.networkRat(value)];
  }else{
    return units.networkRat(value);
  }
})

Vue.filter('networkState', function (value) {
  if(vuex.res[units.networkState(value)]){
    return vuex.res[units.networkState(value)];
  }else{
    return units.networkState(value);
  }
})

Vue.filter('res', function (value) {
  if(vuex.res[value]){
    return vuex.res[value];
  }else{
    return value;
  }
  
})
Vue.filter('ipProtocol', function (value) {
  return units.IPprotocol(value)
})
Vue.filter('byTes', function (value) {
  return units.bytes(value)
})
Vue.filter("times", function(second, type) {
  return units.times(second, type)
})
Vue.filter("replace", function(strings,key,replaceKey){
  return strings.replace(key,replaceKey)  
})

Vue.filter('lanProtState', function (value) {
  return value==1?vuex.res["ids_connected"]:vuex.res["ids_disconnected"];
})

Vue.filter('usbStateText', function (value) {
  return vuex.res[units.usbStateText(value)]
})
Vue.filter('netConnState', function (value) {
  return vuex.res[units.netConnState(value)]
})

Vue.filter('currentLang', function (value) {
  return sys.allLanguage[value]
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
