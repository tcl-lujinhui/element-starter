<template lang="jade">
  include ./components.jade
  #setupWizard
    +sideMenuPage('Home')
      +breadcrumb("Setup Wizard")
      el-steps.margin-auto(:space="200",:active.number="page.setp_status")
        el-step(title="Internet")
        el-step(title="WLAN")
        el-step(title="WLAN Security")
        el-step(title="Confirm")
      +form("formData")
        div(v-show="page.setp_status==0")
          +select("Network mode:","NetselectionMode")
          +select("Connection mode:","NetworkMode")
        div(v-show="page.setp_status==1")
          +select("CountryCode:","CountryCode")
          +input("Current password:","AP2G.Ssid")
        div(v-show="page.setp_status==2") 
          +input("User name:","UserName")(disabled)
          +input("Current password:","CurrPassword")(type="password")
        div(v-show="page.setp_status==3")
          +input("User name:","UserName")(disabled)
          +input("Current password:","CurrPassword")(type="password")
        div(v-show="page.setp_status==4")
          h2 cofasdfsd
      div.center
        +button("Back")(@click="prev" type="primary")
        +button("Next")(@click="next" type="primary")
</template>

<script>
import {_,_config} from '../common.js'
let Config = _config.setupWizard;
console.log(_config.networkSettings)
_.extend(Config.formData,_config.networkSettings.formData,_config.Wlan.formData);
_.extend(Config.formOptions,_config.networkSettings.formOptions,_config.Wlan.formOptions);
_.extend(Config.formRules,_config.networkSettings.formRules,_config.Wlan.formRules);
console.log(Config)
export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.page={
        setp_status:0
      }
      this.initdata(Config);
      this.sdk.get("GetNetworkSettings", null, (res) => {
        _.extend(this.formData,res)
      })
    },
    update (){
      
    },
    prev(){
      if (this.page.setp_status-- <= 0){
        this.page.setp_status = 0;
      }
    },
    next() {
      if (this.page.setp_status++ > 3){
        this.page.setp_status = 4;
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>