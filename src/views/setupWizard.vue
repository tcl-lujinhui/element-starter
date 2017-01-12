<template lang="jade">
  include ./components.jade
  #setupWizard
    +sideMenuPage('Home')
      +breadcrumb("Setup Wizard")
      el-steps.margin-auto(:space="250",:active.number="page.setp_status")
        el-step(:title="vuex.res.ids_sim_Title")
        el-step(:title="vuex.res.ids_wifi_WiFiTitle")
        el-step(:title="vuex.res.ids_quicksetup_wlanSecurity")
      +form("formData")(ref="form1" v-show="page.setp_status==1")
        sim-state
          +select("ids_netwrok_netMode:","NetworkMode")
          +radio("ids_netwrok_connectionMode:","ConnectMode")
          +checkbox("","RoamingConnect","ids_netwrok_roamingEnable")
          +formItem("ids_profile_name:")
            el-select(v-model.mumber="formData.currentProfileId")
              el-option(v-for="val in page.profileList",:label="val.Default==1?val.ProfileName+'(D)':val.ProfileName",:value.number="val.ProfileID")
          div.center
            +button("ids_next")(@click="next" type="primary" v-show="page.setp_status!=3")
      +form("formData")(ref="form2" v-show="page.setp_status==2")
        div {{vuex.res.ids_wlan_2ghz}}
        +radio("ids_quicksetup_wlan2g:","AP2G.ApStatus")
        div(v-if="formData.AP2G.ApStatus==1")
          +input("ids_wifi_ssid:","AP2G.Ssid")
          +select("ids_wlan_countryRegion:","AP2G.CountryCode")
          +radio("ids_wlan_ssidBroadcast:","AP2G.SsidHidden")
        div {{vuex.res.ids_wlan_5ghz}}
        +radio("ids_quicksetup_wlan5g:","AP5G.ApStatus")
        div(v-if="formData.AP5G.ApStatus==1")
          +input("ids_wifi_ssid:","AP5G.Ssid")
          +select("ids_wlan_countryRegion:","AP5G.CountryCode")
          +radio("ids_wlan_ssidBroadcast:","AP5G.SsidHidden")
        div.center
          +button("ids_back")(@click="prev" type="primary" v-show="page.setp_status!=0")
          +button("ids_next")(@click="next" type="primary" v-show="page.setp_status!=3")
      +form("formData")(ref="form3" v-show="page.setp_status==3")
        div {{vuex.res.ids_wlan_2ghz}}
        div(v-if="formData.AP2G.ApStatus==0") {{vuex.res.ids_disable}}
        div(v-if="formData.AP2G.ApStatus==1")
          +select("ids_wlan_security:","AP2G.SecurityMode")
          div(v-show="formData.AP2G.SecurityMode==1")
            +select("ids_wifi_encryption:","AP2G.WepType")
          div(v-show="formData.AP2G.SecurityMode==2||formData.AP2G.SecurityMode==3||formData.AP2G.SecurityMode==4")
            +select("ids_wifi_encryption:","AP2G.WpaType")
          div(v-show="formData.AP2G.SecurityMode==1")
            +input("ids_quicksetup_wlanPassword:","AP2G.WepKey")(:type="formData.show2GPassword==1?'text':'password'")
          div(v-show="formData.AP2G.SecurityMode==2||formData.AP2G.SecurityMode==3||formData.AP2G.SecurityMode==4")
            +input("ids_quicksetup_wlanPassword:","AP2G.WpaKey")(:type="formData.show2GPassword==1?'text':'password'")
          div(v-show="formData.AP2G.SecurityMode!=0")
            +checkbox("","show2GPassword","ids_wlan_showPw")
        div {{vuex.res.ids_wlan_5ghz}}
        div(v-if="formData.AP5G.ApStatus==0") {{vuex.res.ids_disable}}
        div(v-if="formData.AP5G.ApStatus==1")
          +select("ids_wlan_security:","AP5G.SecurityMode")
          div(v-show="formData.AP5G.SecurityMode==1")
            +select("ids_wifi_encryption:","AP5G.WepType")
          div(v-show="formData.AP5G.SecurityMode==2||formData.AP5G.SecurityMode==3||formData.AP5G.SecurityMode==4")
            +select("ids_wifi_encryption:","AP5G.WpaType")
          div(v-show="formData.AP5G.SecurityMode==1")
            +input("ids_quicksetup_wlanPassword:","AP5G.WepKey")(:type="formData.show5GPassword==1?'text':'password'")
          div(v-show="formData.AP5G.SecurityMode==2||formData.AP5G.SecurityMode==3||formData.AP5G.SecurityMode==4")
            +input("ids_quicksetup_wlanPassword:","AP5G.WpaKey")(:type="formData.show5GPassword==1?'text':'password'")
          div(v-show="formData.AP5G.SecurityMode!=0")
            +checkbox("","show5GPassword","ids_wlan_showPw")
        div.center
          +button("ids_back")(@click="prev" type="primary" v-show="page.setp_status!=0")
          +button("ids_quicksetup_done")(@click="update" type="primary" v-show="page.setp_status==3")
      
</template>

<script>
import {$,_,_config,vuex} from '../common.js'
let Config = _config.setupWizard;
_.extend(Config.formData,_config.mobileConnection.formData,_config.networkSettings.formData,_config.Wlan.formData);
_.extend(Config.formOptions,_config.mobileConnection.formOptions,_config.networkSettings.formOptions,_config.Wlan.formOptions);
_.extend(Config.formRules,_config.networkSettings.formRules,_config.Wlan.formRules);
export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.initdata(Config);
      this.vuex=vuex;
      this.page={
        setp_status:1,
        connectionSettings:{},
        profileList:[],
        networkSettings:{},
        wlanSettings:{},
        setResult:{}
      }
      this.sdk.get("GetNetworkSettings", null, (res) => {
        this.page.networkSettings= res;
        this.formData.NetworkMode= res.NetworkMode
      })
      this.sdk.get("GetConnectionSettings", null, (res) => {
        this.page.connectionSettings= res;
        this.formData.ConnectMode= res.ConnectMode
        this.formData.RoamingConnect= res.RoamingConnect
      })
      this.sdk.get("GetProfileList", null, (res) => {
        this.page.profileList= res.ProfileList;
        let defaultProfile = $.grep(res.ProfileList, function(n,i){
          return n.Default === 1;
        })[0];

        this.formData.currentProfileId = defaultProfile.ProfileID
      })
      this.sdk.get("GetWlanSettings", null, (res) => {
        this.page.wlanSettings= res;
        $.extend(this.formData,res)
      })
    },
    update (){
      let vm=this;
      let SetNetworkSettings = ()=>{
        this.page.networkSettings.NetworkMode= this.formData.NetworkMode;
        this.sdk.post("SetNetworkSettings", this.page.networkSettings, {
          success:{
            tips: "None",
            callback(){
              vm.page.setResult.SetNetworkSettings=true
              SetConnectionSettings()
            }
          },
          fail:{
            tips: "None",
            callback(){
              vm.page.setResult.SetNetworkSettings=false
              SetConnectionSettings()
            }
          }
        })
      }
      let SetConnectionSettings = ()=>{
        this.page.connectionSettings.ConnectMode= this.formData.ConnectMode;
        this.page.connectionSettings.RoamingConnect= this.formData.RoamingConnect;
        this.sdk.post("SetConnectionSettings", this.page.connectionSettings, {
          success:{
            tips: "None",
            callback(){
              vm.page.setResult.SetConnectionSettings=true
              SetDefaultProfile()
            }
          },
          fail:{
            tips: "None",
            callback(){
              vm.page.setResult.SetConnectionSettings=false
              SetDefaultProfile()
            }
          }
        })
      }
      let SetDefaultProfile = ()=>{
        let params={
          ProfileID:this.formData.currentProfileId
        }
        this.sdk.post("SetDefaultProfile", params, {
          success:{
            tips: "None",
            callback(){
              vm.page.setResult.SetDefaultProfile=true
              SetWlanSettings()
            }
          },
          fail:{
            tips: "None",
            callback(){
              vm.page.setResult.SetDefaultProfile=false
              SetWlanSettings()
            }
          }
        })
      }

      let SetWlanSettings = ()=>{
        this.page.wlanSettings.AP2G=this.formData.AP2G;
        this.page.wlanSettings.AP5G=this.formData.AP5G;
        this.sdk.post("SetWlanSettings", this.page.wlanSettings, {
          success:{
            tips: "None",
            callback(){
              vm.page.setResult.SetDefaultProfile=true;
              let result = _.find(vm.page.setResult,(v)=>{
                return v==false
              })
              if(result==undefined){
                vm.$message({
                  message: 'ok',
                  type: 'success'
                });
              }else{
                vm.$message({
                  message: 'fail',
                  type: 'error'
                });
              }
            }
          },
          fail:{
            tips: "None",
            callback(){
              vm.$message({
                message: 'fail',
                type: 'error'
              });
            }
          }
        })
      }
      this.$refs['form3'].validate((valid) => {
        if (valid) {
          SetNetworkSettings()
        } else {
          return false;
        }
      })
    },
    prev(){
      if (this.page.setp_status-- <= 1){
        this.page.setp_status = 1;
      }
    },
    next() {
      if(this.page.setp_status==2){
        this.$refs['form2'].validate((valid) => {
          if (valid) {
            this.page.setp_status++
          } else {
            return false;
          }
        })
      }else{
        this.page.setp_status++
      }
      
      if (this.page.setp_status> 3){
        this.page.setp_status = 3;
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>