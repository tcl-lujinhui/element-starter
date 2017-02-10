<template lang="jade">
  include ../components.jade
  #wanStatus
    +sideMenuPage('Settings')
      +breadcrumb("ids_ethWan_menuWanStatus")
      el-form(label-width="200px")
        +text("ids_duration:","{{vuex.WanSettings.DurationTime | times('2')}}")
        +text("ids_lan_conStatus:","{{vuex.WanSettings.exStatusStr | res}}")   
        +text("ids_lan_macAdress:","{{formData.MacAddr}}")
        +text("ids_netwrok_connectionMode:","{{vuex.WanSettings.exConnectTypeStr | res}}")
        +text("ids_ipAddress:","{{vuex.WanSettings.IpAddress}}")
        +text("ids_subnetMark:","{{vuex.WanSettings.SubNetMask}}")        
        +text("ids_ethWan_defaultGateway:","{{vuex.WanSettings.Gateway}}")
        +text("ids_ethWan_primaryDNS:","{{vuex.WanSettings.PrimaryDNS}}")
        +text("ids_ethWan_secondaryDNS:","{{vuex.WanSettings.SecondaryDNS}}")
</template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
//let Config = _config.wanStatus;
export default {
  created() {
      this.init();
      this.InterWanConnStatus = setInterval(vuex.refreshWanConnStatus, 5000);
      this.InterWanSettings = setInterval(vuex.refreshWanSettings, 5000);
    },
    destroyed() {
      clearInterval(this.InterWanConnStatus);
      clearInterval(this.InterWanSettings);
      this.InterWanConnStatus = null;
      this.InterWanSettings = null;
    },
    methods: {
      init() {
        //this.initdata(Config);
        this.page = {};

        this.sdk.get("GetWanCurrentMacAddr", null, (res) => {
          _.extend(this.formData, res);
        });
        vuex.refreshWanConnStatus();
        vuex.refreshWanSettings();
      }
    }
}
</script>

<style lang="sass" scoped>
</style>