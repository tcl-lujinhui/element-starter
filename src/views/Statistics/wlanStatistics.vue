<template lang="jade">
  include ../components.jade
  #wlanStatistics
    +sideMenuPage('Home')
      +breadcrumb("WLAN Statistics")
</template>
<script>
import _config from '../../config.js'
var Config = _config.changePassword;
export default {
  created() {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config)
    },
    update (){
      this.submit("formData",()=>{
        this.sdk.post("ChangePassword",this.formData,(res)=>{
            this.reset()
          })
      })
      
    }
  }
}
</script>
<style lang="sass" scoped>
</style>