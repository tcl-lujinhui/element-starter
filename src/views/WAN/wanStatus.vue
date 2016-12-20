<template lang="jade">
  include ../components.jade
  #wanStatus
    +sideMenuPage('Settings')
      +breadcrumb("WAN Status")
      el-form(label-width="200px")
        +text("Wan Connection Type:","{{formData.exConnectTypeStr}}")
        +text("Status:","{{formData.exStatusStr}}")
        +text("IP Address:","{{formData.IpAddress}}")
        +text("Internet Connection Status:","{{page.getWanIsConnInter.exConnToInterStatusStr}}")
</template>

<script>
//import _Config from '../../config.js'
//import vuex from '../../vuex.js';
//let Config = _Config.wanStatus;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        //this.initdata(Config);
        //this.vuex = vuex
        this.page={
          getWanIsConnInter:{}
        }
        this.sdk.get("GetWanSettings", null, (res) => {
          this.formData = res;
        });
        this.sdk.get("GetWanIsConnInter", null, (res) => {
          this.page.getWanIsConnInter = res;
        });
      }
    }
}
</script>

<style lang="sass" scoped>
</style>