import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
Vue.use(VueResource)
let apiURI = '/jrd/webapi'

export default {
  install(Vue) {
    Vue.sdk = {
      get: function(apiName, params, callback) {
        var requestBody = {
          "id": 12,
          "jsonrpc": "2.0",
          "method": apiName,
          "params": params || {}
        };
        Vue.http.post(apiURI, requestBody).then((response) => {
          var res = response.body.result
          callback(res)
        }, (response) => {
          ElementUI.Message.error("error")
        });
      },
      post: function(apiName, params, callback) {
        var requestBody = {
          "id": 12,
          "jsonrpc": "2.0",
          "method": apiName,
          "params": params || {}
        };
        Vue.http.post(apiURI, requestBody).then((response) => {
          var res = response.body
          ElementUI.Message.success("succeed");
          callback(res);
        }, (response) => {
          ElementUI.Message.error("error");
        });
      },
    };

    Vue.prototype.sdk = {
      get: Vue.sdk.get,
      post: Vue.sdk.post
    }

  }
}
