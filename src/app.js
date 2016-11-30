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

Vue.sdk.get('GetCurrentLanguage',{},function(data){
  $.get('/i18n/en.res',function(data){
    console.log(data)
  })
  console.log(data.Language)
})

/*
Vue.http.options.emulateJSON = false;
Vue.http.interceptors.push((request, next) => {
  var apiURL = '/jrd/webapi';
  if (request.url === apiURL && request.method === "POST") {
    request.url="http://127.0.0.1:9096"+apiURL;
    var requestBody = {
      "id": 12,
      "jsonrpc": "2.0"
    };
    var resBody = {};
    Object.assign(resBody, request.body);
    requestBody.method = resBody.apiName;
    requestBody.params = resBody.data || {};
    request.body = requestBody;
    next((response) => {
      return response;
    });
  } else {
    next((response) => {
      return response;
    });
  }
});
*/
const router = new VueRouter({
  routes:Routers
});


const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

