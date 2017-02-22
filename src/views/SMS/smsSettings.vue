<template lang="jade">
  include ../components.jade
  #smsSettings
    +sideMenuPage('Services')
      +breadcrumb("ids_menu_smsSettings")
      sim-state
        +form("formData")
          div(v-if="pageItem.StoreFlag")
            +radio("ids_sms_storagePath:","StoreFlag")
          +radio("ids_sms_settingSmsReport:","SMSReportFlag")
          +input("ids_sms_centerNum:","SMSCenter")(disabled)
          +formBtn()
</template>

<script>
import {_config,_ ,vuex} from '../../common.js';
let Config = _config.smsSettings;
export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config);
      this.sdk.get("GetSMSSettings",null,(res)=>{
        this.formData = res;
      });
    },
    update (){
      let results = {
        callback:this.init
      };
      this.sdk.post("SetSMSSettings",this.formData,results);
    }
  }
}
</script>

<style lang="sass" scoped>
</style>