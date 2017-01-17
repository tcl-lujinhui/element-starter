<template lang="jade">
  include ../components.jade
  #lanSettings
    +sideMenuPage('Settings')
      +breadcrumb("ids_lan_lanSettings")
      +form("formData")
        +input("ids_lan_ipv4IpAddress:","IPv4IPAddress")
        +input("ids_subnetMark","SubnetMask")
        +radio("ids_lan_dhcpServer:","DHCPServerStatus")
        div(v-if="formData.DHCPServerStatus==1")
          +input("ids_lan_startIpAddress:","StartIPAddress")
          +input("ids_lan_endIpAddress:","EndIPAddress")
          +select("ids_lan_dhcpLeaseTime:","DHCPLeaseTime","{{vuex.res.ids_hours}}")         
        +formBtn()
</template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
let Config = _config.lanSettings;
export default {
  created() {
      this.init();
      this.initdata(Config, this);
    },
    methods: {
      init() {            
        this.vuex = vuex;
        this.sdk.get("GetLanSettings", null, (res) => {
          this.formData = res;
        })
      },
      update (){
        let setForm = () => {
          this.$confirm(vuex.res['ids_lan_restartWarn'], vuex.res['ids_confirm'], {
            confirmButtonText: vuex.res['ids_ok'],
            cancelButtonText: vuex.res['ids_cancel'],
            type: 'warning'
          }).then(() => {
            this.sdk.post("SetLanSettings", this.formData, (res) => {
              console.log(res)
            });
          }).catch(() => {

          }); 
        }
        this.submit("formData", setForm)    
      }
    }
}
</script>



<style lang="sass">
</style>