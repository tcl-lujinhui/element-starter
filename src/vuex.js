import Vue from 'vue'
import $ from 'jquery'
var vuex = {
  res: {},
  SimInfo: {},
  SystemStatus: {},
  WanSettings: {},
  WanConnStatus: {},
  initRes: (cb) => {
    Vue.sdk.get("GetCurrentLanguage", null, (res) => {
      $.get("/dist/i18n/" + res.Language + ".json", (data) => {
        vuex.res = data
        if ($.isFunction(cb)) {
          cb()
        }
      })
    })
  },
  initSimInfo: () => {
    Vue.sdk.get("GetSimStatus", null, (res) => {
      vuex.SimInfo = res;
      if(res.SIMState=="initializing"){
        setTimeout(()=>{
          vuex.initSimInfo()
        },5000)
      }
    })
  },
  refreshSystemStatus: () => {
    Vue.sdk.get("GetSystemStatus", null, (res) => {
      vuex.SystemStatus = res;
    })
  },
  refreshWanSettings: () => {
    Vue.sdk.get("GetWanSettings", null, (res) => {
      vuex.WanSettings = res;
    });
  },
  refreshWanConnStatus: () => {
    Vue.sdk.get("GetWanIsConnInter", null, (res) => {
      vuex.WanConnStatus = res;
    });
  }
};

export default vuex;
