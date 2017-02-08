<template lang="jade">
  include ../components.jade
  #advance
    +sideMenuPage('Settings')
      +breadcrumb("ids_wlan_advanced")
      +form("formData")(style="width: 100%" v-loading.body="page.loading")
        div {{vuex.res.ids_wlan_2ghz}}
        div(v-if="formData.AP2G.ApStatus!=0")
          +formItem("ids_wlan_countryRegion:")
            el-select(v-model="formData.AP2G.CountryCode" @change="change2gChannelArray()")
              el-option(v-for="(k,v) in countryCode.countryCode",:label="k[1]",:value="v")
          +formItem("ids_wlan_channel:")
            el-select(v-model="formData.AP2G.Channel")
              el-option(:label="vuex.res.ids_auto",:value.number="0")
              el-option(v-for="i in page.channelArray['2G']",:label="i",:value.number="i")
          //-+select("ids_wlan_countryRegion:","AP2G.CountryCode")
          +select("ids_wlan_802Mode:","AP2G.WMode")
          +select("ids_wlan_apIsolation:","AP2G.ApIsolation")
          +select("ids_wlan_bandwidth:","AP2G.Bandwidth")
          
        div {{vuex.res.ids_wlan_5ghz}}
        div(v-if="formData.AP5G.ApStatus!=0")
          +formItem("ids_wlan_countryRegion:")
            el-select(v-model="formData.AP5G.CountryCode" @change="change5gChannelArray")
              el-option(v-for="(k,v) in countryCode.countryCode",:label="k[1]",:value="v")
          +formItem("ids_wlan_channel:")
            el-select(v-model="formData.AP5G.Channel")
              el-option(:label="vuex.res.ids_auto",:value.number="0")
              el-option(v-for="v in page.channelArray['5G']",:label="v",:value.number="v")
          +select("ids_wlan_802Mode:","AP5G.WMode")
          +select("ids_wlan_apIsolation:","AP5G.ApIsolation")
          +select("ids_wlan_bandwidth:","AP5G.Bandwidth")
        +formBtn()
</template>

<script>
import {$,_config,vuex,countryCode} from '../../common.js';
let Config = _config.Wlan;
export default {
  created () {
    this.initdata(Config);
    this.init()
  },
  methods: {
    init (){
      this.vuex=vuex;
      this.countryCode=countryCode;
      this.page={
        loading:false,
        channelArray:{
          "2G":this.countryCode.countryCode[this.formData.AP2G.CountryCode][0]||13,
          "5G":this.countryCode.country5gChannel[this.formData.AP5G.CountryCode]||[]
        }
      }
      this.sdk.get("GetWlanSettings",null,(res)=>{
        $.extend(this.formData,res)
      })
    },
    change2gChannelArray (){
      this.page.channelArray['2G']=this.countryCode.countryCode[this.formData.AP2G.CountryCode][0]||13;
      this.formData.AP2G.Channel = 0
    },
    change5gChannelArray (){
      let country5gChannelList = this.countryCode.country5gChannel;
      let CountryCode5G = this.formData.AP5G.CountryCode
      if(country5gChannelList.hasOwnProperty(CountryCode5G)){
        this.page.channelArray['5G']=country5gChannelList[CountryCode5G]
      }else{
        this.page.channelArray['5G']=country5gChannelList["MY"]
      }
      if($.inArray(this.formData.AP5G.Channel,this.page.channelArray['5G'])==-1){
        this.formData.AP5G.Channel = 0
      }
    },
    update (){
      let setForm = () => {        
        this.$confirm(vuex.res['ids_lan_restartWarn'], vuex.res['ids_confirm'], {
          confirmButtonText: vuex.res['ids_ok'],
          cancelButtonText: vuex.res['ids_cancel'],
          type: 'warning'
        }).then(() => {
          this.page.loading = true;
          this.sdk.post("SetWlanSettings", this.formData, {
            callback: this.init
          });
        }).catch(() => {

        }); 
      }
      setForm()   
    }
  }
}
</script>

<style lang="sass" scoped>
</style>