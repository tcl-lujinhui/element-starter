<template lang="jade">
  include ../components.jade
  #algSettings
    +breadcrumb("ALG Settings")
    +form("formData")
      +radio("PPTP:","PptpStatus")
      +radio("H.323 ALG Status:","H323AlgStatus")
      +radio("SIP ALG Status:","SipAlgStatus")
      +input("SIP port","SipAlgPort")
      +formBtn()
</template>

<script>
import _config from '../../config.js'
var Config = _config.algSettings;
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