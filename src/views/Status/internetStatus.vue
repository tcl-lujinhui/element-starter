<template lang="jade">
  include ../components.jade
  #internetStatus
    +sideMenuPage('Home')
      +breadcrumb("Internet Status")
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
import {$,_config} from '../../common.js'
var Config = _config.homeStatus

export default {
  created () {
    this.init();
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
      this.initdata(Config);

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
      this.page.profileData.ProfileList.forEach(function(v){
        if(v.Default == 1){
          profileName = v.ProfileName;
        }
      });
      this.page.profileNameTxt = profileName;
      this.initernetInfoEvent();

      switch(this.formData.ConnectionStatus){
        case 0:
        this.page.connectTxt = "Connect";
        break;
        case 1:
        this.page.connectTxt = "Connecting......";
        break;
        case 2:
        this.page.connectTxt = "Disconnect";
        break;
        case 3:
        this.page.connectTxt = "Disconnecting......";
        break;
        default:
        break;
      }
    },
    update(){
      if(this.formData.ConnectionStatus == 2){
        this.page.connectTxt = "Connecting......";
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
        this.page.connectTxt = "Disconnecting......";
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
          nameVal:"SIM Card Status:",
          internetVal:this.page.simStatusData.SIMState 
        },
        {
          nameVal:"Connection Status:",
          internetVal:this.page.connectedStateTxt
        },
        {
          nameVal:"Network Name:",
          internetVal:this.formData.NetworkName
        },
        {
          nameVal:"Network Type:",
          internetVal:this.page.networkTypeTxt
        },
        {
          nameVal:"Profile Name:",
          internetVal:this.page.profileNameTxt
        },
        {
          nameVal:"IPv4 Address:",
          internetVal:this.page.IPv4AdrressTxt
        },
        {
          nameVal:"IPv6 Address:",
          internetVal:this.page.IPv6AdrressTxt
        },
        {
          nameVal:"USB Status:",
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