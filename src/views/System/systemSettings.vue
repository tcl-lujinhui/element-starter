<template lang="jade">
  include ../components.jade
  #systemSettings
    +sideMenuPage('System')
      +breadcrumb("ids_system_pageTitle")
      +form("formData")
        +select("ids_system_languageSettings:","Language")
        //-+select("ids_system_ntpServer1:","NtpServer1")
        //-+select("ids_system_ntpServer2:","NtpServer2")
        //-+select("Time Zone:","TimeZone")
        +selectBlock("ids_system_timeZone:","ZoneName")
        +input("ids_system_currentTime:","CurrTime")(disabled)
        +formBtn()

</template>
<script>
import {_config,$,sys} from '../../common.js';
import ElementUI from 'element-ui';
let Config = _config.systemSettings;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        /*this.sdk.get("GetSystemSettings", null, (res) => {
          $.extend(this.formData, res);
        });*/
        this.sdk.get("GetCurrentTime", null, (res) => {
          $.extend(this.formData, res);
        });
        this.sdk.get("GetCurrentLanguage", null, (res) => {
          $.extend(this.formData, res);
        });
      },
      update() {
        /*let sysSettings={
          "NtpServer1":this.formData.NtpServer1,
          "NtpServer2":this.formData.NtpServer2
        };*/
        let timeZone=this.realeTimeZone(sys.ZoneName);
        let currTime={
          "TimeZone":timeZone,
          "ZoneName":this.formData.ZoneName
        };
        let language={
          "Language":this.formData.Language
        };
        /*this.submit("formData", () => {*/
          /*this.sdk.post("SetSystemSettings", sysSettings, (res) => {*/
            /*if (this.requestJsonRpcIsOk(res)) {*/
              this.sdk.post("SetCurrentTime", currTime, (res) => {
                if (this.requestJsonRpcIsOk(res)) {
                  this.sdk.post("SetLanguage", language, (res) => {
                    if (this.requestJsonRpcIsOk(res)) {
                      ElementUI.Message.success(this.vuex.res.ids_success);
                        location.reload()
                    } else {
                      ElementUI.Message.error(this.vuex.res.ids_fail);
                    }
                  });
                } else {
                  ElementUI.Message.error(this.vuex.res.ids_fail);
                }
              });
            /*} else {
              ElementUI.Message.error(this.vuex.res.ids_fail);
            }*/
          /*});*/
        /*});*/
      },
      requestJsonRpcIsOk(result) {
        return result.hasOwnProperty("result") && !result.hasOwnProperty("error");
      },
      realeTimeZone(zoneNameList){
        let timeZone;
        for(let i=0;i<zoneNameList.length;i++){
          if(zoneNameList[i][1]==this.formData.ZoneName){
            return timeZone=zoneNameList[i][0];
          }
          
        }
      }
    }
}
</script>

<style lang="sass" scoped>
</style>