<template lang="jade">
  include ../components.jade
  #wlanBasic
    +sideMenuPage('Settings')
      +breadcrumb("WLAN Basic")
      +form("formData")
        
        +formBtn()
</template>

<script>
import {_config} from '../../common.js';
let Config = _config.Wlan;
export default {
  created () {
    this.init()
  },
  methods: {
    
    init (){
      this.initdata(Config);
    },
    update (){
      
    }
  }
}
</script>

<style lang="sass" scoped>
</style>