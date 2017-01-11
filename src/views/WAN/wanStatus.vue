<template lang="jade">
  include ../components.jade
  #wanStatus
    +sideMenuPage('Settings')
      +breadcrumb("ids_ethWan_menuWanStatus")
      el-form(label-width="200px")
        +text("ids_duration:","{{}}")
        +text("ids_lan_conStatus:","{{page.getWanIsConnInter.exConnToInterStatusStr | res}}")   
        +text("ids_lan_macAdress:","{{formData.MacAddr}}")
        +text("ids_netwrok_connectionMode:","{{formData.exConnectTypeStr | res}}")
        +text("ids_ipAddress:","{{formData.IpAddress}}")
        +text("ids_subnetMark:","{{formData.SubNetMask}}")        
        +text("ids_ethWan_defaultGateway:","{{formData.Gateway}}")
        +text("ids_ethWan_primaryDNS:","{{formData.PrimaryDNS}}")
        +text("ids_ethWan_secondaryDNS:","{{formData.SecondaryDNS}}")
</template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
//let Config = _config.wanStatus;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        //this.initdata(Config);
        this.vuex = vuex
        this.page={
          getWanIsConnInter:{},
          lanSettingsInfo:{}
        }
        this.sdk.get("GetWanSettings", null, (res) => {
          this.formData = res;
        });
        this.sdk.get("GetWanIsConnInter", null, (res) => {
          this.page.getWanIsConnInter = res;
        });
        this.sdk.get("GetLanSettings", null, (res) => {
          this.page.lanSettingsInfo = res;
        });
        this.sdk.get("GetWanCurrentMacAddr", null, (res) => {
          _.extend(this.formData,res);
        })
      }
    }
}
</script>

<style lang="sass" scoped>
</style>