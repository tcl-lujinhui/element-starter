<template lang="jade">
  include ../components.jade
  #wlanStatus
    +sideMenuPage('Home')
      +breadcrumb("WLAN Status")
      +form("formData")
        div.internetInfo
          el-row(:gutter="21")(v-for="(item,index) in page.wlanItem")
            el-col.textAlignRight(:span="10") {{item.nameVal}}
            el-col(:span="14") {{item.wlanVal}}
              span.btnMarginLeft(v-if="index == 1")
                +bottonRouterLink('lanStatus','Change')
      
      //-+formBtn()
</template>

<script>
import $ from 'jquery'
import Config from '../../config.js'
var _config = Config.homeStatus

export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.initdata(_config);
      this.page={
        displayFormData:{},
        ssidBroadcastTxt:null,
        wlanAPModeText:null,
        wepTypeTxt:null,
        wlanItem:null,
        currentMacAddr:{},
        LanSettings:{}
      }
      
      this.sdk.get("GetWlanSettings",null,(res)=>{
        this.formData = res;
      });
      this.sdk.get("GetWanCurrentMacAddr",null,(res)=>{
        this.page.currentMacAddr = res;
        $.extend(this.formData,this.page.currentMacAddr);
      });
      this.sdk.get("GetLanSettings",null,(res)=>{
        this.page.LanSettings = res;
        $.extend(this.formData,this.page.LanSettings);
        this.formDataWlan();
      })
      

    },
    formDataWlan(){
      var APListArr = this.formData.APList;
      var newFormData;
      var WlanAPModeTxt = this.formData.WlanAPMode;
      var wlanInfoArr;
      
      APListArr.forEach(function(v){
        if(v.WlanAPID == WlanAPModeTxt){
          newFormData = v;
        }
      });
      this.page.displayFormData = newFormData;
      switch(this.page.displayFormData.WepType){
        case 0:
        this.page.wepTypeTxt = "Open";
        break;
        case 1:
        this.page.wepTypeTxt = "Share"
        break;
        default:
        break;
      }
      this.page.ssidBroadcastTxt = _config.ssidBroadcastArr[this.page.displayFormData.SsidHidden][_config.ssidBroadcastDisplayNum]
      this.page.wlanAPModeText = _config.wlanAPModeArr[WlanAPModeTxt][_config.wlanAPModeDisplayNum]

      wlanInfoArr = [
        {
          nameVal:"WLAN Frequency:",
          wlanVal:this.page.wlanAPModeText
        },
        {
          nameVal:"SSID:",
          wlanVal:this.page.displayFormData.Ssid
        },
        {
          nameVal:"SSID Broadcast:",
          wlanVal:this.page.ssidBroadcastTxt
        },
        {
          nameVal:"Security:",
          wlanVal:this.page.wepTypeTxt
        },
        {
          nameVal:"Connected Users:",
          wlanVal:this.page.displayFormData.curr_num
        },
        {
          nameVal:"Gateway Address:",
          wlanVal:this.formData.IPv4IPAddress
        },
        {
          nameVal:"MAC Address:",
          wlanVal:this.formData.MacAddr
        }
      ]
      this.page.wlanItem = wlanInfoArr;
    }
  }
}
</script>

<style lang="sass" scoped>
</style>