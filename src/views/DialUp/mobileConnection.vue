<template lang="jade">
  include ../components.jade
  #mobileConnection
    +breadcrumb("Mobile Connection")
    +form("formData")
      +radio("Connection Mode:","ConnectMode")
      +select("PdpType:","PdpType")
      +formBtn()
</template>

<script>
import _config from '../../config.js'
var Config = _config.mobileConnection;
export default {
  created() {
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

<style lang="sass">
</style>