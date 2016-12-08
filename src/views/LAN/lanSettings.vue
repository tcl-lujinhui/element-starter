<template lang="jade">
  include ../components.jade
  #lanSettings
    +breadcrumb("Lan Settings")
    +form("formData")
      +input("IPv4 IP address:","IPv4IPAddress")
      +input("SubnetMask","SubnetMask")
      +formItem("DHCP Server:")
        el-checkbox(v-model="formData.DHCPServerStatus",:true-label.number="1",:false-label.number="0")
      div(v-if="formData.DHCPServerStatus==1")
        +input("Start IP Address:","StartIPAddress")
        +input("End IP Address:","EndIPAddress")
        +input("DHCP Lease Time:","DHCPLeaseTime")
      
      +formBtn()
</template>

<script>
import _config from '../../config.js'
var Config = _config.lanSettings;
export default {
  data() {
    var validates = {};
    return {
      formOptions: {},
      formData: {},
      formRules: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config,this);
      this.sdk.get("GetLanSettings",null,(res)=>{
        this.formData = res;
      })
    },
    update (){
      this.sdk.post("SetLanSettings",this.formData,(res)=>{
        console.log(res)
      })
    }
  }
}
</script>

<style lang="sass">
</style>