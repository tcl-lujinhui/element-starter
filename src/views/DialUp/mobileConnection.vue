<template lang="jade">
  include ../components.jade
  #mobileConnection
    +sideMenuPage('Settings')
      +breadcrumb("ids_network_Mobconn")
      +form("formData")
        +radio("ids_netwrok_connectionMode:","ConnectMode")
        +select("PdpType:","PdpType")
        +formBtn()
  </template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
var Config = _config.mobileConnection;
export default {
  created() {
      this.init();
      this.Inter = setInterval(() => {
        console.log("mobileConnection: ")
      }, 3000);
    },
    destroyed() {
      clearInterval(this.Inter)
      this.Inter = null
    },
    methods: {
      init() {
        this.vuex= vuex
        this.initdata(Config);
        this.sdk.get("GetConnectionSettings", null, (res) => {
          this.formData = res;
        })
      },
      update() {
        let setForm = () => {
          this.sdk.post("SetConnectionSettings", this.formData, {
            callback: this.init
          })
        }
        this.submit("formData", setForm); 
      }
    }
}
</script>

<style lang="sass">
</style>