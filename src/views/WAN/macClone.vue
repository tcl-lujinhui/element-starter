<template lang="jade">
  include ../components.jade
  #macClone
    +sideMenuPage('Settings')
      +breadcrumb("ids_ethWan_menuMacClone")
      +form("formData")
        +input("ids_ethWan_currentMACAddress:","MacAddr")(disabled=true)
        el-form-item
          +button("ids_reset")(@click="changeMACAddress('restore')")
        +input("ids_ethWan_hostMACAddress:","HostMacAddr")        
        el-form-item
          +button("ids_ethWan_clone")(@click="changeMACAddress('clone')")
</template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
let Config = _config.macClone;
export default {
  created() {
      this.init();
      this.initdata(Config);
    },
    methods: {
      init() {
        this.sdk.get("GetWanCurrentMacAddr", null, (res) => {
          this.formData = res;
        })
      },

      changeMACAddress(type) {
        this.$confirm(vuex.res['ids_lan_restartWarn'], vuex.res['ids_confirm'], {
          confirmButtonText: vuex.res['OK'],
          cancelButtonText: vuex.res['ids_cancel'],
          type: 'warning'
        }).then(() => {
          let params = {
            "Type": 0,
            "MacAddr": ""
          }
          if (type == "clone") {
            params.Type = G.WAN_MAC_ADDRESS_CLONE;
            params.MacAddr = this.formData.HostMacAddr;
          }
          if (type == "restore") {
            params.Type = G.WAN_MAC_ADDRESS_RESTORE;
          }
          this.sdk.post("SetWanCurrentMacAddr", params, (res) => {
            this.init();
          });
        }).catch(() => {

        });
      }
    }
}
</script>


<style lang="sass" scoped>
</style>