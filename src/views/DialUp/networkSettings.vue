<template lang="jade">
  include ../components.jade
  #networkSettings
    +sideMenuPage('Settings')
      +breadcrumb("ids_netwrok_Title")
      sim-state
        +form("formData")
          +radio("ids_networkSearchMode:","NetselectionMode")
          +select("ids_netwrok_netMode:","NetworkMode")
          +formBtn()
        
</template>

<script>
import {
  _,
  _config,
  $,
  vuex,
  G
} from '../../common.js';
var Config = _config.networkSettings
export default {
  created() {
      this.init();
      this.initdata(Config);
    },
    methods: {
      init() {
        this.vuex = vuex
        vuex.initSimInfo()
        this.sdk.get("GetNetworkSettings", null, (res) => {
          this.formData = res;
        })
      },
      update() {
        this.sdk.post("SetNetworkSettings", this.formData, {
          callback: this.init
        })
      }
    }
}
</script>
<style lang="sass" scoped>
</style>
