<template lang="jade">
  include ../components.jade
  #changePassword
    +form("formData")
      +input("User name:","UserName")(disabled)
      +input("Current password:","CurrPassword")(type="password")
      +input("New password:","NewPassword")(type="password")
      +input("Confirm password:","ConfirmPassword")(type="password")
      +formBtn()

</template>
<script>
import $ from 'jquery'
import _config from '../../config.js'
var Config = _config.changePassword;
export default {
  data() {
    var extensionRules = {};
    if(Config.validates){
      $.each(Config.validates,(k,v)=>{
        extensionRules[k] = v(this)
      })
    }
    return {
      formOptions: {},
      formData: {},
      formRules: {},
      extensionRules:extensionRules
    }
  },
  created() {
    this.init()
  },
  methods: {
    init (){
      this.data(Config,this)
      if(Config.formRulesExtension){
        $.each(Config.formRulesExtension,(k,v)=>{
          let rule = {};
          rule.trigger = v.trigger
          rule.validator=this.extensionRules[v.validator]
          this.formRules[k].push(rule)
        })
      }
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