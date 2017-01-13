<template lang="jade">
  include ../components.jade
  #profileManagement
    +sideMenuPage('Settings')
      +breadcrumb("ids_profile_pageTitle")
      +form("formData")
        +formItem("ids_profile_pageTitle:")
          el-select(v-model.mumber="page.currentProfileId" @change="changeProfile()")
            el-option(v-for="val in profileList",:label="val.Default==1?val.ProfileName+'(D)':val.ProfileName",:value.number="val.ProfileID")
        +input("ids_profile_name:","ProfileName")(:disabled="page.actionType==0")
        +input("ids_profile_dialNumber:","DailNumber")(:disabled="page.actionType==0")
        +input("ids_profile_apn:","APN")(:disabled="page.actionType==0")
        +input("ids_profile_userName:","UserName")(:disabled="page.actionType==0")
        +input("ids_profile_password:","Password")(type="password",:disabled="page.actionType==0")
        +select("ids_protocol:","AuthType")(:disabled="page.actionType==0")
        div.center
          +button("ids_new")(@click="newProfile",:disabled="page.actionType==2||page.actionType==1")
          +button("edit")(@click="editProfile",:disabled="page.actionType==2||page.actionType==1")
          +button("ids_save")(@click="saveProfile",:disabled="page.actionType==0")
          +button("ids_delete")(@click="delProfile",:disabled="defaultProfile.ProfileID==page.currentProfileId||page.actionType!=0")
          +button("ids_profile_setDefault")(@click="setDefaultProfile",:disabled="defaultProfile.ProfileID==page.currentProfileId||page.actionType!=0")

</template>

<script>
import {_,_config,$,vuex,G} from '../../common.js';
var Config = _config.profileManagement;
export default {
  created () {
    this.init()
  },
  methods: {
    init (){
      this.vuex = vuex 
      this.initdata(Config)
      this.page={
        currentProfileId:1,
        actionType:0//0:list;1:edit;2:new
      }
      this.profileList={};
      this.defaultProfile={};
      this.sdk.get("GetProfileList",null,(res)=>{
        this.profileList = res.ProfileList;
        let defaultProfile = $.grep(res.ProfileList, function(n,i){
          return n.Default === 1;
        })[0];
        this.formData = $.extend({},defaultProfile);
        this.defaultProfile=$.extend({},defaultProfile);
        this.page.currentProfileId= defaultProfile.ProfileID
      })
    },
    
    changeProfile (){
      let vm =this;
      vm.$refs.formData.resetFields()
      vm.page.actionType=0;
      let currentProfile = $.grep(vm.profileList, function(n,i){
        return n.ProfileID === vm.page.currentProfileId;
      })[0];
      vm.formData = $.extend({},currentProfile);
    },

    newProfile (){
      this.formData= $.extend({},Config.initNewData)
      this.page.actionType=2;
    },
    editProfile (){
      this.page.actionType=1;
    },
    saveProfile (){
      this.submit("formData",()=>{
        this.reset()
      })
    },
    delProfile (){
      this.page.actionType=0;
    },
    setDefaultProfile (){
      this.page.actionType=0;
    }
  }
}
</script>

<style lang="sass" scoped>
</style>