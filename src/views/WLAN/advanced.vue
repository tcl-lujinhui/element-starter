<template lang="jade">
  include ../components.jade
  #advance
    +sideMenuPage('Settings')
      +breadcrumb("ids_wlan_advanced")
      +form("formData")
        div {{vuex.res.ids_wlan_2ghz}}
        div(v-if="formData.AP2G.ApStatus==1")
          +select("ids_wlan_countryRegion:","AP2G.CountryCode")
          +select("ids_wlan_802Mode:","AP2G.WMode")
          +select("ids_wlan_apIsolation:","AP2G.ApIsolation")
          +select("ids_wlan_bandwidth:","AP2G.Bandwidth")
          
        div {{vuex.res.ids_wlan_5ghz}}
        div(v-if="formData.AP5G.ApStatus==1") 
          +select("ids_wlan_countryRegion:","AP5G.CountryCode")
          +select("ids_wlan_802Mode:","AP5G.WMode")
          +select("ids_wlan_apIsolation:","AP5G.ApIsolation")
          +select("ids_wlan_bandwidth:","AP5G.Bandwidth")
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
        this.sdk.post("SetWlanSettings", this.formData, {
          callback: this.init
        })
      }
      this.submit("formData", setForm)    
    }
  }
}
</script>

<style lang="sass" scoped>
</style>