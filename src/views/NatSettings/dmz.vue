<template lang="jade">
  include ../components.jade
  #dmzSettings
    +sideMenuPage('Settings')
      +breadcrumb("DMZ Settings")
      +form("formData")
        +radio("dmz status:","dmz_status")
        +input("dmz ip","dmz_ip")
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