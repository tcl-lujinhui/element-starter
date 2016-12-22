<template lang="jade">
  include ../components.jade
  #algSettings
    +sideMenuPage('Settings')
      +breadcrumb("ALG Settings")
      +form("formData")
        +radio("PPTP:","PptpStatus")
        +radio("H.323 ALG Status:","H323AlgStatus")
        +radio("SIP ALG Status:","SipAlgStatus")
        +input("SIP port","SipAlgPort")
        +formBtn()
</template>

<script>
import _config from '../../config.js'
var Config = _config.algSettings;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.sdk.get("GetALGSettings", null, (res) => {
          this.formData = res;
        })
      },
      update() {
        let setForm = () => {
          this.sdk.post("SetALGSettings", this.formData, {
            callback: this.init
          })
        }
        this.submit("formData", setForm)
      }
    }
}
</script>



<style lang="sass" scoped>
</style>