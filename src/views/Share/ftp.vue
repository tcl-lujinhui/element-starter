<template lang="jade">
  include ../components.jade
  #ftp
    +form("formData")
      +formItem("ids_samba_menuFtp:")
        el-switch(v-model="page.ftpStatus" @change="update()" on-text="" off-text="")
      div(v-if="formData.FtpStatus==1")
        +formItem("ids_share_storage:")
          | {{vuex.res.ids_samba_storageUsb}} 
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
let Config = _config.ftp;
export default {
  created() {
      this.init();      
      this.initdata(Config);
    },
    methods: {
      init() {
        this.page = {
          ftpStatus: false
        }
        this.sdk.get("GetFtpSettings", null, (res) => {
          this.formData = res;
          this.page.ftpStatus = this.formData.FtpStatus == 1 ? true : false;
        });
      },
      update() {
        let results = {
          callback:this.init
        };
        this.formData.FtpStatus = this.page.ftpStatus == true ? 1 : 0;
        this.sdk.post("SetFtpSettings", this.formData, results);
      }
    }
}
</script>

<style lang="sass" scoped>
</style>
