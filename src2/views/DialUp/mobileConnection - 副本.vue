<template lang="jade">
  include ../components.jade
  #mobileConnection
    +form("formData")
      +selects("Connection Mode:","ConnectMode")
      +selects("PdpType:","PdpType")
      +formBtn()
</template>
<script>
import Config from '../../config.js'
export default {
  data () {
    return {
      config:Config.mobileConnection,
      formData: {}
    }
  },
  beforeCreate(){
    console.log("####################################beforeCreate")
    //this.formOptions= Config.mobileConnection.form;
  },
  created () {
    console.log("####################################created")
    this.init()
  },
  mounted(){
    console.log("####################################mounted")
  },
  beforeUpdate(){
    console.log("####################################beforeUpdate")
  },
  updated(){
    console.log("####################################updated")
  },
  activated(){
    this.init()
    console.log("####################################activated")
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