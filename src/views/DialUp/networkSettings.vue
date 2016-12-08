<template lang="jade">
  include ../components.jade
  #networkSettings
    +breadcrumb("Network Settings")
    +form("formData")
      +radio("NetselectionMode:","NetselectionMode")
      +select("NetworkMode:","NetworkMode")
      +formBtn()
</template>

<script>
import _Config from '../../config.js'
var Config = _Config.networkSettings
export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config)
      this.sdk.get("GetNetworkSettings",null,(res)=>{
        this.formData = res;
      })
    },

    update (){
      this.sdk.post("SetNetworkSettings",this.formData,(res)=>{
        console.log(res)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>