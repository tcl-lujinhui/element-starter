<template lang="jade">
  include ../components.jade
  #mobileConnection
    +sideMenuPage('Settings')
      +breadcrumb("Mobile Connection{{common.age}}")
      +form("formData")
        +radio("Connection Mode:","ConnectMode")
        +select("PdpType:","PdpType")
          +button("sdfsd") 
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
        this.formData = res;
      })
    },
    update (){
      let vm = this;
      this.sdk.post("SetConnectionSettings",this.formData,(res)=>{
        this.init()
      })
    }
  }
}
</script>

<style lang="sass">
</style>