<template lang="jade">
  include ../components.jade
  #dlna
    +sideMenuPage('Services')
      +breadcrumb("ids_samba_menuDlna")
      +form("formData")
        +formItem("ids_samba_menuDlna:")
          el-switch(v-model="page.dlnaStatus" @change="update()" on-text="" off-text="")
</template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
let Config = _config.dlna;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.vuex = vuex;
        this.initdata(Config);
        this.page = {
          dlnaStatus: false
        }
        this.sdk.get("GetDLNASettings", null, (res) => {
          this.formData = res;
          this.page.dlnaStatus = this.formData.DlnaStatus == 1 ? true : false;
        })
      },
      update() {
        this.formData.DlnaStatus = this.page.dlnaStatus == true ? 1 : 0;
        this.sdk.post("SetDLNASettings", this.formData, (res) => {          
          console.log(res)
        })
      }
    }
}
</script>
<style lang="sass" scoped>
</style>
