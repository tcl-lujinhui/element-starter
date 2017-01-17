<template lang="jade">
  include ../components.jade
  #internetStatus
    +sideMenuPage('Home')
      +breadcrumb("ids_internet")
      +form("formData")
        div.internetInfo
          el-row(:gutter="15")(v-for="(item,index) in page.initernetItem")
            el-col.textAlignRight(:span="9") {{item.nameVal}}
            el-col(:span="13") {{item.internetVal}}
              span.btnMarginLeft(v-if="index == 0 && page.simStatusData.SIMState == 'pinReq'")
                +bottonRouterLink("pinManagement","Enter PIN")
              span.btnMarginLeft(v-if="index == 1")
                el-button(v-html= "page.connectTxt")(type="primary" size="small" @click="update",:disabled="page.disabled")
      
      //-+formBtn()
</template>

<script>
import {$,vuex,_config} from '../../common.js'
var Config = _config.homeStatus

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
        IPv4AdrressTxt:"",
        IPv6AdrressTxt:"",
        profileData:{},
        simStatusData:{},
        connectionStatusData:{},
        initernetItem:null,
        connectTxt:"",
        disabled:false
      }
      this.sdk.get("GetSystemStatus",null,(res)=>{
        this.formData = res;
        this.interfaceData();
      });
      this.sdk.get("GetProfileList",null,(res)=>{
        this.page.profileData = res;
        this.interfaceData();
      });
      this.sdk.get("GetSimStatus",null,(res)=>{
        this.page.simStatusData = res;
      });
      this.sdk.get("GetConnectionState",null,(res)=>{
        this.page.connectionStatusData = res;

        if(this.page.connectionStatusData.IPv4Adrress == ""){
          this.page.IPv4AdrressTxt = "- - - - ";
        }else{
          this.page.IPv4AdrressTxt = this.page.connectionStatusData.IPv4Adrress;
        }
        if(this.page.connectionStatusData.IPv6Adrress == ""){
          this.page.IPv6AdrressTxt = "- - - -";
        }else{
          this.page.IPv6AdrressTxt = this.page.connectionStatusData.IPv6Adrress;
        }
        this.initernetInfoEvent();
      });
      
    },
    interfaceData() {
      this.page.connectedStateTxt = Config.connectionStatusArr[this.formData.ConnectionStatus][Config.connectionDisplayNum];
      this.page.usbStatusTxt = Config.usbStatusArr[this.formData.UsbStatus][Config.usbStatusDisplayNum]

     this.page.networkTypeTxt = Config.networkTypeArr[this.formData.NetworkType][Config.networkTypeDisplayNum];

     var profileName;
      $.each(this.page.profileData.ProfileList,function(v,i){
        if(v.Default == 1){
          profileName = v.ProfileName;
        }
      });
      this.page.profileNameTxt = profileName;
      this.initernetInfoEvent();

      switch(this.formData.ConnectionStatus){
        case 0:
        this.page.connectTxt = this.vuex.res.ids_connect;
        break;
        case 1:
        this.page.connectTxt = this.vuex.res.ids_connecting;
        break;
        case 2:
        this.page.connectTxt = this.vuex.res.ids_disconnect;
        break;
        case 3:
        this.page.connectTxt = this.vuex.res.ids_disconnecting;
        break;
        default:
        break;
      }
    },
    update(){
      if(this.formData.ConnectionStatus == 2){
        this.page.connectTxt = this.vuex.res.ids_connecting;
        this.page.disabled = true;
        this.sdk.post("DisConnect",this.formData,(res) =>{
          if(this.requestJsonRpcIsOk(res)){
            console.log("success");
            //this.page.disabled = false;
          }else{
            console.log("faid");
          }
        })
      }else if(this.formData.ConnectionStatus == 0){
        this.page.connectTxt = this.vuex.res.ids_disconnecting;
        this.page.disabled = true;
        this.sdk.post("Connect",this.formData,(res) =>{
          if(this.requestJsonRpcIsOk(res)){
            console.log("success!");
            //this.page.disabled = false;
          }else{
            console.log("faid!");
          }
        })
      }
    },
    requestJsonRpcIsOk(result) {
        return result.hasOwnProperty("result") && !result.hasOwnProperty("error");
    },
    initernetInfoEvent(){
      var initernetInfo;
      initernetInfo = [
        {
          nameVal:this.vuex.res.ids_sim_simCardStatus+":",
          internetVal:vuex.SimInfo.SIMState//this.page.simStatusData.SIMState 
        },
        {
          nameVal:this.vuex.res.ids_lan_conStatus+":",
          internetVal:this.page.connectedStateTxt
        },
        {
          nameVal:this.vuex.res.ids_netwrok_networkName+":",
          internetVal:this.formData.NetworkName
        },
        {
          nameVal:this.vuex.res.ids_netwrok_networkType+":",
          internetVal:this.page.networkTypeTxt
        },
        {
          nameVal:this.vuex.res.ids_profile_name+":",
          internetVal:this.page.profileNameTxt
        },
        {
          nameVal:this.vuex.res.ids_netwrok_ipv4Address+":",
          internetVal:this.page.IPv4AdrressTxt
        },
        {
          nameVal:this.vuex.res.ids_netwrok_ipv6Address+":",
          internetVal:this.page.IPv6AdrressTxt
        },
        {
          nameVal:this.vuex.res.ids_usbStatus+":",
          internetVal:this.page.usbStatusTxt
        }
      ]
      this.page.initernetItem = initernetInfo;
    }
  }
}
</script>

<style lang="sass" scoped>
.el-form{
  width:620px;
}
</style>