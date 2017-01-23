<template lang="jade">
  include ../components.jade
  #internetStatus
    +sideMenuPage('Home')
      +breadcrumb("ids_internet")
      +form("formData")
        div.internetInfo
          +text("ids_sim_simCardStatus:","{{page.SIMStateTxt}}")
            span(v-show="page.isBtnStatusEnter")
              +bottonRouterLink("pinManagement","{{page.idsStatusEnter}}")
          +text("ids_lan_conStatus:","{{page.connectedStateTxt}}","")
            +button("{{page.connectTxt}}")(type="primary" size="small" @click="update",:disabled="page.isDisabled")
          +text("ids_netwrok_networkName:","{{formData.NetworkName}}","")
          +text("ids_netwrok_networkType:","{{page.networkTypeTxt}}","")
          +text("ids_profile_name:","{{page.profileNameTxt}}","")
          +text("ids_netwrok_ipv4Address:","{{formData.IPv4Adrress}}","")
          +text("ids_netwrok_ipv6Address:","{{formData.IPv6Adrress}}","")
          +text("ids_usbStatus:","{{page.usbStatusTxt}}","")      
      //-+formBtn()
</template>

<script>
import {$,G,vuex,_,_config} from '../../common.js'
var Config = _config.homeInternetStatus//_config.homeStatus//

export default {
  created () {
    this.init();
    this.initdata(Config);
    this.Inter=setInterval(() => {
        //this.init();
      }, 3000);
  },
  destroyed (){
    clearInterval(this.Inter)
    this.Inter = null
  },
  methods: {
    init (){
      this.vuex = vuex
      vuex.initSimInfo()
      this.page = {
        usbStatusTxt:"",
        connectedStateTxt:"",
        networkTypeTxt:"",
        profileNameTxt:"",
        connectTxt:"",
        SIMStateTxt:"",
        idsStatusEnter:"",
        isDisabled:false,
        isBtnStatusEnter:false,
        numFinish:0,
        countFinish:4
      }
      this.sdk.get("GetSystemStatus",null,(res)=>{
        _.extend(this.formData,res)
        if(++this.page.numFinish == this.page.countFinish){
          this.allFormDataEvent();
        }
      });
      this.sdk.get("GetProfileList",null,(res)=>{
       _.extend(this.formData,res)
        if(++this.page.numFinish == this.page.countFinish){
          this.allFormDataEvent();
        }
      });
      this.sdk.get("GetSimStatus",null,(res)=>{
       _.extend(this.formData,res)
        if(++this.page.numFinish == this.page.countFinish){
          this.allFormDataEvent();
        }
      });
      this.sdk.get("GetConnectionState",null,(res)=>{
        _.extend(this.formData,res)
        if(++this.page.numFinish == this.page.countFinish){
          this.allFormDataEvent();
        }
      });
    },
    allFormDataEvent(){
        this.page.usbStatusTxt = this.vuex.res[Config.usbStatusArr[this.formData.UsbStatus][Config.usbStatusDisplayNum]];
        this.page.connectedStateTxt = this.vuex.res[Config.connectionStatusArr[this.formData.ConnectionStatus][Config.connectionDisplayNum]];
        this.page.networkTypeTxt = Config.networkTypeArr[this.formData.NetworkType][Config.networkTypeDisplayNum];

        let _self = this;
      _.each(this.formData.ProfileList,function(v,i){
        if(v.Default == 1){
          _self.page.profileNameTxt  = v.ProfileName;
        }
      });
    this.page.SIMStateTxt = this.vuex.res[vuex.SimInfo.SIMStateStr];
    switch(vuex.SimInfo.SIMState){
        case "pinReq":
        this.page.idsStatusEnter = this.vuex.res.ids_status_enterPin;
        this.page.isBtnStatusEnter =true;
        this.page.isDisabled = true;
        break;
        case "pukReq":
        this.page.idsStatusEnter = this.vuex.res.ids_sim_pukRequired;
        this.page.isBtnStatusEnter =true;
        this.page.isDisabled = true;
        break;
        case "simLock":
        this.page.idsStatusEnter = this.vuex.res.ids_sim_locked;
        this.page.isBtnStatusEnter =true;
        this.page.isDisabled = true;
        break;
        case "ready":
        this.page.isDisabled = false;
        this.page.isBtnStatusEnter =false;
        break;
        default:
        this.page.isBtnStatusEnter =false;
        this.page.isDisabled = true;
        break;
    }

      switch(this.formData.ConnectionStatus){
        case G.WAN_STATE_DISCONNECTED:
        this.page.connectTxt = this.vuex.res.ids_connect;
        break;
        case G.WAN_STATE_CONNECTING:
        this.page.connectTxt = this.vuex.res.ids_connecting;
        break;
        case G.WAN_STATE_CONNECTED:
        this.page.connectTxt = this.vuex.res.ids_disconnect;
        break;
        case G.WAN_STATE_DISCONNECTING:
        this.page.connectTxt = this.vuex.res.ids_disconnecting;
        break;
        default:
        break;
      }

    },
    update(){
      if(this.formData.ConnectionStatus == G.WAN_STATE_CONNECTED){
        this.page.connectTxt = this.vuex.res.ids_connecting;
        this.page.isDisabled = true;
        let setDisConned = {
            success:vuex.res["ids_success"],
            fail:vuex.res["ids_fail"]
        }
        this.sdk.post("DisConnect",{},setDisConned);
      }else if(this.formData.ConnectionStatus == G.WAN_STATE_DISCONNECTED){
        this.page.connectTxt = this.vuex.res.ids_disconnecting;
        this.page.isDisabled = true;
        let setConnect = {
            success:vuex.res["ids_success"],
            fail:vuex.res["ids_fail"]
        }
        this.sdk.post("Connect",{},setConnect);
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