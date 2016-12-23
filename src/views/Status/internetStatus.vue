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
              span.btnMarginLeft(v-if="index == 0 && page.simStatusData.SIMState == 2")
                +bottonRouterLink("pinManagement","Enter PIN")
                //-span(v-if="page.simStatusData.SIMState == 2")
                  +bottonRouterLink("pinManagement","Enter PIN")
      
      //-+formBtn()
</template>

<script>
import $ from 'jquery'
import Config from '../../config.js'
var _config = Config.homeStatus

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
      this.initdata(_config);

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
        initernetItem:null
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
      this.page.connectedStateTxt = _config.connectionStatusArr[this.formData.ConnectionStatus][_config.connectionDisplayNum];
      this.page.usbStatusTxt = _config.usbStatusArr[this.formData.UsbStatus][_config.usbStatusDisplayNum]

     this.page.networkTypeTxt = _config.networkTypeArr[this.formData.NetworkType][_config.networkTypeDisplayNum];
     
     var profileName;
      this.page.profileData.ProfileList.forEach(function(v){
        if(v.Default == 1){
          profileName = v.ProfileName;
        }
      });
      this.page.profileNameTxt = profileName;
      this.initernetInfoEvent();
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