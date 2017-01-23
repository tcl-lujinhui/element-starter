import Vue from 'vue'
import $ from 'jquery'
var vuex = {
  res: {},
  SimInfo: {},
  SystemStatus: {},
  WanSettings: {},
  WanConnStatus: {},
  smsCount: {},
  heartBeatInterval: null,
  initRes: (cb) => {
    Vue.sdk.get("GetCurrentLanguage", null, (res) => {
      $.get("/dist/i18n/" + res.Language + ".json", (data) => {
        if (typeof(data) == "string") {
          data = JSON.parse(data);
        }
        vuex.res = data;
        if ($.isFunction(cb)) {
          cb()
        }
      })
    })
  },
  initSimInfo: () => {
    Vue.sdk.get("GetSimStatus", null, (res) => {
      vuex.SimInfo = res;
      if (res.SIMState == "initializing") {
        setTimeout(() => {
          vuex.initSimInfo()
        }, 5000)
      }
    })
  },
  initLoginState: () => {
    Vue.sdk.get('GetLoginState', null, (res) => {
      if (res.State === 1) {
        vuex.heartBeat(true);
      } else {
        vuex.heartBeat(false);
      }
    });
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
  },
  refreshSMSStorageState:() => {
    Vue.sdk.get("GetSMSStorageState", null, (res) => {
      vuex.smsCount = res;
    });
  },
  heartBeat: (IsHeart) => {
    clearInterval(vuex.heartBeatInterval);
    vuex.heartBeatInterval = null;
    if (IsHeart) {
      vuex.heartBeatInterval = setInterval(() => {
        Vue.sdk.get("HeartBeat", null, (res) => {});
      }, 6000);
    }
  }
};

export default vuex;
