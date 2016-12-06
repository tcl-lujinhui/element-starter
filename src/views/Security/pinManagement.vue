<template lang="jade">
  include ../components.jade
  #pinManagement
    +form("formData")
      +formBtn()
</template>

<script>
import _config from '../../config.js'
var Config = _config.pinManagement;
export default {
  data () {
    return {
      formOptions:Config.formOptions,
      formData: {},
      formRules:Config.formRules
    }
  },
  mounted() {
    this.init()
  },
  methods: {
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