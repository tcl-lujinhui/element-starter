<template lang="jade">
  include ../components.jade
  #dmzSettings
    +sideMenuPage('Settings')
      +breadcrumb("ids_security_dmzTitle")
      +form("formData")
        +radio("ids_security_dmzTitle:","dmz_status")
        +input("ids_security_dmzHostIP:","dmz_ip")
        +formBtn()
</template>

<script>
import {_config} from '../../common.js';
var Config = _config.dmzSettings;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        //this.vuex=vuex;
        this.sdk.get("GetDMZSettings", null, (res) => {
          this.formData = res;
        })
      },
      update() {
        let setForm = () => {
          this.sdk.post("SetDMZSettings", this.formData, {
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