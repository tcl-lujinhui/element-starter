import Vue from 'vue'
var vuex = {
  SimInfo: {},
  SystemStatus: {},
  initSimInfo: () => {
    Vue.sdk.get("GetSimStatus", null, (res) => {
      vuex.SimInfo = res
    })
  }
};

export default vuex
