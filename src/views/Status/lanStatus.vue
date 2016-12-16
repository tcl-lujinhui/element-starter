<template lang="jade">
  include ../components.jade
  #lanStatus
    +sideMenuPage('Home')
      +breadcrumb("LAN Status")
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