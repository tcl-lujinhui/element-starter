<template lang="jade">
  include ../components.jade
  #networkSettings
    +sideMenuPage('Settings')
      +breadcrumb("Network Settings")
      sim-state
        +form("formData")
          +radio("NetselectionMode:","NetselectionMode")
          +select("NetworkMode:","NetworkMode")
          +formBtn()
        
</template>

<script>
import _ from 'underscore';
import _Config from '../../config.js'
import vuex from '../../vuex.js';
var Config = _Config.networkSettings
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config)
        this.vuex = vuex
        vuex.initSimInfo()
        this.sdk.get("GetNetworkSettings", null, (res) => {
          this.formData=res
        })
      },

      update() {
        var vm = this;
        this.sdk.post("SetNetworkSettings", this.formData, (res) => {
          vm.init()
        })
      }
    }
}
</script>
<style lang="sass" scoped>
</style>
