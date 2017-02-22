<template lang="jade">
  include ../components.jade
  #smsSettings
    +sideMenuPage('Services')
      +breadcrumb("ids_sms_smsForwarding")
      sim-state
        +form("formData")
          +radio("ids_sms_autoForward:","redirect_flag")
          +input("ids_sms_recipient:","redirect_number")
          //-(:disabled="formdata.redirect_flag==0")
          +formBtn()
</template>

<script>
import {_config,$,vuex} from '../../common.js';
let Config = _config.smsForwarding;
export default {
  created () {
    this.init();
  },
  methods: {
    init (){
      this.initdata(Config);
      this.page={
        inputDisabledeFlag:this.formData.redirect_flag
      };
      console.log(this.page.inputDisabledeFlag);
      this.sdk.get("getSMSAutoRedirectSetting",null,(res)=>{
        $.extend(this.formData, res);
      });
    },
    update (){
      let results = {
        callback:this.init
      };
      this.sdk.post("setSMSAutoRedirectSetting",this.formData,results);
    }
  }
}
</script>

<style lang="sass" scoped>
</style>