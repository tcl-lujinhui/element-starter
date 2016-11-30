<template lang="jade">
  include ../components.jade
  #mobileConnection
    +form("formData")
      +select("Connection Mode:")(v-model.mumber="formData.ConnectMode")
        el-option(label="Manual", :value.number="0")
        el-option(label="Auto", :value.number="1")
      +select("Connection Mode:")(v-model.mumber="formData.PdpType")
        el-option(label="IPV4", :value.number="0")
        el-option(label="IPV6", :value.number="2")
        el-option(label="IPv4v6", :value.number="3")
      +formBtn()

</template>
<script>
import Config from '../../config.js'
console.log(Config)
export default {
  data () {
    return {
      formData: {}
    }
  },
  beforeMount () {
    this.init()
  },
  methods: {
    init(){
      this.sdk.get("GetConnectionSettings",null,(res)=>{
        this.formData = res;
      })
    },
    reset() {
      this.init()
    },
    update (ev){
      this.sdk.post("SetConnectionSettings",this.formData,(res)=>{
        console.log(res)
      })
    }
  }
}
</script>
<style lang="sass">
</style>