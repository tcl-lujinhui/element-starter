<template lang="jade">
  include ../components.jade
  #lanStatus
    +sideMenuPage('Home')
      +breadcrumb("ids_lan_Lan")
      +form("formData")
        div.internetInfo
          el-row(:gutter="15")(v-for="item in page.lanItem")
            el-col.textAlignRight(:span="8")(v-html="item.nameVal") 
            el-col(:span="8") {{item.lanOneVal}}
            el-col(:span="8") {{item.lanTwoVal}}
      
      //-+formBtn()
</template>

<script>
import {_config,vuex} from '../../common.js'
var Config = _config.homeStatus

export default {
  created () {
    this.init();
    this.initdata(Config);
  },
  methods: {
    init (){
      this.vuex = vuex
      this.page = {
        lanOneconnectedStateTxt:"",
        lanTwoconnectedStateTxt:"",
        ipAddressTxt:"",
        macAddressTxt:"",
        dhcpServerTxt:"",
        LanFlagTxt:"",
        LanFlagTwoTxt:"",
        ipAddressTwoTxt:"",
        macAddressTwoTxt:"",
        dhcpServerTwoTxt:"",
        lanItem:null
      }
      this.sdk.get("GetLanPortInfo",null,(res)=>{
        this.formData = res;
        this.interfaceLanInfoData();
      })
    },
    interfaceLanInfoData(){
      var formDataList = this.formData.List;
      var lanInfoArr;
      if(formDataList.length == 1){
        this.lanOneInfo(formDataList);
      }else{
       this.lanOneInfo(formDataList);
       this.lanTwoInfo(formDataList);
      }
     
    this.page.lanOneconnectedStateTxt = Config.lanConnectedStatusArr[formDataList[0].ConnectionStatus][Config.lanConnectedDisplayNum];
    this.page.lanTwoconnectedStateTxt = Config.lanConnectedStatusArr[formDataList[1].ConnectionStatus][Config.lanConnectedDisplayNum];

    lanInfoArr = [
          {
            nameVal:"&nbsp;",
            lanOneVal:this.page.LanFlagTxt,
            lanTwoVal:this.page.LanFlagTwoTxt
          },
          {
            nameVal:this.vuex.res.ids_lan_conStatus+":",
            lanOneVal:this.page.lanOneconnectedStateTxt,
            lanTwoVal:this.page.lanTwoconnectedStateTxt
          },
          {
            nameVal:this.vuex.res.ids_ipAddress+":",
            lanOneVal:this.page.ipAddressTxt,
            lanTwoVal:this.page.ipAddressTwoTxt
          },
          {
            nameVal:this.vuex.res.ids_lan_macAdress+":",
            lanOneVal:this.page.macAddressTxt,
            lanTwoVal:this.page.macAddressTwoTxt
          },
          {
            nameVal:this.vuex.res.ids_lan_dhcpServer+":",
            lanOneVal:this.page.dhcpServerTxt,
            lanTwoVal:this.page.dhcpServerTwoTxt
          }
        ]
        this.page.lanItem = lanInfoArr;

    },
     lanOneInfo(formDataList){
        if(formDataList[0].ConnectionStatus == 1){
          this.page.LanFlagTxt = formDataList[0].LanFlag;
          this.page.ipAddressTxt = formDataList[0].IPAddress;
          this.page.macAddressTxt = formDataList[0].MACAddress;
          this.page.dhcpServerTxt = formDataList[0].DHCPServer;

        }else{
          this.page.LanFlagTxt = formDataList[0].LanFlag;
          this.page.ipAddressTxt = "- - - -";
          this.page.macAddressTxt = "- - - -";
          this.page.dhcpServerTxt = "- - - -";
        }
      },
      lanTwoInfo(formDataList){
         if(formDataList[1].ConnectionStatus == 1){
          this.page.LanFlagTwoTxt = formDataList[1].LanFlag;
          this.page.ipAddressTwoTxt = formDataList[1].IPAddress;
          this.page.macAddressTwoTxt = formDataList[1].MACAddress;
          this.page.dhcpServerTwoTxt = formDataList[1].DHCPServer;

        }else{
          this.page.LanFlagTwoTxt = formDataList[1].LanFlag;
          this.page.ipAddressTwoTxt = "- - - -";
          this.page.macAddressTwoTxt = "- - - -";
          this.page.dhcpServerTwoTxt = "- - - -";
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