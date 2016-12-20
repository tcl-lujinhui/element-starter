<template lang="jade">
  include ../components.jade
  #wanConfigure
    +sideMenuPage('Settings')
      +breadcrumb("WAN Configure")
      +form("formData")
        +select("Wan Connection Type:","ConnectType")
        div(v-if="formData.ConnectType == 2")
          +input("IP Address:","StaticIpAddress")
          +input("Subnet Mask:","SubNetMask")
          +input("Default Gateway:","Gateway")
          +input("MTU size(in bytes):","Mtu") (The default is 1500,do not change unless necessary.)
          +input("Primary DNS:","PrimaryDNS")
          +input("Secondary DNS:","SecondaryDNS") (Optional.)
        div(v-if="formData.ConnectType == 0")
          +input("Account:","Account")
          +input("Password:","Password")
          +input("MTU size(in bytes):","pppoeMtu")
        +formBtn()      

</template>

<script>
import _ from 'underscore';
import $ from 'jquery';
import _Config from '../../config.js'
let Config = _Config.wanConfigure;
export default {
  created() {
      this.init()
    },
    methods: {
      init() {
        this.initdata(Config);
        this.sdk.get("GetWanSettings", null, (res) => {
          this.formData = res;
        })
      },

      update() {
        this.$confirm('This action requires the services to be restarted. Are you sure to continue?', 'Confirm', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          let params = _.pick(this.formData, function(value, key, object) {
            function isAPIParam(value) {
              return key.substring(0, 2) != "ex" ? true : false;
            }
            return isAPIParam(value);
          });
          this.sdk.post("SetWanSettings", params, (res) => {
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
