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
      this.init()
    },
    methods: {
      init() {
        this.vuex = vuex;
        this.initdata(Config);
      },
      update() {
        if (this.formData.wpsMode == 0) {
          let params = {
            "WpsPin": this.formData.WpsPin
          }          
          this.sdk.post("SetWPSPin", params, (res) => {
            console.log(res)
          });
        }
        if (this.formData.wpsMode == 1) {
          this.sdk.post("SetWPSPbc", null, (res) => {
            console.log(res)
          });
        }
      }
    }
}
</script>



<style lang="sass" scoped>
  .tips{
    font-size: 14px;
    margin-top: 60px;
    color: #5e6d82;
  }
</style>