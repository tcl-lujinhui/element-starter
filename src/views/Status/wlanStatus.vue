<template lang="jade">
  include ../components.jade
  #wlanStatus
    +sideMenuPage('Home')
      +breadcrumb("ids_wifi_WiFiTitle")
      +form("formData")
        div.internetInfo
          +text("ids_wlan_2ghz:","{{page.wlanAP2GModeText}}","")
          div.AP2GMode(v-show="page.ApStatus2GMode")
            +text("ids_wifi_ssid:","{{page.AP2GSsid}}","")
              +bottonRouterLink('basic','ids_wlan_change')
            +text("ids_wlan_ssidBroadcast:","{{page.ssid2gBroadcastTxt}}","")
            +text("ids_wlan_security:","{{page.wep2gTypeTxt}}","")
            +text("ids_wlan_connectedUsers:","{{page.AP2GCurrNum}}","")
            +text("ids_wlan_gatewayAddress:","{{formData.IPv4IPAddress}}","")
            +text("ids_lan_macAdress:","{{formData.MacAddr}}","")
          div.line
          +text("ids_wlan_5ghz:","{{page.wlanAP5GModeText}}","")
          div.AP5GMode(v-show="page.ApStatus5GMode")
            +text("ids_wifi_ssid:","{{page.AP5GSsid}}","")
              +bottonRouterLink('basic','ids_wlan_change')
            +text("ids_wlan_ssidBroadcast:","{{page.ssid5gBroadcastTxt}}","")
            +text("ids_wlan_security:","{{page.wep5gTypeTxt}}","")
            +text("ids_wlan_connectedUsers:","{{page.AP5GCurrNum}}","")
            +text("ids_wlan_gatewayAddress:","{{formData.IPv4IPAddress}}","")
            +text("ids_lan_macAdress:","{{formData.MacAddr}}","")      
      //-+formBtn()
</template>

<script>
import {$,_,G,_config,vuex} from '../../common.js'
var Config = _config.homeWlanStatus

export default {
  created () {
    this.init();
    this.initdata(Config);
  },
  methods: {
    init (){
      this.vuex = vuex
      this.page={
        ssid2gBroadcastTxt:"",
        ssid5gBroadcastTxt:"",
        wep2gTypeTxt:"",
        wep5gTypeTxt:"",
        AP2GSsid:"",
        AP5GSsid:"",
        AP5GCurrNum:null,
        AP2GCurrNum:null,
        ApStatus2GMode:false,
        ApStatus5GMode:false,
        wlanAP2GModeText:"",
        wlanAP5GModeText:"",
        numFinish:0,
        countFinish:3
      }
      
      this.sdk.get("GetWlanSettings",null,(res)=>{
        _.extend(this.formData,res);
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
      if(this.formData.AP2G.ApStatus == G.WLAN_MODEL_ApStatus_ENABLE && this.formData.AP5G.ApStatus == G.WLAN_MODEL_ApStatus_ENABLE){
        this.page.ApStatus2GMode = true;
        this.page.ApStatus5GMode = true;
      }else{
       if(this.formData.AP2G.ApStatus == G.WLAN_MODEL_ApStatus_ENABLE){
        this.page.ApStatus2GMode = true;
      }else if(this.formData.AP2G.ApStatus == G.WLAN_MODEL_ApStatus_DISABLE){
        this.page.ApStatus2GMode = false;
        this.page.wlanAP2GModeText = this.vuex.res.ids_disabled;
      }
      if(this.formData.AP5G.ApStatus == G.WLAN_MODEL_ApStatus_ENABLE){
        this.page.ApStatus5GMode = true;
      }else if(this.formData.AP5G.ApStatus == G.WLAN_MODEL_ApStatus_DISABLE){
        this.page.ApStatus5GMode = false;
        this.page.wlanAP5GModeText = this.vuex.res.ids_disabled;
      }
    }
    this.page.AP2GSsid = this.formData.AP2G.Ssid;
    this.page.AP5GSsid = this.formData.AP5G.Ssid;
    this.page.AP5GCurrNum = this.formData.AP5G.curr_num;
    this.page.AP2GCurrNum = this.formData.AP2G.curr_num;
    switch(this.formData.AP2G.WepType){
        case G.WLAN_MODEL_WepType_DISABLE:
        this.page.wep2gTypeTxt = this.vuex.res.ids_wifi_wepOpen;
        break;
        case G.WLAN_MODEL_WepType_ENABLE:
        this.page.wep2gTypeTxt = this.vuex.res.ids_wifi_wepShare
        break;
        default:
        break;
      }
      switch(this.formData.AP5G.WepType){
        case G.WLAN_MODEL_WepType_DISABLE:
        this.page.wep5gTypeTxt = this.vuex.res.ids_wifi_wepOpen;
        break;
        case G.WLAN_MODEL_WepType_ENABLE:
        this.page.wep5gTypeTxt = this.vuex.res.ids_wifi_wepShare
        break;
        default:
        break;
      }
      this.page.ssid2gBroadcastTxt = this.vuex.res[Config.ssidBroadcastArr[this.formData.AP2G.SsidHidden][Config.ssidBroadcastDisplayNum]];
      this.page.ssid5gBroadcastTxt = this.vuex.res[Config.ssidBroadcastArr[this.formData.AP5G.SsidHidden][Config.ssidBroadcastDisplayNum]];
    }
  }
}
</script>

<style lang="sass" scoped>
</style>