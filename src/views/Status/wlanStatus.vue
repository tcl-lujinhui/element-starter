<template lang="jade">
  include ../components.jade
  #wlanStatus
    +sideMenuPage('Home')
      +breadcrumb("Wi-Fi")
      +form("formData")
        div.internetInfo
          //-2.4G Mode
          el-row(:gutter="21")
            el-col.textAlignRight(:span="10" v-html="page.wlanAP2GMode")
            el-col(:span="14") {{page.wlanAP2GModeText}}
          el-row(:gutter="21")(v-for="(item,index) in page.wlan2GItem" v-if="page.ApStatus2GMode")
            el-col.textAlignRight(:span="10" v-html="item.name2GVal")
            el-col(:span="14") {{item.wlan2GVal}}
              span.btnMarginLeft(v-if="index == 0")
                +bottonRouterLink('lanStatus','Change')
          div.line
          //-5G Mode
          el-row(:gutter="21")
            el-col.textAlignRight(:span="10" v-html="page.wlanAP5GMode")
            el-col(:span="14") {{page.wlanAP5GModeText}}
          el-row(:gutter="21")(v-for="(item,index) in page.wlan5GItem" v-if="page.ApStatus5GMode")
            el-col.textAlignRight(:span="10" v-html="item.name5GVal")
            el-col(:span="14") {{item.wlan5GVal}}
              span.btnMarginLeft(v-if="index == 0")
                +bottonRouterLink('lanStatus','Change')
      
      //-+formBtn()
</template>

<script>
import {$,_,_config} from '../../common.js'
var Config = _config.homeStatus

export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config);
      this.page={
        displayForm5GData:{},
        displayForm2GData:{},
        ssid2gBroadcastTxt:null,
        ssid5gBroadcastTxt:null,
        wlanAP2GMode:null,
        wlanAP5GMode:null,
        wep2gTypeTxt:null,
        wep5gTypeTxt:null,
        wlan2GItem:null,
        wlan5GItem:null,
        ApStatus2GMode:false,
        ApStatus5GMode:false,
        wlanAP2GModeText:"",
        wlanAP5GModeText:"",
        mode2g:"2G",
        mode5g:"5G",
        numFinish:0,
        countFinish:3
      }
      
      this.sdk.get("GetWlanSettings",null,(res)=>{
        this.formData = res;
        if(++this.page.numFinish == this.page.countFinish){
          this.wlanSupportMode();
        }
      });
      this.sdk.get("GetWanCurrentMacAddr",null,(res)=>{
        _.extend(this.formData,res);
         if(++this.page.numFinish == this.page.countFinish){
          this.wlanSupportMode();
         }
      });
      this.sdk.get("GetLanSettings",null,(res)=>{
        _.extend(this.formData,res);
        if(++this.page.numFinish == this.page.countFinish){
          this.wlanSupportMode();
        }
      });

    },
    wlanSupportMode(){
      if(this.formData.AP2G.ApStatus == 1 && this.formData.AP5G.ApStatus == 1){
        this.page.ApStatus2GMode = true;
        this.page.ApStatus5GMode = true;
        var _self = this;
        $.each([this.page.mode2g,this.page.mode5g],function(i,v){
          _self.formDataWlan(v);
        })
      }else{
       if(this.formData.AP2G.ApStatus == 1){
        this.page.ApStatus2GMode = true;
        this.formDataWlan(this.page.mode2g);
      }else if(this.formData.AP2G.ApStatus == 0){
        this.page.wlanAP2GModeText = "Disabled";
      }
      if(this.formData.AP5G.ApStatus == 1){
        this.page.ApStatus5GMode = true;
        this.formDataWlan(this.page.mode5g);
      }else if(this.formData.AP5G.ApStatus == 0){
        this.page.wlanAP5GModeText = "Disabled";
      }
    }
    },
    formDataWlan(modeVal){
      var wlanInfo2GArr,wlanInfo5GArr;
      if(modeVal==this.page.mode2g){
        this.page.displayForm2GData = this.formData.AP2G;
        this.page.ssid2gBroadcastTxt = Config.ssidBroadcastArr[this.page.displayForm2GData.SsidHidden][Config.ssidBroadcastDisplayNum]
        switch(this.page.displayForm2GData.WepType){
        case 0:
        this.page.wep2gTypeTxt = "Open";
        break;
        case 1:
        this.page.wep2gTypeTxt = "Share"
        break;
        default:
        break;
      }
        wlanInfo2GArr = [
        {
          name2GVal:"SSID:",
          wlan2GVal:this.page.displayForm2GData.Ssid
        },
        {
          name2GVal:"SSID Broadcast:",
          wlan2GVal:this.page.ssid2gBroadcastTxt
        },
        {
          name2GVal:"Security:",
          wlan2GVal:this.page.wep2gTypeTxt
        },
        {
          name2GVal:"Connected Users:",
          wlan2GVal:this.page.displayForm2GData.curr_num
        },
        {
          name2GVal:"Gateway Address:",
          wlan2GVal:this.formData.IPv4IPAddress
        },
        {
          name2GVal:"MAC Address:",
          wlan2GVal:this.formData.MacAddr
        }
      ]
      this.page.wlan2GItem = wlanInfo2GArr;
      }else if(modeVal==this.page.mode5g){
        this.page.displayForm5GData = this.formData.AP5G;
        this.page.ssid5gBroadcastTxt = Config.ssidBroadcastArr[this.page.displayForm5GData.SsidHidden][Config.ssidBroadcastDisplayNum]
        switch(this.page.displayForm5GData.WepType){
        case 0:
        this.page.wep5gTypeTxt = "Open";
        break;
        case 1:
        this.page.wep5gTypeTxt = "Share"
        break;
        default:
        break;
      }
        wlanInfo5GArr = [
        {
          name5GVal:"SSID:",
          wlan5GVal:this.page.displayForm5GData.Ssid
        },
        {
          name5GVal:"SSID Broadcast:",
          wlan5GVal:this.page.ssid5gBroadcastTxt
        },
        {
          name5GVal:"Security:",
          wlan5GVal:this.page.wep5gTypeTxt
        },
        {
          name5GVal:"Connected Users:",
          wlan5GVal:this.page.displayForm5GData.curr_num
        },
        {
          name5GVal:"Gateway Address:",
          wlan5GVal:this.formData.IPv4IPAddress
        },
        {
          name5GVal:"MAC Address:",
          wlan5GVal:this.formData.MacAddr
        }
      ]
      this.page.wlan5GItem = wlanInfo5GArr;
      } 
      
      this.page.wlanAP2GMode = Config.wlanAPModeArr[0][Config.wlanAPModeDisplayNum]
      this.page.wlanAP5GMode = Config.wlanAPModeArr[1][Config.wlanAPModeDisplayNum]

      
    }
  }
}
</script>

<style lang="sass" scoped>
</style>