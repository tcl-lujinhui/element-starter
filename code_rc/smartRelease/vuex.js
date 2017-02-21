import Vue from 'vue'
import $ from 'jquery'
var vuex = {
  systemInfo:{
    isLogined:false
  },
  res: {},
  SimInfo: {},
  currentLanguage:"en",
  SystemStatus: {},
  WanSettings: {},
  WanConnStatus: {},
  smsCount: {},
  heartBeatInterval: null,
  initRes: (cb) => {
    $.get("/dist/i18n/en.json", (data) => {
      if (typeof(data) == "string") {
        data = JSON.parse(data);
      }
      vuex.res = data;
      if ($.isFunction(cb)) {
        cb()
      }
    })
  }
  
};

export default vuex;
