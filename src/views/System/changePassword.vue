<template lang="jade">
  include ../components.jade
  #changePassword
    +sideMenuPage('System')
      +breadcrumb("Password Change")
      +form("formData")
        +input("User name:","UserName")(disabled)
        +input("Current password:","CurrPassword")(type="password")
        +input("New password:","NewPassword")(type="password")
        +input("Confirm password:","ConfirmPassword")(type="password")
        +formBtn()

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