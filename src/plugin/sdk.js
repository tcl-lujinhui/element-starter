import _ from 'underscore';
import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import api from './api/api.js'
Vue.use(VueResource)
let apiURI = '/jrd/webapi';
let showResult = (options) => {
  let defaults = {
    duration:1000,
    type: "success",
    msg: "fail！",
    callback() {}
  };
  _.extend(defaults, options);
  console.log(defaults)
  ElementUI.Message({
    duration:defaults.duration,
    type: defaults.type,
    message: defaults.msg,
    onClose: defaults.callback
  })
}
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
        if (api.hasOwnProperty(apiName)) {
          if (api[apiName].hasOwnProperty("Request")) {
            requestBody = api[apiName].Request(requestBody)
          }
        }
        Vue.http.post(apiURI, requestBody).then((response) => {
          var res = response.body.result
          if (api.hasOwnProperty(apiName)) {
            if (api[apiName].hasOwnProperty("Response")) {
              res = api[apiName].Response(res)
            }
          }
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
        if (api.hasOwnProperty(apiName)) {
          if (api[apiName].hasOwnProperty("Request")) {
            requestBody = api[apiName].Request(requestBody)
          }
        }
        Vue.http.post(apiURI, requestBody).then((response) => {
          let result = {};
          let res = response.body;
          if (res.hasOwnProperty("result")) {
            result.error = false;
          } else if (res.hasOwnProperty("error")) {

            result.error = true;
            result.errorCode = "e"+res.error.code.substr(res.error.code.length-1);
          } else {
            ElementUI.Message.error("error");
          }
          /*
          if (api.hasOwnProperty(apiName)) {
            if (api[apiName].hasOwnProperty("Response")) {
              res = api[apiName].Response(res)
            }
          }*/
          if (_.isFunction(callback)) {
            callback(res);
          } else if (_.isObject(callback)||callback==null) {
            callback=callback||{}
            var successCallbackOption = {
              type: "success",
              msg: "success!",
              callback() {}
            };
            var failCallbackOption = {
              type: "error",
              msg: "fail！",
              callback() {}
            };
            if (callback.hasOwnProperty("callback")&&_.isFunction(callback.callback)) {
              successCallbackOption.callback = callback.callback;
              failCallbackOption.callback = callback.callback;
            }
            if (!result.error) {
              if (callback.hasOwnProperty("success")) {
                _.extend(successCallbackOption,callback.success)
              }
              showResult(successCallbackOption);
            } else {
              if (callback.hasOwnProperty("fail")) {
                _.extend(failCallbackOption,callback.fail)
              }
              if(callback.hasOwnProperty(result.errorCode)){
                _.extend(failCallbackOption,callback[result.errorCode])
              }
              console.log(result.errorCode)
              showResult(failCallbackOption);
            }
            
          }

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
