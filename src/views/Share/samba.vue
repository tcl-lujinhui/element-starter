<template lang="jade">
  include ../components.jade
  #samba
    +form("formData")
      +formItem("ids_samba_menuSamba:")
        el-switch(v-model="page.sambaStatus" @change="update()" on-text="" off-text="")
      div(v-if="formData.SambaStatus==1")
        +formItem("ids_share_storage:")
          | {{vuex.res.ids_samba_storageUsb}}
        div(v-if="pageItem.Anonymous")
          +radio("ids_samba_anonymous:","Anonymous")
          div(v-if="formData.Anonymous==1")      
            +subText("","{{vuex.res.ids_anonymousEnableTips}}")
          div(v-if="formData.Anonymous==0")        
            +subText("","{{vuex.res.ids_anonymousDisableTips1}}")
            +subText("","{{vuex.res.ids_anonymousDisableTips2}}")        
            +subText("","{{vuex.res.ids_anonymousDisableTips3}}")        
        +radio("ids_samba_rights:","AuthType")
        +formBtn()
</template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
let Config = _config.samba;
export default {
  created() {
      this.init();
      this.initdata(Config);
    },
    methods: {
      init() {        
        this.page = {
          sambaStatus: false
        }
        this.sdk.get("GetSambaSettings", null, (res) => {
          this.formData = res;
          this.page.sambaStatus = this.formData.SambaStatus == 1 ? true : false;
        });
      },
      update() {
        let results = {
          callback:this.init
        };
        this.formData.SambaStatus = this.page.sambaStatus == true ? 1 : 0;
        this.sdk.post("SetSambaSettings", this.formData, results);
      }
    }
}
</script>

<style lang="sass" scoped>
</style>
