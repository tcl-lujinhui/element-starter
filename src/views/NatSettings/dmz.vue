<template lang="jade">
  include ../components.jade
  #dmzSettings
    +sideMenuPage('Settings')
      +breadcrumb("DMZ Settings")
      +form("formData")
        +radio("dmz status:","dmz_status")
        +input("dmz ip","dmz_ip")
        +formBtn()
</template>

<script>
import _config from '../../config.js'
var Config = _config.dmzSettings;
export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config);
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