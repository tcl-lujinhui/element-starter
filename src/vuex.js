import Vue from 'vue'
var vuex = {
  SimInfo: {},
  SystemStatus: {},
  initSimInfo: () => {
    Vue.sdk.get("GetSimStatus", null, (res) => {
      vuex.SimInfo = res
    })
  },
  refreshSystemStatus: () => {
    Vue.sdk.get("GetSystemStatus", null, (res) => {
      vuex.SystemStatus = res
    })
  }
};

export default vuex;
