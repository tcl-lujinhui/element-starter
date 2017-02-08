<template lang="jade">
  include ../components.jade
  #systemSettings
    +sideMenuPage('System')
      +breadcrumb("ids_system_pageTitle")
      +form("formData")
        +select("ids_system_languageSettings:","Language")
        +input("ids_system_ntpServer1:","NtpServer1")
        +input("ids_system_ntpServer2:","NtpServer2")
        //-+select("Time Zone:","TimeZone")
        +select("ids_system_timeZone:","ZoneName")
        +input("ids_system_currentTime:","CurrTime")(disabled)
        +formBtn()

</template>
<script>
import {_config,$} from '../../common.js';
import ElementUI from 'element-ui';
let Config = _config.systemSettings;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.sdk.get("GetSystemSettings", null, (res) => {
          $.extend(this.formData, res);
        });
        this.sdk.get("GetCurrentTime", null, (res) => {
          $.extend(this.formData, res);
        });

        this.sdk.get("GetCurrentLanguage", null, (res) => {
          $.extend(this.formData, res);
        });
      },
      update() {
        this.submit("formData", () => {
          this.sdk.post("SetSystemSettings", this.formData, (res) => {
            if (this.requestJsonRpcIsOk(res)) {
              this.sdk.post("SetCurrentTime", this.formData, (res) => {
                if (this.requestJsonRpcIsOk(res)) {
                  this.sdk.post("SetLanguage", this.formData, (res) => {
                    if (this.requestJsonRpcIsOk(res)) {
                      ElementUI.Message.success(this.vuex.res.ids_success);
                    } else {
                      ElementUI.Message.error(this.vuex.res.ids_fail);
                    }
                  });
                } else {
                  ElementUI.Message.error(this.vuex.res.ids_fail);
                }
              });
            } else {
              ElementUI.Message.error(this.vuex.res.ids_fail);
            }
          });
        })
      },
      requestJsonRpcIsOk(result) {
        return result.hasOwnProperty("result") && !result.hasOwnProperty("error");
      }
    }
}
</script>




<style lang="sass" scoped>
</style>