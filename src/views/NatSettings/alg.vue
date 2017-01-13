<template lang="jade">
  include ../components.jade
  #algSettings
    +sideMenuPage('Settings')
      +breadcrumb("ids_alg_title")
      +form("formData")
        +radio("PPTP:","PptpStatus")
        +radio("H.323 ALG Status:","H323AlgStatus")
        +radio("SIP ALG Status:","SipAlgStatus")
        +input("SIP port","SipAlgPort")
        +formBtn()
        p.tips {{vuex.res.ids_note}}:<br/>{{vuex.res.ids_alg_Note}}
</template>

<script>
import {_config,vuex} from '../../common.js';
var Config = _config.algSettings;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.vuex=vuex;
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