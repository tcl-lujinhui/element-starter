<template lang="jade">
  include ../components.jade
  #lanSettings
    +sideMenuPage('Settings')
      +breadcrumb("Lan Settings")
      +form("formData")
        +input("IPv4 IP address:","IPv4IPAddress")
        +input("SubnetMask","SubnetMask")
        +formItem("DHCP Server:")
          el-checkbox(v-model="formData.DHCPServerStatus",:true-label.number="1",:false-label.number="0")
        div(v-if="formData.DHCPServerStatus==1")
          +input("Start IP Address:","StartIPAddress")
          +input("End IP Address:","EndIPAddress")
          +select("DHCP Lease Time:","DHCPLeaseTime") Hours        
        +formBtn()
</template>

<script>
import _config from '../../config.js'
let Config = _config.lanSettings;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config, this);
        this.sdk.get("GetLanSettings", null, (res) => {
          this.formData = res;
        })
      },
      update() {
        this.$confirm('This action requires the services to be restarted. Are you sure to continue?', 'Confirm', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.sdk.post("SetLanSettings", this.formData, (res) => {
            console.log(res)
          });
        }).catch(() => {

        });
      }
    }
}
</script>



<style lang="sass">
</style>