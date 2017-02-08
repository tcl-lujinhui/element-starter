<template lang="jade">
  include ../components.jade
  #internetStatus
    +sideMenuPage('Home')
      +breadcrumb("ids_internet")
      +form("formData")
        div.internetInfo
          +text("ids_sim_simCardStatus:","{{vuex.SimInfo.SIMStateStr|res}}")
            span(v-show="vuex.SimInfo.SIMState=='pinReq'")
              +bottonRouterLink("pinManagement","{{vuex.res.ids_status_enterPin}}")
            span(v-show="vuex.SimInfo.SIMState=='pukReq'")
              +bottonRouterLink("pinManagement","{{vuex.res.ids_sim_pukRequired}}")
            span(v-show="vuex.SimInfo.SIMState=='simLock'")
              +bottonRouterLink("pinManagement","{{vuex.res.ids_sim_locked}}")
          +text("ids_lan_conStatus:","{{vuex.SystemStatus.ConnectionStatus|netConnState}}","")
            span(v-if="vuex.SimInfo.SIMState=='ready'&&(vuex.SystemStatus.ConnectionStatus==0||vuex.SystemStatus.ConnectionStatus==2)")
              +button("{{vuex.res[vuex.SystemStatus.ConnectionStatus==0?'ids_connect':'ids_disconnect']}}")(type="primary" size="small" @click="connectOrDisconnectNet")
          +text("ids_netwrok_networkName:","{{vuex.SystemStatus.NetworkName}}")
          +text("ids_netwrok_networkType:","{{vuex.SystemStatus.NetworkType|networkType}}","")
          +text("ids_profile_name:","{{page.currentProfile}}","")
          +text("ids_netwrok_ipv4Address:","{{page.ConnectionState.IPv4Adrress}}","")
          +text("ids_netwrok_ipv6Address:","{{page.ConnectionState.IPv6Adrress}}","")
          +text("ids_usbStatus:","{{this.vuex.SystemStatus.UsbStatus|usbStateText}}","")      
      //-+formBtn()
</template>

<script>
import {$,G,vuex,_,_config} from '../../common.js'
var Config = _config.homeInternetStatus//_config.homeStatus//

export default {
  created () {
    this.init();
  },
  methods: {
    init (){
      this.vuex = vuex;
      this.vuex.initSimInfo();
      this.page={
        currentProfile:"----",
        ConnectionState:{}
      }
      this.sdk.get("GetConnectionState",null,(res)=>{
        this.page.ConnectionState = res;
      });
      this.sdk.get("getCurrentProfile",null,(res)=>{
        if(res){
          this.page.currentProfile = res.ProfileName||"----";
        }
      });
    },
    connectOrDisconnectNet (){
      let vm = this;
      let result={
        callback(){
          vm.vuex.refreshSystemStatus();
        }
      }
      if(this.vuex.SystemStatus.ConnectionStatus == G.WAN_STATE_CONNECTED){
        this.sdk.post("DisConnect",{},result);
      }else if(this.vuex.SystemStatus.ConnectionStatus == G.WAN_STATE_DISCONNECTED){
        this.sdk.post("Connect",{},result);
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.el-form{
  width:620px;
}
</style>