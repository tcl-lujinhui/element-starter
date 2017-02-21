<template lang="jade">
  include ../components.jade
  #wps
    +sideMenuPage('Settings')
      +breadcrumb("ids_title_wps")
      +form("formData")
        +radio("ids_wlan_wpsMode:","wpsMode")
        div(v-if="formData.wpsMode==0")
          +input("ids_wlan_wpsPin:","WpsPin")        
        p.tips(v-if="formData.wpsMode==0")        
          | {{vuex.res.ids_note}}:<br/>         
          | {{vuex.res.ids_wifi_enableWpsPinStep1}}:<br/>        
          | {{vuex.res.ids_wifi_enableWpsPinStep2}}<br/>        
          | {{vuex.res.ids_wifi_enableWpsPinStep3}}
        p.tips(v-if="formData.wpsMode==1") 
          | {{vuex.res.ids_note}}:<br/>        
          | {{vuex.res.ids_wifi_enablePbcStep1}}:<br/>        
          | {{vuex.res.ids_wifi_enablePbcStep2}}<br/>        
          | {{vuex.res.ids_wifi_enablePbcStep3}}
        +formBtn()
</template>
<script>
import {_,_config,$,vuex,G} from '../../common.js';
let Config = _config.wps
export default {
  created() {
      this.init();      
      this.initdata(Config);
    },
    methods: {
      init() {
      },
      update() {
        let vm = this;
        let results = {
          callback: this.init,
          success: {
            tips: "Message",
            msg: this.vuex.res.ids_success,
            callback() {
              this.init;
            }
          },
          fail: this.vuex.res.ids_fail,
          e2: {
            tips: "None",
            callback() {
              vm.$alert(vuex.res['ids_wifi_notSuppotWepWpa'], vuex.res['ids_error'], {
                confirmButtonText: vuex.res['ids_ok'],
                callback: action => {
                  this.init;
                }
              });
            }
          },
          e3: {
            tips: "None",
            callback() {
              vm.$alert(vuex.res['ids_wifi_wpsActive'], vuex.res['ids_error'], {
                confirmButtonText: vuex.res['ids_ok'],
                callback: action => {
                  this.init;
                }
              });
            }
          }
        };
        if (this.formData.wpsMode == 0) {
          let params = {
            "WpsPin": this.formData.WpsPin
          }
          this.sdk.post("SetWPSPin", params, results);
        }
        if (this.formData.wpsMode == 1) {
          this.sdk.post("SetWPSPbc", null, results);
        }
      }
    }
}
</script>

<style lang="sass" scoped>
</style>