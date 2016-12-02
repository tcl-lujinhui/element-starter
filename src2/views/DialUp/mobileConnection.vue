<template lang="jade">
  include ../components.jade
  #mobileConnection
    include ./menu.jade
    +form("formData")
      +radio("Connection Mode:","ConnectMode")
      +select("PdpType:","PdpType")
      +formBtn()
</template>

<script>
import _config from '../../config.js'
var Config = _config.mobileConnection;
export default {
  data () {
    return {
      formOptions:Config.formOptions,
      formData: {}
    }
  },
  created () {
    console.log("sfadfasfsadfsd")
    console.log(this.appConfig)
    this.init()
  },
  methods: {
    reset() {
      this.init()
      this.$refs.formData.resetFields();
    },
    init (){
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