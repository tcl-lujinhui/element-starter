<template lang="jade">
  include ../components.jade
  div#deviceInfo
    el-form(label-width="200px")
      +text("Device Name:","{{SystemInfo.DeviceName}}")
      +text("IMEI:","{{SystemInfo.IMEI}}")
      +text("IMSI:","{{SystemInfo.IMSI}}")
      +text("My Number:","{{SystemInfo.SISDN}}")
      +text("Hardware version:","{{SystemInfo.HwVersion}}")
      +text("Software version:","{{SystemInfo.SwVersion}}")
      +text("MAC address:","{{SystemInfo.HwVersion}}")
</template>
<script>
export default {
  data () {
    return {
      SystemInfo:{}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init (){
      this.sdk.get("GetSystemInfo",null,(res)=>{
        console.log(res)
        this.SystemInfo = res;
      })
    }
  }
}
</script>
<style lang="sass" scoped>
  .el-form-item{
    margin-bottom:0
  }
</style>