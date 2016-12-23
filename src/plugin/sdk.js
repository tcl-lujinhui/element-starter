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
    msg: "fail!",
    callback() {}
  };
  _.extend(defaults, options);
  defaults.callback=()=>{}
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
              tips:"Message",
              type: "success",
              msg: "success!",
              callback() {}
            };
            var failCallbackOption = {
              tips:"Message",
              type: "error",
              msg: "fail!",
              callback() {}
            };
            if (callback.hasOwnProperty("callback")&&_.isFunction(callback.callback)) {
              successCallbackOption.callback = callback.callback;
              failCallbackOption.callback = callback.callback;
            }
            if (!result.error) {
              if (callback.hasOwnProperty("success")) {
                if(_.isObject(callback.success)&&!_.isFunction(callback.success)){
                  _.extend(successCallbackOption,callback.success)
                }else if(_.isString(callback.success)){
                  successCallbackOption.msg=callback.success
                }else if(_.isFunction(callback.success)){
                  successCallbackOption.callback=callback.success
                }
                
              }
              if(successCallbackOption.tips=="Message"){
                successCallbackOption.callback()
                showResult(successCallbackOption);
              }else if(successCallbackOption.tips=="None"){
                successCallbackOption.callback()
              }
            } else {
              if (callback.hasOwnProperty("fail")) {
                if(_.isObject(callback.fail)&&!_.isFunction(callback.fail)){
                  _.extend(failCallbackOption,callback.fail)
                }else if(_.isString(callback.fail)){
                  failCallbackOption.msg=callback.fail
                }else if(_.isFunction(callback.fail)){
                  failCallbackOption.callback=callback.fail
                }
                
              }
              if(callback.hasOwnProperty(result.errorCode)){

                if(_.isObject(callback[result.errorCode])&&!_.isFunction(callback[result.errorCode])){
                    _.extend(failCallbackOption,callback[result.errorCode])
                }else if(_.isString(callback[result.errorCode])){
                  failCallbackOption.msg=callback[result.errorCode]
                }else if(_.isFunction(callback[result.errorCode])){
                  failCallbackOption.callback=callback[result.errorCode]
                }
                
              }
              if(failCallbackOption.tips=="Message"){
                failCallbackOption.callback()
                showResult(failCallbackOption);
              }else if(failCallbackOption.tips=="None"){
                failCallbackOption.callback()
              }
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
