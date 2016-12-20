<template lang="jade">
  include ../components.jade
  #wps
    +sideMenuPage('Settings')
      +breadcrumb("WLAN Basic")
      +form("formData")
        +select("WPS Mode:","wpsMode")
        div(v-if="formData.wpsMode==0")
          +input("WPS PIN:","WpsPin")
        +formBtn()
</template>
<script>
import _config from '../../config.js'
let Config = _config.wps
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
      },
      update() {
        if (this.formData.wpsMode == 0) {
          let params = {
            "WpsPin": this.formData.WpsPin
          }          
          this.sdk.post("SetWPSPin", params, (res) => {
            console.log(res)
          });
        }
        if (this.formData.wpsMode == 1) {
          this.sdk.post("SetWPSPbc", null, (res) => {
            console.log(res)
          });
        }
      }
    }
}
</script>



<style lang="sass" scoped>
</style>