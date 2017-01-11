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
        +radio("ids_samba_rights:","AuthType")
        +formBtn()
</template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
let Config = _config.ftp;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.vuex = vuex;
        this.initdata(Config);
        this.page = {
          ftpStatus: false
        }
        this.sdk.get("GetFtpSettings", null, (res) => {
          this.formData = res;
          this.page.ftpStatus = this.formData.FtpStatus == 1 ? true : false;
        });
      },
      update() {
        this.formData.FtpStatus = this.page.ftpStatus == true ? 1 : 0;
        this.sdk.post("SetFtpSettings", this.formData, (res) => {          
          console.log(res)
        })
      }
    }
}
</script>
<style lang="sass" scoped>
</style>
