<template lang="jade">
  include ../components.jade
  #advance
    +sideMenuPage('Settings')
      +breadcrumb("WLAN Advance")
      +form("formData")
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
  created () {
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

<style lang="sass" scoped>
</style>