<template lang="jade">
  include ../components.jade
  #dmzSettings
    +sideMenuPage('Settings')
      +breadcrumb("ids_security_dmzTitle")
      +form("formData")
        +radio("ids_security_dmzTitle:","dmz_status")
        +input("ids_security_dmzHostIP:","dmz_ip")
        +formBtn()
        p.tips {{vuex.res.ids_note}}:<br/>{{vuex.res.ids_security_dmzNote}}
</template>

<script>
import {_,_config} from '../../common.js';
var Config = _config.dmzSettings;
export default {
  created() {
      this.initdata(Config);
      this.init()
    },
    methods: {
      init() {
        this.sdk.get("getDMZInfo", null, (res) => {
          _.extend(this.formData,res)
        })
      },
      update() {
        let setForm = () => {
          this.sdk.post("setDMZInfo", this.formData, {
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