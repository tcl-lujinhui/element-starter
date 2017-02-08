<template lang="jade">
  include ../components.jade
  #mobileConnection
    +sideMenuPage('Settings')
      +breadcrumb("ids_network_Mobconn")
      +form("formData")
        +radio("ids_netwrok_connectionMode:","ConnectMode")
        +select("ids_netwrok_connnectIpMode:","PdpType")
        +checkbox("","RoamingConnect","ids_netwrok_roamingEnable")(v-show="formData.ConnectMode==1")
        +formBtn()
  </template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
var Config = _config.mobileConnection;
export default {
  created() {
      this.init();
      this.initdata(Config);
    },
    methods: {
      init() {
        this.vuex= vuex
        this.sdk.get("GetConnectionSettings", null, (res) => {
          this.formData = res;
        })
      },
      update() {
        // no form validate ,no need to setform submitted.
        this.sdk.post("SetConnectionSettings", this.formData, {
            callback: this.init
          })
      }
    }
}
</script>

<style lang="sass">
</style>