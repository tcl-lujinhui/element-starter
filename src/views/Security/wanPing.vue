<template lang="jade">
  include ../components.jade
  #wanPing
    +sideMenuPage('Settings')
      +breadcrumb("ids_security_wanPing")
      +form("formData")
        +formItem("ids_filter_wanPortPing:")
          el-switch(v-model="page.DisableWanAcess" @change="update()" on-text="" off-text="")
        p.tips {{vuex.res.ids_security_wanPingNote}}
</template>

<script>
import {$,vuex,_,_config} from '../../common.js';
var Config = _config.wanPing;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.page={
          DisableWanAcess:false
        }
        this.sdk.get("GetWanAccess", null, (res) => {
          this.formData = res;
          this.page.DisableWanAcess = this.formData.disableWanAcess == 0 ? true : false;
        })
      },
      update() {
        this.formData.disableWanAcess = this.page.DisableWanAcess == true ? 0 : 1;
        this.sdk.post("SetWanAccess", this.formData, (res) => {
        })
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