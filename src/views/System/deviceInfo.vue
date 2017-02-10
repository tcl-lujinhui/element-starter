<template lang="jade">
  include ../components.jade
  div#deviceInfo
    +sideMenuPage('System')
      el-form(label-width="200px")
        +text("ids_system_deviceName:","{{SystemInfo.DeviceName}}")
        +text("ids_system_imei:","{{SystemInfo.IMEI}}")
        +text("ids_system_imsi:","{{SystemInfo.IMSI}}")
        +text("ids_system_myNumber:","{{SystemInfo.MSISDN}}")
        //-+text("ids_system_hardwareVersion:","{{SystemInfo.HwVersion}}")
        +text("ids_system_softwareVersion:","{{SystemInfo.SwVersionMain}}")
        +text("ids_system_modemVersion:","{{SystemInfo.SwVersion}}")
        +text("ids_lan_macAdress:","{{SystemInfo.MacAddress}}")
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