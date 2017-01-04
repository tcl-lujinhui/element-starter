<template lang="jade">
  include ./components.jade
  #setupWizard
    +sideMenuPage('Home')
      +breadcrumb("Setup Wizard")
      el-steps.margin-auto(:space="250",:active.number="page.setp_status")
        el-step(title="SIM")
        el-step(title="Wi-Fi")
        el-step(title="Wi-Fi Security")
      +form("formData")
        div(v-show="page.setp_status==1")
          sim-state
            +select("Network mode:","NetworkMode")
            +select("Connection mode:","ConnectMode")
            +checkbox("","RoamingConnect","Enable even when roaming")
            div.center
              +button("Next")(@click="next" type="primary" v-show="page.setp_status!=3")
        div(v-show="page.setp_status==2")
          div 2.4GHz
          +checkbox("Wi-Fi 2.4GHz","CountryCode","Enable")
          +input("SSID:","AP2G.Ssid")
          +select("CountryCode:","CountryCode")
          +checkbox("SSID broadcast","CountryCode","Enable")
          div 5GHz
          +checkbox("Wi-Fi 5GHz","CountryCode","Enable")
          +input("SSID:","AP2G.Ssid")
          +select("CountryCode:","CountryCode")
          +checkbox("SSID broadcast","CountryCode","Enable")
          div.center
            +button("Back")(@click="prev" type="primary" v-show="page.setp_status!=0")
            +button("Next")(@click="next" type="primary" v-show="page.setp_status!=3")
        div(v-show="page.setp_status==3") 
          div 2.4GHz
          +select("Security:","CountryCode")
          +select("Encryption:","CountryCode")
          +input("Wi-Fi Password:","AP2G.Ssid")(type="password")
          div 5GHz
          +select("Security:","CountryCode")
          +select("Encryption:","CountryCode")
          +input("Wi-Fi Password:","AP2G.Ssid")(type="password")
          div.center
            +button("Back")(@click="prev" type="primary" v-show="page.setp_status!=0")
            +button("Done")(@click="next" type="primary" v-show="page.setp_status==3")
      
</template>

<script>
import {_,_config} from '../common.js'
let Config = _config.setupWizard;
_.extend(Config.formData,_config.mobileConnection.formData,_config.networkSettings.formData,_config.Wlan.formData);
_.extend(Config.formOptions,_config.mobileConnection.formOptions,_config.networkSettings.formOptions,_config.Wlan.formOptions);
_.extend(Config.formRules,_config.networkSettings.formRules,_config.Wlan.formRules);
export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.page={
        setp_status:1
      }
      this.initdata(Config);
      this.sdk.get("GetNetworkSettings", null, (res) => {
        _.extend(this.formData,res)
      })
    },
    update (){
      
    },
    prev(){
      if (this.page.setp_status-- <= 1){
        this.page.setp_status = 1;
      }
    },
    next() {
      this.page.setp_status++
      if (this.page.setp_status> 3){
        this.page.setp_status = 3;
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>