<template lang="jade">
  include ../components.jade
  #wanConfigure
    +sideMenuPage('Settings')
      +breadcrumb("ids_wan_configureTitle")
      +form("formData")
        +select("ids_netwrok_connectionMode:","ConnectType")
        div(v-if="formData.ConnectType == 2")
          +input("ids_ipAddress:","StaticIpAddress")
          +input("ids_subnetMark:","SubNetMask")
          +input("ids_ethWan_defaultGateway:","Gateway")
          +input("ids_ethWan_Mtu:","Mtu")           
          +subText("","{{vuex.res.ids_ethWan_MtuNote | replace('1492','1500')}}")
          +input("ids_ethWan_primaryDNS:","PrimaryDNS")
          +input("ids_ethWan_secondaryDNS:","SecondaryDNS","ids_ethWan_secDnsOption")
        div(v-if="formData.ConnectType == 0")
          +input("ids_profile_userName:","Account")
          +input("ids_profile_password:","Password")
          +input("ids_ethWan_Mtu:","pppoeMtu")
          +subText("","{{vuex.res.ids_ethWan_MtuNote}}")
          
          
        +formBtn()      

</template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
let Config = _config.wanConfigure;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.vuex = vuex
        this.initdata(Config);
        this.sdk.get("GetWanSettings", null, (res) => {
          this.formData = res;
        })
      },

      update() {
        this.$confirm(vuex.res['ids_lan_restartWarn'], vuex.res['ids_confirm'], {
          confirmButtonText: vuex.res['ids_ok'],
          cancelButtonText: vuex.res['ids_cancel'],
          type: 'warning'
        }).then(() => {
          let params = _.pick(this.formData, function(value, key, object) {
            function isAPIParam(value) {
              return key.substring(0, 2) != "ex" ? true : false;
            }
            return isAPIParam(value);
          });
          this.sdk.post("SetWanSettings", params, {
            callback: this.init
          });
        }).catch(() => {

        });        
      }
    }
}
</script>

<style lang="sass" scoped>
</style>
