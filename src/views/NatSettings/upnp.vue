<template lang="jade">
  include ../components.jade
  #upnpSettings
    +sideMenuPage('Settings')
      +breadcrumb("ids_security_upnp")
      +form("formData")
        +radio("ids_security_upnp:","upnp_switch")
        +formBtn()
        p.tips {{vuex.res.ids_note}}:<br/>{{vuex.res.ids_upnp_Note}}
</template>

<script>
import {_,_config,vuex} from '../../common.js';
var Config = _config.upnpSettings;
export default {
  created () {
    this.initdata(Config);
    this.init();
  },
  methods: {
    init (){
      this.vuex=vuex;
      this.sdk.get("GetUpnpSettings",null,(res)=>{
        _.extend(this.formData,res)
      })
    },
    update (){
      this.sdk.post("SetUpnpSettings",this.formData,{
        callback:this.init
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>