<template lang="jade">
  include ../components.jade
  #wlanBasic
    +sideMenuPage('Settings')
      +breadcrumb("ids_wlan_basic")
      +form("formData")
        div {{vuex.res.ids_wlan_2ghz}}
        +radio("ids_quicksetup_wlan2g","AP2G.ApStatus")
        div(v-if="formData.AP2G.ApStatus==1")
          +input("ids_wifi_ssid:","AP2G.Ssid")
          +radio("ids_wlan_ssidBroadcast:","AP2G.SsidHidden")
          +select("ids_wlan_security:","AP2G.SecurityMode")
          div(v-show="formData.AP2G.SecurityMode==1")
            +select("ids_wifi_encryption:","AP2G.WepType")
          div(v-show="formData.AP2G.SecurityMode==2||formData.AP2G.SecurityMode==3||formData.AP2G.SecurityMode==4")
            +select("ids_wifi_encryption:","AP2G.WpaType")
          div(v-show="formData.AP2G.SecurityMode==1")
            +input("ids_quicksetup_wlanPassword:","AP2G.WepKey")(:type="formData.show2GPassword==1?'text':'password'")
          div(v-show="formData.AP2G.SecurityMode==2||formData.AP2G.SecurityMode==3||formData.AP2G.SecurityMode==4")
            +input("ids_quicksetup_wlanPassword:","AP2G.WpaKey")(:type="formData.show2GPassword==1?'text':'password'")
          div(v-show="formData.AP2G.SecurityMode!=0")
            +checkbox("","show2GPassword","ids_wlan_showPw")
        div {{vuex.res.ids_wlan_5ghz}}
        +radio("ids_quicksetup_wlan5g","AP5G.ApStatus")
        div(v-if="formData.AP5G.ApStatus==1")
          +input("ids_wifi_ssid:","AP5G.Ssid")
          +radio("ids_wlan_ssidBroadcast","AP5G.SsidHidden")
          +select("ids_wlan_security:","AP5G.SecurityMode")
          div(v-show="formData.AP5G.SecurityMode==1")
            +select("ids_wifi_encryption:","AP5G.WepType")
          div(v-show="formData.AP5G.SecurityMode==2||formData.AP5G.SecurityMode==3||formData.AP5G.SecurityMode==4")
            +select("ids_wifi_encryption:","AP5G.WpaType")
          div(v-show="formData.AP5G.SecurityMode==1")
            +input("ids_quicksetup_wlanPassword:","AP5G.WepKey")(:type="formData.show5GPassword==1?'text':'password'")
          div(v-show="formData.AP5G.SecurityMode==2||formData.AP5G.SecurityMode==3||formData.AP5G.SecurityMode==4")
            +input("ids_quicksetup_wlanPassword:","AP5G.WpaKey")(:type="formData.show5GPassword==1?'text':'password'")
          div(v-show="formData.AP5G.SecurityMode!=0")
            +checkbox("","show5GPassword","ids_wlan_showPw")
        +formBtn()
</template>

<script>
import {$,_config,vuex} from '../../common.js';
let Config = _config.Wlan;
export default {
  created () {
    this.initdata(Config);
    this.init()
  },
  methods: {
    init (){
      this.vuex=vuex;
      this.sdk.get("GetWlanSettings",null,(res)=>{
        $.extend(this.formData,res)
      })
    },
    update (){
      let setForm = () => {        
        this.$confirm(vuex.res['ids_lan_restartWarn'], vuex.res['ids_confirm'], {
          confirmButtonText: vuex.res['ids_ok'],
          cancelButtonText: vuex.res['ids_cancel'],
          type: 'warning'
        }).then(() => {
          this.sdk.post("SetWlanSettings", this.formData, {
            callback: this.init
          });
        }).catch(() => {

        }); 
      }
      this.submit("formData", setForm)    
    }
  }
}
</script>

<style lang="sass" scoped>
</style>