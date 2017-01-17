<template lang="jade">
  include ../components.jade
  #usb
    +sideMenuPage('Services')
      +breadcrumb("ids_usb_Title")
      +form("formData")
        p(v-if="formData.UsbStatus==0")
          | {{vuex.res.ids_Wan_usbNotInsert}}
        +radioNoLabel("UsbStatus")(disabled v-if="formData.UsbStatus!=0") 
        p.tips(v-if="formData.UsbStatus==1") 
          | {{vuex.res.ids_note}}:<br/>        
          | {{vuex.res.ids_usb_sambaEnableStep1}}<br/>        
          | {{vuex.res.ids_usb_sambaEnableStep2}}{{vuex.res.ids_usb_storageStep2}}
        p.tips(v-if="formData.UsbStatus==2") 
          | {{vuex.res.ids_note}}:<br/>        
          | {{vuex.res.ids_usb_sambaEnableStep1}}<br/>        
          | {{vuex.res.ids_usb_sambaEnableStep2}}{{vuex.res.ids_usb_printerStep2}}<br/>
          | {{vuex.res.ids_usb_printerStep2Note}}<br/>
          | {{vuex.res.ids_usb_printerStep3}}<br/>
          | {{vuex.res.ids_usb_printerStep4}}
</template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
var Config = _config.usb;
export default {
  created() {
      this.init()
    },
    watch: {
      'vuex.SystemStatus.UsbStatus' (newValue, oldValue) {
        this.init()
      }
    },
    methods: {
      init() {        
        this.vuex = vuex;
        this.initdata(Config);
        this.formData = vuex.SystemStatus;
      },
      update() {
      }
    }
}
</script>


<style lang="sass" scoped>
  .tips{
    font-size: 14px;
    margin-top: 60px;
    color: #5e6d82;
  }
</style>