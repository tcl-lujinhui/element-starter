import Vue from 'vue'
import $ from 'jquery'
var vuex = {
  res: {},
  SimInfo: {},
  SystemStatus: {},
  initRes: () => {
    Vue.sdk.get("GetCurrentLanguage", null, (res) => {
      $.get("/dist/i18n/"+res.Language+".json",(data)=>{
        vuex.res = data
      })
    })
  },
  initSimInfo: () => {
    Vue.sdk.get("GetSimStatus", null, (res) => {
      vuex.SimInfo = res
    })
  },
  refreshSystemStatus: () => {
    Vue.sdk.get("GetSystemStatus", null, (res) => {
      vuex.SystemStatus = res;
    })
  }
};

export default vuex;
