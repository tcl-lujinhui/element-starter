<template lang="jade">
  include ../components.jade
  #systemSettings
    +sideMenuPage('System')
      +breadcrumb("System Settings")
      +form("formData")
        +select("Antenna Switch:","AntennaSwitch")
        +select("Language Settings:","Language")
        +input("Current Time:","CurrTime")
        +input("NTP Server1:","NtpServer1")
        +input("NTP Server2:","NtpServer2")
        +select("Time Zone:","TimeZone")
        +formBtn()

</template>
<script>
import $ from 'jquery';
import _Config from '../../config.js';
import ElementUI from 'element-ui';
let Config = _Config.systemSettings;
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
        this.sdk.post("SetSystemSettings", this.formData, (res) => {
          if (this.requestJsonRpcIsOk(res)) {
            this.sdk.post("SetCurrentTime", this.formData, (res) => {
              if (this.requestJsonRpcIsOk(res)) {
                this.sdk.post("SetLanguage", this.formData, (res) => {
                  if (this.requestJsonRpcIsOk(res)) {
                    ElementUI.Message.success("Succeeded!");
                  } else {
                    ElementUI.Message.error("Failed!");
                  }
                });
              } else {
                ElementUI.Message.error("Failed!");
              }
            });
          } else {
            ElementUI.Message.error("Failed!");
          }
        });
        /*let setSysRes = false;
        let setTimeRes = false;
        let setLanguageRes = false;
        this.sdk.post("SetSystemSettings", this.formData, (res) => {
          if (this.requestJsonRpcIsOk(res)) {
            alert(1)
            setSysRes = true;
          } else {
            alert(2);
            setSysRes = false;
          }
        });
        this.sdk.post("SetCurrentTime", this.formData, (res) => {
          if (this.requestJsonRpcIsOk(res)) {
            alert(3);
            setTimeRes = true;
          } else {
            alert(4);
            setTimeRes = false;
          }
        });
        this.sdk.post("SetLanguage", this.formData, (res) => {
          if (this.requestJsonRpcIsOk(res)) {
            alert(5);
            setLanguageRes = true;
          } else {
            alert(6);
            setLanguageRes = false;
          }
        });
        if (setSysRes&&setTimeRes&&setLanguageRes) {
          console.log("Succeeded");
          ElementUI.Message.success("Succeeded!");
        } else {
          console.log("Failed!");
          ElementUI.Message.error("Failed!");

        }*/
      },
      requestJsonRpcIsOk(result) {
        return result.hasOwnProperty("result") && !result.hasOwnProperty("error");
      }
    }
}
</script>



<style lang="sass" scoped>
</style>