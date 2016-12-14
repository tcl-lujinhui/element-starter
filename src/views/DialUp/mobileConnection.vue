<template lang="jade">
  include ../components.jade
  #mobileConnection
    +breadcrumb("Mobile Connection{{common.age}}")
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
    this.init();
    this.Inter=setInterval(() => {
        this.common.age++;
        console.log("mobileConnection:"+this.common.age)
      }, 3000);
  },
  destroyed (){
    clearInterval(this.Inter)
    this.Inter = null
  },
  methods: {
    init (){
      this.initdata(Config);
      this.common=_config.$G,
      this.sdk.get("GetConnectionSettings",null,(res)=>{
        console.log(res)
        this.formData = res;
      })
    },
    add (){
      alert("huan")
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