<template lang="jade">
  include ../components.jade
  #firewall
    +sideMenuPage('Settings')
      +breadcrumb("Firewall")
      +form("formData")
        +radio("WAN Port Ping:","disableWanAcess")
        +formBtn()
        p.tips Note:Firewall settings can help you to enhance the security of your network, please make appropriate settings according to your needs
</template>

<script>
import _config from '../../config.js'
import ElementUI from 'element-ui'
var Config = _config.firewall;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.sdk.get("GetWanAccess", null, (res) => {
          this.formData = res;
        })
      },
      requestJsonRpcIsOk(result) {
        return result.hasOwnProperty("result") && !result.hasOwnProperty("error");
      },
      update() {
        let vm = this;
        this.sdk.post("SetWanAccess", this.formData, (res) => {
          if (this.requestJsonRpcIsOk(res)) {
              ElementUI.Message.success("succeed");
              vm.init()
            } else {
              ElementUI.Message.error("failed");
              vm.init()
            }
        })
      }
    }
}
</script>


<style lang="sass" scoped>
  .tips{
    font-size: 14px;
    margin-top: 60px;
    color: #5e6d82;
  }
</style>