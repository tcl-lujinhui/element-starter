<template lang="jade">
  include ../components.jade
  #virtualServer
    +breadcrumb("Virtual Server")
    +form("formData")
      +formBtn()
    +button("open")(@click="dialogFormVisible = true")
    el-dialog(title="收货地址" v-model="dialogFormVisible")
      p asdfasdf安抚
</template>

<script>
import _config from '../../config.js'
var Config = _config.virtualServer;
export default {
  created () {
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

<style lang="sass" scoped>
</style>