<template lang="jade">
  include ../components.jade
  #upnpSettings
    +sideMenuPage('Settings')
      +breadcrumb("UPnP Settings")
      +form("formData")
        +radio("UPnP Status","upnp_switch")
        +formBtn()
</template>

<script>
import _config from '../../config.js'
var Config = _config.upnpSettings;
export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config);
      this.sdk.get("GetUpnpSettings",null,(res)=>{
        this.formData = res;
      })
    },
    update (){
      this.sdk.post("SetUpnpSettings",this.formData,{
        callback:this.init
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>