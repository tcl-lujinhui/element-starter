<template lang="jade">
  include ../components.jade
  #networkSettings
    include ./menu.jade
    +form("formData")
      +radio("NetselectionMode:","NetselectionMode")
      +select("NetworkMode:","NetworkMode")
      +formBtn()
</template>

<script>
import _Config from '../../config.js'
var Config = _Config.networkSettings
export default {
  data () {
    return {
      formOptions:Config.formOptions,
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