<template lang="jade">
  include ../components.jade
  #pinManagement
    +sideMenuPage('Settings')
      +breadcrumb("PIN Management")
      +form("formData")
        div(v-if="formData.pinState==1")
          +select('PIN operation:',"Operation")
        div(v-if="formData.pinState==0")
          +formItem("PIN operation:")
            div Eanbel PIN
        +input("PIN  Code","pinCode")
        +formBtn()
</template>

<script>
import _config from '../../config.js'
var Config = _config.pinManagement;
export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config)
      this.GetSIMInfo={}
      this.sdk.get("GetSIMInfo",null,(res)=>{
        this.GetSIMInfo = res;
      })
    },

    UnlockPin (){
      var postData ={
        Pin:this.this.formData.PinCode,
      }
      this.sdk.post("UnlockPin",postData,(res)=>{
        console.log(res)
      })
    },
    UnlockPuk (){
      var postData ={
        PUK:this.this.formData.Puk,
        Pin:this.this.formData.PinCode,
      }
      this.sdk.post("UnlockPin",postData,(res)=>{
        console.log(res)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>