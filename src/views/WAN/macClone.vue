<template lang="jade">
  include ../components.jade
  #macClone
    +sideMenuPage('Settings')
      +breadcrumb("MAC Clone")
      +form("formData")
        +input("Restore Factory MAC:","exCurrMacAddr")(disabled=true)
        el-form-item
          +button("Restore Factory MAC")(@click="changeMACAddress('restore')")
        +input("Clone MAC Address:","MacAddr")        
        el-form-item
          +button("Clone MAC Address")(@click="changeMACAddress('clone')")
</template>

<script>
import _Config from '../../config.js'
import G from "../../config/G.js";
let Config = _Config.macClone;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.sdk.get("GetWanCurrentMacAddr", null, (res) => {
          this.formData = res;
          this.formData.MacAddr = "";
        })
      },

      changeMACAddress(type) {
        this.$confirm('This action requires the services to be restarted. Are you sure to continue?', 'Confirm', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          let params = {
            "Type": 0,
            "MacAddr": ""
          }
          if (type == "clone") {
            params.Type = G.WAN_MAC_ADDRESS_CLONE;
            params.MacAddr = this.formData.MacAddr;
          }
          if (type == "restore") {
            params.Type = G.WAN_MAC_ADDRESS_RESTORE;
          }
          this.sdk.post("SetWanCurrentMacAddr ", params, (res) => {
            console.log(res)
          });
        }).catch(() => {

        });
      }
    }
}
</script>


<style lang="sass" scoped>
</style>