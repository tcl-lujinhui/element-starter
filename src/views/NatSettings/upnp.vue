<template lang="jade">
  include ../components.jade
  #upnpSettings
    +breadcrumb("UPnP Settings")
    +form("formData")
      
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
      this.data(Config);
      this.sdk.get("GetConnectionSettings",null,(res)=>{
        this.formData = res;
      })
    },
    update (){
      this.sdk.post("SetConnectionSettings",this.formData,(res)=>{
        console.log(res)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>